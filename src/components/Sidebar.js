import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderLists, reposition } from '../utils/Reorder';
import deleteButton from '../assets/delete.svg'
import editButton from '../assets/edit.svg'
import '../assets/hamburgers/hamburgers.scss';
import firebase from '../utils/Firebase.js';

  const StyledSidebar = styled.div`
    background-color: #232b2b;
    border-right: 7px solid #071e17;
  text-align: center;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  `;

  const Logo = styled.h1`
    font-size: 2em;
    margin: 0;
      background-color: #232b2b;
    cursor: pointer;
    opacity: 0.8;
  `;

  const SidebarInput = styled.input `
      background-color: #232b2b;
      color: 	#8f9779;
    font-size: 0.9em;
    border: 0;
    outline: none;
    padding: 0.3em;
    border-bottom: 2px solid;
      border-color: #071e17;
  ;`

  const Lists = styled.div`
    height: auto;
    display: flex;
    flex-direction: column;
  `;

  const List = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.7em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    cursor: pointer;
    word-break: break-word;
      background-color: #232b2b;
      border-bottom: 2px solid 	#071e17;
      color: 	#8f9779;
  `;
function Sidebar(props) {
  const [input, setInput] = useState('');
  const [toggle, setToggle] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [deleting, setDeleting] = useState(-1);
  const [editToggle, setEditToggle] = useState(false);
  const { active, setActive, lists, setLists, user, login, logout } = props;

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
    const newList = {todos:[{exist:true}],position:position};
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

  function toggleLists() {
    setLoaded(true);
    setToggle(!toggle);
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
    <StyledSidebar>
      <DragDropContext onDragEnd={onDragEnd}>
          <Logo onClick={() => {setActive('')} } >TODO!</Logo>
          <button
            className={
              toggle ?
                'hamburger  hamburger--collapse is-active'
                :
                'hamburger  hamburger--collapse'}
                  onClick={toggleLists}
                  type="button"
                  id="list-toggle"
                >
                  <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                  </span>
                </button>
              <Droppable droppableId="sidebar">
                {provided => (
                  <Lists id={loaded ?  toggle?'slideIn':'slideOut' : 'hidden'} ref={provided.innerRef} {...provided.droppableProps}>
                    <div id="login-buttons">
                      {user
                          ? <button onClick={logout}>logout</button>
                          : <button onClick={login}>login</button>
                      }
                      <div onClick={() => setEditToggle(!editToggle)} id="edit-toggle"><img alt="edit-toggle" src={editButton}/></div>
                    </div>
                    <SidebarInput
                      autoComplete="off"
                      type="text"
                      placeholder="..."
                      value={input}
                      onChange={onChange}
                      onKeyDown={ e => handleKeyDown(e) }
                      id="new-list"
                      name="list"
                    />
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
                                  onClick={e => switchList(list[0])}
                                >
                                  {deleting === i
                                      ? <div id="delete-dialog">Delete? <span onClick={ (e) => deleteList(list[0]) } id="yes">Yes</span><span onClick={()=> setDeleting(-1)} id="no">No</span></div>
                                      : <div className="list-name-wrapper" ><div>{list[0]}</div></div>
                                  }
                                  {editToggle 
                                      ? <div onClick={()=>setDeleting(i)} className="delete-list"><img alt="delete-list" src={deleteButton}/></div>
                                      : <div onClick={()=>setDeleting(i)} className="delete-list hidden"><img alt="delete-list" src={deleteButton}/></div>
                                  }
                                </List>
                            )}
                          </Draggable>
                        )}
                        {provided.placeholder}
                      </Lists>
                )}
              </Droppable>
            </DragDropContext>
          </StyledSidebar>
  );
}

export default Sidebar;
