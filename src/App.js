import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Todos from './components/Todos';
import './App.scss';
import { checkTheme } from './utils/darkmode.js';
import firebase, { auth, provider } from './utils/Firebase.js';


function App() {
  const [lists, setLists] = useState({});
  const [active, setActive] = useState('');
  const [user, setUser] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user is logged');
        setUser(
          user
        );
      }})
  }, []);

  useEffect(() => {
    checkTheme();
    const itemsRef = firebase.database().ref(`/users/${user.uid}`);
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      set(items);
      const active = Object.keys(items).length > 0 ? Object.entries(items).filter(item => item[1].position === 0).reduce((acc, item) => { return acc = item[0]},'') : '';
      setActive(active);
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
    <div className="app">
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
        setActive={setActive}
        user={user}
      />
    </div>
  );
}

export default App;
