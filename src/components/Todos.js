import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderTodos } from '../utils/Reorder';


function Todos(props) {

  function onChange(e) {
    props.setTodo(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && e.target.name === 'todo' && props.todo.length !== 0) {
      addTodo(e);
      props.setTodo('');
    }
  }

  function addEmptyTodo() {
    props.setAddingTodo(!props.addingTodo);
  }

  function addTodo() {
    const allLists = {...props.lists};
    const todos = allLists[props.active].todos;
    const newTodo = {
      name: props.todo,
      completed: false
    }
    todos.unshift(newTodo);
    props.setLists(allLists);
    props.setAddingTodo(false);
  }

  function toggleTodo(i) {
    const allLists = {...props.lists};
    const todos = allLists[props.active].todos;
    todos[i].completed = !todos[i].completed;
    todos.sort(function(a,b){return a.completed-b.completed});
    props.setLists(allLists);
  }

  function deleteTodo(i) {
    const allLists = {...props.lists};
    const todos = allLists[props.active].todos;
    todos.splice(i,1);
    props.setLists(allLists);
  }

  function removeCompleted(todo) {
    return todo.completed === false;
  } 

  function clearDone() {
    const allLists = {...props.lists};
    const newTodos = allLists[props.active].todos.filter(removeCompleted);
    allLists[props.active].todos = newTodos;
    props.setLists(allLists);
    props.setTodo('');
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const allLists = {...props.lists};
    reorderTodos(
      allLists[props.active].todos,
      result.source.index,
      result.destination.index
    );
    props.setLists(allLists);
  }

  return (
    <div id="todos">
      {props.active?
      <div id="buttons-left">
        <button id="clear-done" onClick={clearDone}>-</button>
      </div>
          : null
      }
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {provided => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              { props.addingTodo ?
              <div id="input-todo-wrap">
                <input
                  autoFocus
                  type="text"
                  value={props.todo}
                  onChange={onChange}
                  onKeyDown={e =>handleKeyDown(e)}
                  id="new-todo"
                  name="todo"
                /></div>
                : null
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
                            onClick={e=>toggleTodo(i)}
                            className={todo.completed?'completed':''}
                          >{todo.name}</li>
                          <div onClick={e=>deleteTodo(i)} className="delete">X</div>
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
      {props.active ?
      <div id="buttons-right">
        {props.addingTodo ?
        <button id="add-todo" onClick={addEmptyTodo}>-</button>
          : <button id="add-todo" onClick={addEmptyTodo}>+</button>
        }
      </div>
          : null
      }
    </div>

  )
}

export default Todos;
