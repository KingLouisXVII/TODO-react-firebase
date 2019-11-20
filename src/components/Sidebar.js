import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderLists, reposition } from '../utils/Reorder';
import deleteButton from '../assets/delete.svg'
import editButton from '../assets/edit.svg'
import lines from '../assets/lines.svg'
import darkmode from '../assets/darkmode.svg'
import { dark } from '../utils/darkmode.js'; 
import '../assets/hamburgers/hamburgers.scss';
import firebase from '../utils/Firebase.js';

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
    <div id="sidebar">
      <DragDropContext onDragEnd={onDragEnd}>
        <div id="button-wrapper">
          <h1 onClick={() => {setActive('')} } >TODO!</h1>
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

                {/* <img onClick={toggleLists} src={lines} id="list-toggle" alt="list-toggle" /> */}
              </div>
              <Droppable droppableId="sidebar">
                {provided => (
                  <div id={loaded ?  toggle?'slideIn':'slideOut' : 'hidden'} className="lists" ref={provided.innerRef} {...provided.droppableProps}>
                    <div id="login-buttons">
                      <img onClick={dark} src={darkmode} id="darkmode" alt="darkmode-toggle" />
                      {user
                          ? <button onClick={logout}>logout</button>
                          : <button onClick={login}>login</button>
                      }
                    </div>
                    <div id="input-edit-wrapper">
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
                      <div onClick={() => setEditToggle(!editToggle)} id="edit-toggle"><img alt="edit-toggle" src={editButton}/></div>
                    </div>
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
                                {editToggle 
                                    ? <div onClick={()=>setDeleting(i)} className="delete-list"><img alt="delete-list" src={deleteButton}/></div>
                                    : <div onClick={()=>setDeleting(i)} className="delete-list hidden"><img alt="delete-list" src={deleteButton}/></div>
                                }
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
