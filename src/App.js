import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './App.scss';

const reorder = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


function App() {
  const [lists, setLists] = useState({todo: {todos: []}});
  const [todo, setTodo] = useState('');
  const [active, setActive] = useState('todo');
  const [addingTodo, setAddingTodo] = useState(false);
  const [addingList, setAddingList] = useState(false);

  useEffect(() => {
    const localTodos = localStorage.getItem('lists');
    console.log(JSON.parse(localTodos));
    localTodos ?
      setLists(JSON.parse(localTodos))
      :
      setLists({todo: {todos: []}})
  }, []);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  function addEmptyList() {
    setAddingList(true);
  }

  function addList() {
    const allLists = {...lists};
    const newList = {todos:[]};
    allLists[todo] = newList;
    todo && setLists(allLists);
    setActive(todo);
    setTodo('');
    setAddingList(false);
  }

  function switchList(list) {
    setActive(list);
  }

  function addTodo() {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    const newTodo = {
      name: todo,
      completed: false
    }
    todos.unshift(newTodo);
    setLists(allLists);
    setAddingTodo(false);
  }

  function deleteTodo(i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    todos.splice(i,1);
    setLists(allLists);
  }

  function deleteList(list) {
    const allLists = {...lists};
    delete allLists[list];
    setLists(allLists);
  }

  function onChange(e) {
    setTodo(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && e.target.name === 'todo') {
      addTodo(e);
      setTodo('');
    }
    if (e.key === 'Enter' && e.target.name === 'list') {
      addList();
      setTodo('');
    }
  }

  function toggleTodo(i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    todos[i].completed = !todos[i].completed;
    todos.sort(function(a,b){return a.completed-b.completed});
    setLists(allLists);
  }

  function addEmptyTodo() {
    setAddingTodo(true);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const allLists = {...lists};
    reorder(
      allLists[active].todos,
      result.source.index,
      result.destination.index
    );
    setLists(allLists);
  }

  return (
    <div className="App">
      <div id="sidebar">
        <h1>TODO!</h1>
        <div id="lists">
          {
            Object.keys(lists).map((list,i) =>
              <div key={i} className={list===active?"list active":"list"} onClick={e => switchList(list)}>
                <div>{list}</div>
                <div onClick={(e)=>deleteList(list)} className="delete-list">X</div>
              </div>
            )}
            { addingList ?
            <input
              autoFocus
              type="text"
              value={todo}
              onChange={onChange}
              onKeyDown={e => handleKeyDown(e)}
              id="new-list"
              name="list"
            />
                :
                null
            }
            <button onClick={addEmptyList}>add list</button>
          </div>
        </div>
        <div id="todos">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {provided => (
                <ul ref={provided.innerRef} {...provided.droppableProps}>
                  { addingTodo ?
                  <input
                    autoFocus
                    type="text"
                    value={todo}
                    onChange={onChange}
                    onKeyDown={e => handleKeyDown(e)}
                    id="new-todo"
                    name="todo"
                  />
                    :
                    null
                  }
                  { lists[active] &&
                      lists[active].todos.map((todo,i) =>
                        <Draggable key={todo} draggableId={i.toString()} index={i}>
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
        <button id="add-todo" onClick={addEmptyTodo}>+</button>
      </div>
  );
}

export default App;
