import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderLists } from '../utils/Reorder';


function Sidebar(props) {

  function onChange(e) {
    props.setTodo(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && e.target.name === 'list' && props.todo.length !== 0) {
      addList();
      props.setTodo('');
    }
  }
  
  function addEmptyList() {
    props.setAddingList(true);
  }

  function addList() {
    const allLists = {...props.lists};
    const newList = {todos:[]};
    if ( !( props.todo in allLists ) ) {
      allLists[props.todo] = newList;
    }
    props.todo && props.setLists(allLists);
    props.setActive(props.todo);
    props.setTodo('');
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
      Object.entries(allLists),
      result.source.index,
      result.destination.index
    );
    props.setLists(orderedLists);
  }

  return (
    <div id="sidebar">
      <DragDropContext onDragEnd={onDragEnd}>
        <h1>TODO!</h1>
        <Droppable droppableId="list2">
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
                          key={i} className={list===props.active?"list active":"list"} onClick={e =>switchList(list)}>
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
                  value={props.todo}
                  onChange={onChange}
                  onKeyDown={e => handleKeyDown(e)}
                  id="new-list"
                  name="list"
                />
                    :
                    null
                }
              </div>
          )}
        </Droppable>
      </DragDropContext>
      <div id="button-wrapper">
        <button id="add-list" onClick={addEmptyList}>+</button>
      </div>
    </div>
  );
}

export default Sidebar;
