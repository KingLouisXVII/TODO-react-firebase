import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderLists, reposition } from '../utils/Reorder';
import deleteButton from '../assets/delete.svg'
import down from '../assets/down.svg'
import darkmode from '../assets/darkmode.svg'
import { dark } from '../utils/darkmode.js'; 

import firebase from '../utils/Firebase.js';

function Sidebar(props) {
  const [input, setInput] = useState('');
  const [toggle, setToggle] = useState(false);
  const [deleting, setDeleting] = useState(-1);
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
    <div id="sidebar" >
      <DragDropContext onDragEnd={onDragEnd}>
        <h1 onClick={() => {setActive('')} }>TODO!</h1>
        <div id="button-wrapper">
          <img onClick={dark} src={darkmode} id="darkmode" alt="darkmode-toggle" />
          <img onClick={toggleLists} src={down} id="list-toggle" alt="list-toggle" />
          <div id="login-buttons">
            {user
                ? <button onClick={logout}>logout</button>
                : <button onClick={login}>login</button>
            }
          </div>
        </div>
        <Droppable droppableId="sidebar">
          {provided => (
            <div id={!toggle?'no-lists':'lists'} ref={provided.innerRef} {...provided.droppableProps}>
              <input
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
                        <div 
                          className={list[0]&&list[0]===active?"list active":"list"}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {deleting === i
                              ? <div id="delete-dialog">Delete? <span onClick={ (e) => deleteList(list[0]) } id="yes">Yes</span><span onClick={()=> setDeleting(-1)} id="no">No</span></div>
                              : <div className="list-name-wrapper" onClick={e => switchList(list[0])}><div>{list[0]}</div></div>
                          }
                          <div onClick={()=>setDeleting(i)} className="delete-list"><img alt="delete-list" src={deleteButton}/></div>
                        </div>
                      )}
                    </Draggable>
                  )}
                  {provided.placeholder}
                </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Sidebar;
