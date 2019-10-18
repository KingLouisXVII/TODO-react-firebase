import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function Todos(props) {
  return (
    <div id="todos">
      {props.active?
      <div id="buttons-left">
        <button id="clear-done" onClick={props.clearDone}>-</button>
      </div>
          : null
      }
      <DragDropContext onDragEnd={props.onDragEnd2}>
        <Droppable droppableId="list">
          {provided => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              { props.addingTodo ?
              <div id="input-todo-wrap">
                <input
                  autoFocus
                  type="text"
                  value={props.todo}
                  onChange={props.onChange}
                  onKeyDown={e => props.handleKeyDown(e)}
                  id="new-todo"
                  name="todo"
                /></div>
                :
                null
              }
              { props.lists[props.active] &&
                  props.lists[props.active].todos.map((todo,i) =>
                    <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                      {provided => (
                        <div className="todo"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <li
                            onClick={e=>props.toggleTodo(i)}
                            className={todo.completed?'completed':''}
                          >{todo.name}</li>
                          <div onClick={e=>props.deleteTodo(i)} className="delete">X</div>
                        </div>
                      )
                      }
                    </Draggable>
                  )
              }
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      {props.active?
      <div id="buttons-right">
        <button id="add-todo" onClick={props.addEmptyTodo}>+</button>
      </div>
          : null
      }
    </div>

  )
}

export default Todos;
