import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderLists } from '../utils/Reorder';


function Sidebar(props) {

  function onChange(e) {
    props.setInput(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && e.target.name === 'list' && props.input.length !== 0) {
      addList();
      props.setInput('');
    }
  }

  function addEmptyList() {
    props.setAddingList(!props.addingList);
  }

  function addList() {
    const allLists = {...props.lists};
    const newList = {todos:[]};
    if ( !( props.input in allLists ) ) {
      allLists[props.input] = newList;
    }
    props.input && props.setLists(allLists);
    props.setActive(props.input);
    props.setInput('');
    props.setAddingList(false);
  }


  function deleteList(list) {
    const allLists = {...props.lists};
    delete allLists[list];
    props.setLists(allLists);
  }

  function switchList(list) {
    props.setActive(list);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const allLists = {...props.lists};
    const orderedLists = reorderLists(
      allLists,
      result.source.index,
      result.destination.index
    );
    props.setLists(orderedLists);
  }

  return (
    <div id="sidebar">
      <DragDropContext onDragEnd={onDragEnd}>
        <h1>TODO!</h1>
        <Droppable droppableId="sidebar">
          {provided => (
            <div id="lists" ref={provided.innerRef} {...provided.droppableProps}>
              { props.lists &&
                Object.keys(props.lists).map((list,i) =>
                  <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                          className={list===props.active?"list active":"list"} onClick={e =>switchList(list)}>
                          <div>{list}</div>
                          <div onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?'))deleteList(list) }} className="delete-list">X</div>
                        </div>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
                { props.addingList ?
                <input
                  autoFocus
                  type="text"
                  value={props.input}
                  onChange={onChange}
                  onKeyDown={e => handleKeyDown(e)}
                  id="new-list"
                  name="list"
                />
                    : null
                }
              </div>
          )}
        </Droppable>
      </DragDropContext>
      <div id="button-wrapper">
        { props.addingList ? <button id="add-list" onClick={addEmptyList}>-</button>
            : <button id="add-list" onClick={addEmptyList}>+</button>
        }
      </div>
    </div>
  );
}

export default Sidebar;
