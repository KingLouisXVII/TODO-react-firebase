import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderLists } from '../utils/Reorder';
import deleteButton from '../assets/delete.svg'
import down from '../assets/down.svg'
import darkmode from '../assets/darkmode.svg'
import { dark } from '../utils/darkmode.js'; 


function Sidebar(props) {
  const [input, setInput] = useState('');
  const [toggle, setToggle] = useState(false);
  const [deleting, setDeleting] = useState(-1);
  const { active, setActive, lists, setLists } = props;

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
    const newList = {todos:[]};
    if ( !(input in allLists ) ) {
      allLists[input] = newList;
    }
    input && setLists(allLists);
    setActive(input);
    setInput('');
  }

  function deleteList(list) {
    const allLists = {...lists};
    delete allLists[list];
    setLists(allLists);
    setDeleting(!deleting)
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
  }

  return (
    <div id="sidebar" >
      <div id="app-separator"></div>
      <div id="app-separator2"></div>
      <div id="app-separator3"></div>
      <DragDropContext onDragEnd={onDragEnd}>
        <h1 onClick={() => {setActive('')} }>TODO!</h1>
        <div id="button-wrapper">
          <img onClick={dark} src={darkmode} id="darkmode" alt="darkmode-toggle" />
          <img onClick={toggleLists} src={down} id="list-toggle" alt="list-toggle" />
        </div>
        <Droppable droppableId="sidebar">
          {provided => (
            <div id={!toggle?'no-lists':'lists'} ref={provided.innerRef} {...provided.droppableProps}>
              {lists &&
                Object.keys(lists).map((list,i) =>
                  <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                          className={list&&list===active?"list active":"list"} 
                          onClick={e => switchList(list)}>
                          {deleting === i
                            ? <div id="delete-dialog">Delete? <span onClick={ (e) => deleteList(list) }>Yes </span><span onClick={()=> setDeleting(-1)}>No</span></div>
                            : <div>{list}</div>
                          }
                          <div onClick={()=>setDeleting(i)} className="delete-list"><img alt="delete-list" src={deleteButton}/></div>
                        </div>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
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
              </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Sidebar;
