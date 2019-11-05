import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Todos from './components/Todos';
import './App.scss';
import { checkTheme } from './utils/darkmode.js';


function App() {
  const [lists, setLists] = useState({});
  const [active, setActive] = useState('');

  useEffect(() => {
    const localTodos = localStorage.getItem('lists');
    localTodos ? setLists(JSON.parse(localTodos)) : setLists({});
    checkTheme();
  }, []);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  return (
    <div className="app">
      <Sidebar
        lists={lists}
        setLists={setLists}
        active={active}
        setActive={setActive}
      />
      <Todos
        lists={lists}
        setLists={setLists}
        active={active}
      />
    </div>
  );
}

export default App;
