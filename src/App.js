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
    checkTheme();
    const itemsRef = firebase.database().ref(`/users/${user.uid}`);
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      // console.log('items:', items);
      // const array =  items && Object.entries(items);
      // console.log('array:', array)
      // const sortedArray = array && array.sort((a, b) => a[1].position - b[1].position);
      // console.log('sortedArray:', sortedArray)
      // const sortedObject =   sortedArray && sortedArray 
      //   .reduce(function(acc, item) {
      //     acc[item[0]] = item[1];

      //     return acc;
      //   }, {});
      // console.log('sortedObject:', sortedObject)

      meow(items);
    });
  }, [user]);

  function meow(items) {
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
        user={user}
      />
    </div>
  );
}

export default App;
