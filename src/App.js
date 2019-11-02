import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable'
import Sidebar from './components/Sidebar';
import Todos from './components/Todos';
import './App.scss';


function App() {
  const [lists, setLists] = useState({});
  const [input, setInput] = useState('');
  const [active, setActive] = useState('');

  const handlers = useSwipeable({
    onSwipedDown: () => alert("NEXT"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  useEffect(() => {
    const localTodos = localStorage.getItem('lists');
    localTodos ? setLists(JSON.parse(localTodos)) : setLists({});
  }, []);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  return (
    <div className="app"  {...handlers}>
      <Sidebar
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
      />
    </div>
  );
}

export default App;
