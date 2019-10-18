import React, { useState, useEffect } from 'react';
import { reorderLists,reorderTodos } from './utils/Reorder';
import Sidebar from './components/Sidebar';
import Todos from './components/Todos';
import './App.scss';


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

  const  onDragEnd = (result) => {
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
    <div className="app">
      <Sidebar
        onDragEnd={onDragEnd}
        switchList={switchList}
        deleteList={deleteList}
        addingList={addingList}
        onChange={onChange}
        handleKeyDown={handleKeyDown}
        addEmptyList={addEmptyList}
        lists={lists}
        todo={todo}
        active={active}
      />
      <Todos
        onDragEnd2={onDragEnd2}
        addEmptyTodo={addEmptyTodo}
        onChange={onChange}
        handleKeyDown={handleKeyDown}
        clearDone={clearDone}
        lists={lists}
        todo={todo}
        active={active}
        addingTodo={addingTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
