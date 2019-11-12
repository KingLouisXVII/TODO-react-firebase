import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable'
import Sidebar from './components/Sidebar';
import Todos from './components/Todos';
import './App.scss';
import { checkTheme } from './utils/darkmode.js';
import firebase, { auth, provider } from './utils/Firebase.js';


function App() {
  const [lists, setLists] = useState({});
  const [active, setActive] = useState('');
  const [user, setUser] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => active && swipeLeft(),
    onSwipedRight: () => active && swipeRight(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  function swipeLeft() {
    const allLists = {...lists};
    const array = Object.entries(allLists);
    const position = allLists[active].position;
    const next = array.filter(list => list[1].position === position + 1).reduce((acc,item)=>{return item[0]},'');
    const first = array.filter(list => list[1].position === 0).reduce((acc,item)=>{return item[0]},'');
    if(position === array.length-1) {
      setActive(first);
    }else{
      setActive(next);
    }
  }

  function swipeRight() {
    const allLists = {...lists};
    const array = Object.entries(allLists);
    const position = allLists[active].position;
    const prev = array.filter(list => list[1].position === position - 1).reduce((acc,item)=>{return item[0]},'');
    const last = array.filter(list => list[1].position === array.length - 1).reduce((acc,item)=>{return item[0]},'');
    if(position === 0) {
      setActive(last);
    }else{
      setActive(prev);
    }
  }

  useEffect(() => {
    checkTheme();
    const itemsRef = firebase.database().ref(`/users/${user.uid}`);
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      set(items);
    });
  }, [user]);

  function set(items) {
    items !== null ?
      setLists(items)
      :
      setLists({})
  }

  function login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        setUser(
          user
        );
      });
  }

  function logout() {
    auth.signOut()
      .then(() => {
        setUser(false);
        setLists({});
      });
  }

  return (
    <div className="app" {...handlers}>
      <Sidebar
        lists={lists}
        setLists={setLists}
        active={active}
        setActive={setActive}
        user={user}
        login={login}
        logout={logout}
      />
      <Todos
        lists={lists}
        setLists={setLists}
        active={active}
        user={user}
      />
    </div>
  );
}

export default App;
