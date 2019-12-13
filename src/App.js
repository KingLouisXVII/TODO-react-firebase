import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Todos from './components/Todos';
import { checkTheme } from './utils/darkmode.js';
import firebase, { auth, provider } from './utils/Firebase.js';
import './App.scss';
import AppContainer from './AppStyles.js';
import './assets/hamburgers/hamburgers.scss';

import {
  MobileHamburger, 
  Hamburger, 
  ListHeadline
} from './components/SidebarStyles.js'


function App() {
  const [lists, setLists] = useState({});
  const [active, setActive] = useState('');
  const [user, setUser] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
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

  function toggleLists() {
    setToggle(!toggle);
  }
  return (
    <AppContainer toggle={toggle}>
      <Sidebar
        lists={lists}
        setLists={setLists}
        active={active}
        setActive={setActive}
        user={user}
        login={login}
        logout={logout}
        toggle={toggle}
        setToggle={setToggle}
        toggleLists={toggleLists}
      />
      {active?<ListHeadline>{active}</ListHeadline>:null}
        <MobileHamburger>
      <Hamburger
        className={
          toggle ?
            'hamburger  hamburger--collapse is-active'
            :
            'hamburger  hamburger--collapse'}
              onClick={toggleLists}
              type="button"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </Hamburger>
          </MobileHamburger>
          <Todos
            lists={lists}
            setLists={setLists}
            active={active}
            setActive={setActive}
            user={user}
          />
        </AppContainer  >
  );
}

export default App;
