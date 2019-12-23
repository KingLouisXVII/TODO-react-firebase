import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import firebase from '../utils/Firebase.js';
import { reorderLists, reposition } from '../utils/Reorder';
import '../assets/hamburgers/hamburgers.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {
  StyledSidebar,
  Logo, 
  LoginButtons, 
  LoginOutButton, 
  SidebarInput, 
  ListsWrapper,
  Lists, 
  List, 
  ListNameWrapper,
  EditList,
  DeleteDialog 
} from './SidebarStyles.js'


function Sidebar(props) {
  const [input, setInput] = useState('');
  const [deleting, setDeleting] = useState(-1);
  const { active, setActive, lists, setLists, user, login, logout, toggle, toggleSidebar, edit, setEdit, editName, setEditName, setArchive } = props;

  function onChange(e) {
    if (e.target.name === 'list') {
      setInput(e.target.value);
    } else if (e.target.name === 'edit') {
      setEditName(e.target.value);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && e.target.name === 'list' && input.length !== 0) {
      addList();
      setInput('');
    } else if (e.key === 'Enter' && e.target.name === 'edit') {
      addEditedList(e);
    }
  }

  function addList() {
    const allLists = {...lists};
    const position = Object.keys(allLists).length;
    const newList = {
      todos:[{exist:true}],
      position:position,
      archive:[{exist:true}]
    };
    if (!(input in allLists)) {
      allLists[input] = newList;
    }
    input && setLists(allLists);
    setActive(input);
    setInput('');
    set(allLists);
  }

  function addEditedList() {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    const position = allLists[active].position;
    const archive = allLists[active].archive;
    const oldName = active;
    const newName = editName.length < 1 ? oldName : editName;
    const listCopy = {todos:todos,position:position,archive:archive};
    delete allLists[active];
    allLists[newName] = listCopy;
    set(allLists);
    setActive(editName)
    setEdit(-1);
    setEditName('');
  }

  function deleteList(list) {
    const allLists = {...lists};
    reposition(allLists, list);
    delete allLists[list];
    setArchive(false);
    setLists(allLists);
    set(allLists);
    setDeleting(-1)
  }

  function set(lists) {
    const itemsRef = firebase.database().ref(`/users/${user.uid}`);
    itemsRef.set(lists);
  }

  function switchList(list) {
    toggleSidebar();
    setActive(list);
    setEdit(-1);
    setEditName('');
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const allLists = {...lists};
    const orderedLists = reorderLists(
      allLists,
      result.source.index,
      result.destination.index
    );
    setLists(orderedLists);
    set(orderedLists);
  }

  return (
    <StyledSidebar animation={toggle}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Logo onClick={() => {setActive('')} }>TODO!</Logo>
        <LoginButtons>
          {user
              ? <LoginOutButton onClick={logout}>logout</LoginOutButton>
              : <LoginOutButton onClick={login}>login</LoginOutButton>
          }
        </LoginButtons>
        <SidebarInput
          autoComplete="off"
          type="text"
          placeholder="..."
          value={input.toUpperCase()}
          onChange={onChange}
          onKeyDown={ e => handleKeyDown(e) }
          id="new-list"
          name="list"
        />
        <Droppable droppableId="sidebar">
          {provided => (
            <ListsWrapper>
              <Lists 
                ref={provided.innerRef} 
                {...provided.droppableProps}
              >
                {lists &&
                    Object.entries(lists)
                    .sort((a, b) => a[1].position - b[1].position)
                    .map((list,i) =>
                      edit === i 
                      ? <EditList 
                        autoFocus
                        type="text"
                        value={editName.toUpperCase()}
                        onChange={onChange}
                        onKeyDown={e =>handleKeyDown(e)}
                        name="edit"
                      />
                      : <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                        {provided => (
                          <List 
                            className={list[0] && list[0] === active ? "active" : ""}
                            name={list[0]}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {deleting === i
                                ? <DeleteDialog>Delete? <span onClick={ (e) => deleteList(list[0]) } id="yes">Yes</span><span onClick={()=> setDeleting(-1)} id="no">No</span></DeleteDialog >
                                : <>
                                  <ListNameWrapper onClick={e => switchList(list[0])}>{list[0]}</ListNameWrapper>
                                  {active === list[0] 
                                      ? <>
                                        <FontAwesomeIcon 
                                          icon={faEdit} 
                                          style={{'color':'#071e17','opacity':'0.5', 'paddingRight':'1em'}} 
                                          onClick={e=>setEdit(i)}/>
                                        <FontAwesomeIcon 
                                          icon={faTrashAlt} 
                                          style={{'color':'#071e17','opacity':'0.5'}} 
                                          onClick={e=>setDeleting(i)}/>
                                        </>
                                      : null
                                  }
                                </>
                            }
                          </List>
                        )}
                      </Draggable>
                    )}
                    {provided.placeholder}
                  </Lists>
                </ListsWrapper>
          )}
        </Droppable>
      </DragDropContext>
    </StyledSidebar>
  );
}

export default Sidebar;
