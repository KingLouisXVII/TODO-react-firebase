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
    const first = Object.keys(JSON.parse(localTodos))[0];
    localTodos ? setActive(first) : setActive('');
    checkTheme();
  }, []);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  function handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
      const allLists = {...lists};
      const array = Object.keys(allLists);
      const current = array.indexOf(active);
      const next = array[current-1===-1?current:current-1];
      setActive(next);
    }
    else if (e.key === 'ArrowDown') {
      const allLists = {...lists};
      const array = Object.keys(allLists);
      const current = array.indexOf(active);
      const next = array[current+1===array.length?current:current+1];
      setActive(next);
    }
  }
  return (
    <div className="app" onKeyDown={e => handleKeyDown(e) }>
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
