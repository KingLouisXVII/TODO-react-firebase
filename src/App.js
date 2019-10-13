import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './App.scss';


function App() {
  const [lists, setLists] = useState([
  {
    name: 'main',
    active: true,
    todos: []
  },
  {
    name: 'schmain',
    active: false,
    todos: []
  },
  ])
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');


  useEffect(() => {
    const localTodos = localStorage.getItem('todos');
    localTodos !== null ?
      setTodos(JSON.parse(localTodos))
      :
      setTodos([]);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);


  function addList() {
    const allLists = [...lists];
    const newList = {
      name: todo,
      active: true,
      todos: []
    }; 
    allLists.push(newList);
    setLists(allLists);
    setTodos([]);
    setTodo('');
  }

  function addTodo() {
    const newLists = [...lists];
    const newTodos = newLists[0].todos;
    const newTodo = {name:todo, completed:false};
    newTodos.push(newTodo);
    setTodos(newTodos);
  }

  function deleteTodo(i) {
    setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)));
  }

  function onChange(e) {
    setTodo(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      addTodo(e);
      setTodo('');
    }
  }

  function toggleTodo(i) {
    const newTodos = [...todos];
    newTodos[i].completed = !newTodos[i].completed;
    newTodos.sort(function(a,b){return a.completed-b.completed});
    setTodos(newTodos);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const newTodos  = reorder(
      todos,
      result.source.index,
      result.destination.index
    );
    setTodos(newTodos);
  }

  function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };


  return (
    <div className="App">
      <div id="sidebar">
        <h1>TODO!</h1>
        <input
          type="text"
          value={todo}
          onChange={onChange}
          onKeyDown={e => handleKeyDown(e)}
        />
        {
          lists.map((list,i) =>
            <div key={i} className="list">{list.name}</div>
          )}
          <button onClick={addList} id="add-list">+</button>
        </div>
        <div id="todos">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {provided => (
                <ul ref={provided.innerRef} {...provided.droppableProps}>
                  {
                    todos.map((todo,i) =>
                      <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                        {provided => (
                          <div className="todo"
                            key={i}
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
        </div>
      </div>
  );
}

export default App;

