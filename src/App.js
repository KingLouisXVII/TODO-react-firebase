import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Todos from './components/Todos';
import './App.scss';
import { checkTheme } from './utils/darkmode.js';
import firebase, { auth, provider } from './utils/Firebase.js';

const AppContainer = styled.div`
  font-family: 'Anton', sans-serif;
  display: grid;
  grid-template-columns: 25% auto;
  width: 100vw;
  height: 100vh;
  background-color:	#232b2b;
  color: 	#8f9779;
  overflow: hidden;
  @media (max-width: 700px) {
  display: grid;
    grid-template-columns: 100%;
    border: 0;
    box-shadow: none;
    grid-template-rows: 6% 90% auto;
  }
`;

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
    <AppContainer>
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
    </AppContainer  >
  );
}

export default App;
