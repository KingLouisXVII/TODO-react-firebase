import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Todos from './components/Todos';
import './App.scss';


function App() {
  const [lists, setLists] = useState({});
  const [input, setInput] = useState('');
  const [active, setActive] = useState('');
  const [addingTodo, setAddingTodo] = useState(false);
  const [addingList, setAddingList] = useState(false);

  useEffect(() => {
    const localTodos = localStorage.getItem('lists');
    localTodos ? setLists(JSON.parse(localTodos)) : setLists({})
  }, []);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  return (
    <div className="app">
      <Sidebar
        addingList={addingList}
        setAddingList={setAddingList}
        lists={lists}
        setLists={setLists}
        input={input}
        setInput={setInput}
        active={active}
        setActive={setActive}
      />
      <Todos
        lists={lists}
        setLists={setLists}
        input={input}
        setInput={setInput}
        active={active}
        addingTodo={addingTodo}
        setAddingTodo={setAddingTodo}
      />
    </div>
  );
}

export default App;
