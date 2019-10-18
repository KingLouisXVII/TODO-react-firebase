import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function Sidebar(props) {
  return (
      <div id="sidebar">
        <DragDropContext onDragEnd={props.onDragEnd}>
          <h1>TODO!</h1>
          <Droppable droppableId="list2">
            {provided => (
              <div id="lists" ref={provided.innerRef} {...provided.droppableProps}>
                { props.lists &&
                  Object.keys(props.lists).map((list,i) =>
                    <Draggable key={i+99} draggableId={i+99} index={i}>
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                            key={i} className={list===props.active?"list active":"list"} onClick={e => props.switchList(list)}>
                            <div>{list}</div>
                            <div onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) props.deleteList(list) }} className="delete-list">X</div>
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
                    onChange={props.onChange}
                    onKeyDown={e => props.handleKeyDown(e)}
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
          <button id="add-list" onClick={props.addEmptyList}>+</button>
        </div>
      </div>
  );
}

export default Sidebar;
