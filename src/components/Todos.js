import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderTodos } from '../utils/Reorder';
import deleteButton from '../assets/delete.svg'
import priorityButton from '../assets/important.svg'
import editButton from '../assets/edit.svg'


import firebase, { auth, provider } from '../utils/Firebase.js';
function Todos(props) {
  const [input, setInput] = useState('');
  const { lists, setLists, active, user } = props;

  function onChange(e) {
    setInput(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && e.target.name === 'todo' && input.length !== 0) {
      addTodo(e);
      setInput('');
    }
  }

  function addTodo() {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    const newTodo = {
      name: input,
      completed: false,
      priority: false
    }
    todos.unshift(newTodo);
    todos.sort(function(a,b){return b.priority-a.priority});
    setLists(allLists);
    const itemsRef = firebase.database().ref(`/users/${user.uid}`);
    itemsRef.set(allLists);
  }

  function toggleTodo(i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    todos[i].completed = !todos[i].completed;
    todos[i].priority = false;
    todos.sort(function(a,b){return a.completed-b.completed});
    setLists(allLists);
  }

  function deleteTodo(i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    todos.splice(i,1);
    setLists(allLists);
    const itemsRef = firebase.database().ref(`/users/${user.uid}`);
    itemsRef.set(allLists);
  }

  function removeCompleted(todo) {
    return todo.completed === false;
  } 

  function clearDone() {
    const allLists = {...lists};
    const newTodos = allLists[active].todos.filter(removeCompleted);
    allLists[active].todos = newTodos;
    setLists(allLists);
    setInput('');
  }

  function editTodo(i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    const todo = todos[i].name;
    todos.splice(i,1);
    setLists(allLists);
    setInput(todo);
  }

  function prioritize(i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    todos[i].priority = !todos[i].priority;
    todos[i].completed = false;
    todos.sort(function(a,b){return b.priority-a.priority});
    setLists(allLists);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const allLists = {...lists};
    reorderTodos(
      allLists[active].todos,
      result.source.index,
      result.destination.index
    );
    props.setLists(allLists);
  }

  return (
    <div id="todos">
      {active?
      <div id="input-todo-wrap">
        <input
          autoFocus
          autoComplete="off"
          type="text"
          placeholder="..."
          value={input}
          onChange={onChange}
          onKeyDown={e =>handleKeyDown(e)}
          id="new-todo"
          name="todo"
        />
      </div>
          : null
      }
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {provided => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {lists[active] ?
                lists[active].todos.map((todo,i) =>
                  <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                    {provided => (
                      <div className="todo"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className={todo.completed?'checkbox checked':'checkbox'} onClick={e=>toggleTodo(i)}></div>
                        <li
                          className={todo.completed?'completed':todo.priority?'priority':''}
                        >{todo.name}                        
                          <div id="buttons">
                            <div onClick={e=>editTodo(i)} ><img className="edit-button" alt="edit-todo" src={editButton}/></div>
                            <div onClick={e=>prioritize(i)}><img className="priority-button" alt="prioritize-todo" src={priorityButton}/></div>
                            <div onClick={e=>deleteTodo(i)} ><img className="delete-button" alt="delete-todo" src={deleteButton}/></div>
                          </div> 
                        </li>
                      </div>
                    )
                    }
                  </Draggable>
                )
                :
                null
              }
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      { 
        lists[active] && lists[active].todos.some(todo => todo.completed === true) ? 
          <h2 id="clear" onClick={clearDone}>clear done</h2> 
          : 
          null
      }
    </div>

  )
}

export default Todos;
