import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './App.scss';

const reorderTodos = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const reorderLists = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  const reducedArray = result.reduce(function(acc, item){
    acc[item[0]] = item[1];

    return acc;
  }, {});

  return reducedArray;
};

function App() {
  const [lists, setLists] = useState({});
  const [todo, setTodo] = useState('');
  const [active, setActive] = useState('');
  const [addingTodo, setAddingTodo] = useState(false);
  const [addingList, setAddingList] = useState(false);

  useEffect(() => {
    const localTodos = localStorage.getItem('lists');
    localTodos?
      setLists(JSON.parse(localTodos))
      : setLists({})
  }, []);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  function onChange(e) {
    setTodo(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && e.target.name === 'todo' && todo.length !== 0) {
      addTodo(e);
      setTodo('');
    }
    if (e.key === 'Enter' && e.target.name === 'list' && todo.length !== 0) {
      addList();
      setTodo('');
    }
  }

  function addEmptyList() {
    setAddingList(true);
  }

  function addList() {
    const allLists = {...lists};
    const newList = {todos:[]};
    if ( !( todo in allLists ) ) {
      allLists[todo] = newList;
    }
    todo && setLists(allLists);
    setActive(todo);
    setTodo('');
    setAddingList(false);
  }

  function switchList(list) {
    setActive(list);
  }

  function deleteList(list) {
    const allLists = {...lists};
    delete allLists[list];
    setLists(allLists);
  }

  function addEmptyTodo() {
    setAddingTodo(true);
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

  function toggleTodo(i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    todos[i].completed = !todos[i].completed;
    todos.sort(function(a,b){return a.completed-b.completed});
    setLists(allLists);
  }

  function deleteTodo(i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    todos.splice(i,1);
    setLists(allLists);
  }

  function removeCompleted(todo) {
    return todo.completed === false;
  } 

  function clearDone() {
    const allLists = {...lists};
    const newTodos = allLists[active].todos.filter(removeCompleted);
    allLists[active].todos = newTodos;
    setLists(allLists);
    setTodo('');
    setAddingTodo(false);
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
      Object.entries(allLists),
      result.source.index,
      result.destination.index
    );
    setLists(orderedLists);
  }

  function onDragEnd2(result) {
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
    setLists(allLists);
  }

  return (
    <div className="App">
      <div id="sidebar">
        <DragDropContext onDragEnd={onDragEnd}>
          <h1>TODO!</h1>
          <Droppable droppableId="list2">
            {provided => (
              <div id="lists" ref={provided.innerRef} {...provided.droppableProps}>
                { lists &&
                  Object.keys(lists).map((list,i) =>
                    <Draggable key={i+99} draggableId={i+99} index={i}>
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                            key={i} className={list===active?"list active":"list"} onClick={e => switchList(list)}>
                            <div>{list}</div>
                            <div onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteList(list) }} className="delete-list">X</div>
                          </div>
                      )}
                    </Draggable>
                  )}
                  {provided.placeholder}
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
                </div>
            )}
          </Droppable>
        </DragDropContext>
        <div id="button-wrapper">
          <button id="add-list" onClick={addEmptyList}>+</button>
        </div>
      </div>
      <div id="todos">
        {active?
        <div id="buttons-left">
          <button id="clear-done" onClick={clearDone}>-</button>
        </div>
            : null
        }
        <DragDropContext onDragEnd={onDragEnd2}>
          <Droppable droppableId="list">
            {provided => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                { addingTodo ?
                <div id="input-todo-wrap">
                  <input
                    autoFocus
                    type="text"
                    value={todo}
                    onChange={onChange}
                    onKeyDown={e => handleKeyDown(e)}
                    id="new-todo"
                    name="todo"
                  /></div>
                  :
                  null
                }
                { lists[active] &&
                    lists[active].todos.map((todo,i) =>
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
        {active?
        <div id="buttons-right">
          <button id="add-todo" onClick={addEmptyTodo}>+</button>
        </div>
            : null
        }
      </div>
    </div>
  );
}

export default App;
