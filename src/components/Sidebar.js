import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderLists } from '../utils/Reorder';


function Sidebar(props) {
  const [addingList, setAddingList] = useState(false);
  const [input, setInput] = useState('');
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

  function addEmptyList() {
    setInput('');
    setAddingList(!addingList);
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
    setAddingList(false);
  }


  function deleteList(list) {
    const allLists = {...lists};
    delete allLists[list];
    setLists(allLists);
  }

  function switchList(list) {
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
  }

  return (
    <div id="sidebar">
      <DragDropContext onDragEnd={onDragEnd}>
        <h1>TODO!</h1>
        <Droppable droppableId="sidebar">
          {provided => (
            <div id="lists" ref={provided.innerRef} {...provided.droppableProps}>
              {lists &&
                Object.keys(lists).map((list,i) =>
                  <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                          className={list===active?"list active":"list"} onClick={e =>switchList(list)}>
                          <div>{list}</div>
                          <div onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?'))deleteList(list) }} className="delete-list">X</div>
                        </div>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
                <input
                  autoFocus
                  autoComplete="off"
                  type="text"
                  placeholder="enter list name..."
                  value={input}
                  onChange={onChange}
                  onKeyDown={e => handleKeyDown(e)}
                  id="new-list"
                  name="list"
                />
              </div>
          )}
        </Droppable>
      </DragDropContext>
      <div id="button-wrapper">
      </div>
    </div>
  );
}

export default Sidebar;
