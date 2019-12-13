import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import firebase from '../utils/Firebase.js';
import { reorderLists, reposition } from '../utils/Reorder';
import '../assets/hamburgers/hamburgers.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
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
  DeleteDialog 
} from './SidebarStyles.js'


function Sidebar(props) {
  const [input, setInput] = useState('');
  const [deleting, setDeleting] = useState(-1);
  const { active, setActive, lists, setLists, user, login, logout, toggle, toggleLists} = props;

  function onChange(e) {
    setInput(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && e.target.name === 'list' && input.length !== 0) {
      addList();
      setInput('');
    }
  }

  function addList() {
    const allLists = {...lists};
    const position = Object.keys(allLists).length;
    const newList = {todos:[{exist:true}],position:position,archive:[{exist:true}]};
    if ( !(input in allLists ) ) {
      allLists[input] = newList;
    }
    input && setLists(allLists);
    setActive(input);
    setInput('');
    set(allLists);
  }

  function deleteList(list) {
    const allLists = {...lists};
    reposition(allLists, list);
    delete allLists[list];
    setLists(allLists);
    set(allLists);
    setDeleting(-1)
  }

  function set(lists) {
    const itemsRef = firebase.database().ref(`/users/${user.uid}`);
    itemsRef.set(lists);
  }

  function switchList(list) {
    toggleLists();
    setActive(list);
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
    <StyledSidebar                       animation={toggle}
>
      <DragDropContext onDragEnd={onDragEnd}>
          <Logo onClick={() => {setActive('')} } >TODO!</Logo>
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
                            <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                              {provided => (
                                <List 
                                  className={list[0]&&list[0]===active?"active":""}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {deleting === i
                                      ? <DeleteDialog>Delete? <span onClick={ (e) => deleteList(list[0]) } id="yes">Yes</span><span onClick={()=> setDeleting(-1)} id="no">No</span></DeleteDialog >
                                      : <><ListNameWrapper onClick={e => switchList(list[0])}>{list[0]}</ListNameWrapper>
                                        <FontAwesomeIcon icon={faTimes} style={{'color':'#071e17','opacity':'0.5'}} onClick={e=>setDeleting(i)}/></>
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
