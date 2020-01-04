import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Todos from './components/Todos';
import firebase, { auth, provider, connectedRef } from './utils/Firebase.js';
import './App.scss';
import './assets/hamburgers/hamburgers.scss';
import { AppContainer, PageWrap } from './AppStyles.js';
import { scaleDown as Menu } from 'react-burger-menu'
import {
  MobileHamburger, 
  Hamburger, 
  ListHeadline
} from './components/styled/SidebarStyles.js'


function App() {
  const [lists, setLists] = useState({test:'test'});
  const [active, setActive] = useState('');
  const [user, setUser] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [edit, setEdit] = useState(-1);
  const [editName, setEditName] = useState('');
  const [archive, setArchive] = useState(false);

  useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            setUser(
              user
            );
          }})
  }, []);

  // useEffect(() => {
  //   const itemsRef = firebase.database().ref(`/users/${user.uid}`);
  //   itemsRef.on('value', (snapshot) => {
  //     let items = snapshot.val();
  //     set(items);
  //   });
  // }, [user]);

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

  function toggleSidebar() {
    setToggle(!toggle);
    setEdit(-1);
    setEditName('');
  }

  return (
    <AppContainer toggle={toggle} id="outer-container">
      <Menu 
        disableOverlayClick={()=>toggleSidebar()}
        isOpen={toggle} 
        pageWrapId={ "page-wrap" } 
        outerContainerId={ "outer-container" } 
        customBurgerIcon={ false }
        customCrossIcon={ false }
      >
        <Sidebar
          lists={lists}
          setLists={setLists}
          active={active}
          setActive={setActive}
          user={user}
          login={login}
          logout={logout}
          toggle={toggle}
          toggleSidebar={toggleSidebar}
          edit={edit}
          setEdit={setEdit}
          editName={editName}
          setEditName={setEditName}
          archive={archive}
          setArchive={setArchive}
        />
      </Menu>
      <MobileHamburger>
        <Hamburger
          className={
            toggle ?
              'hamburger  hamburger--collapse is-active'
              :
              'hamburger  hamburger--collapse'}
                onClick={toggleSidebar}
                type="button"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </Hamburger>
            </MobileHamburger>
            <PageWrap id="page-wrap">
              {active?<ListHeadline>{active}</ListHeadline>:null}
              <Todos
                lists={lists}
                setLists={setLists}
                active={active}
                setActive={setActive}
                user={user}
                archive={archive}
                setArchive={setArchive}
              />
            </PageWrap>
          </AppContainer>
  );
}

export default App;
