import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderLists, reposition } from '../utils/Reorder';
import deleteButton from '../assets/delete.svg'
import editButton from '../assets/edit.svg'
import '../assets/hamburgers/hamburgers.scss';
import firebase from '../utils/Firebase.js';

const StyledSidebar = styled.div`
  background-color: #232b2b;
  border-right: 7px solid #071e17;
  text-align: center;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  @media (max-width: 700px) {
    z-index: 999;   
    border: 0;
    overflow: visible;
    height: 5%;
  }
`;

const MobileHamburger = styled.div`
@media (max-width: 700px) {
  display: flex;
  justify-content: space-between;
  height: 1.5em;
  border: 0;
  padding: 0.5em;
  align-items: center;
}
`;

const Hamburger = styled.button`
  display: none;
  @media (max-width: 700px) {
    display: flex;
    padding: 0;
    margin: 0;
  } 
`;

const Logo = styled.h1`
  font-size: 2em;
  margin: 0;
  background-color: #232b2b;
  cursor: pointer;
  opacity: 0.8;
  @media (max-width: 700px) {
   font-size: 1.3em; 
  }
`;

const LoginButtons = styled.div`
  background-color: #232b2b;
  border-bottom: 2px solid #071e17;
  display: flex;
  justify-content: space-evenly;
  padding: 1em;
  height: 1em;
`;

const LoginOutButton = styled.button`
font-size: 0.5em;
  font-weight: 900;
  cursor: pointer;
  border: 0;
  background-color: transparent;
  outline: 0;
`;

const EditToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 0.7em;
    height: 1em;
  }
`;

const SidebarInput = styled.input `
  background-color: #232b2b;
  color: 	#8f9779;
  font-size: 0.9em;
  border: 0;
  outline: none;
  padding: 0.3em;
  border-bottom: 2px solid;
  border-color: #071e17;
  @media (max-width: 700px) {
    width: 100%;
  }
;`

const Lists = styled.div`
  height: auto;
  display: ${props => props.display};
  flex-direction: column;
  background-color: #232b2b;
  @media (max-width: 700px) {
    height: 100vh;
    animation: ${props => props.animation};
    z-index: 99;
    overflow-y: scroll;
    overflow-x: hidden;
  }
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  cursor: pointer;
  word-break: break-word;
  background-color: #232b2b;
  border-bottom: 2px solid 	#071e17;
  color: 	#8f9779;
  &.active {
    border-color: #ef3f3f;
    background-color:	#25584f;
    color: #8f9779;
  }
`;

const DeleteList = styled.div`
  opacity: 0.3;
  text-shadow: 5px 4px #000;
  cursor: pointer;
  font-size: 1.5em;
  width: 0.7em;
  color: indianred;
  align-self: right;
  transition: all 0.2s ease;
  position: relative;
  &:hover {
    opacity: 1;
  }
  @media (max-width: 700px) {
    opacity: 0.6;
    padding-right: 0.5em;
  }
`;

const DeleteDialog = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  opacity: 0.5;
  #yes {
    color: green;
    cursor: pointer;
  }
  #no {
    color: red;
    cursor: pointer;
  }
`;

function Sidebar(props) {
  const [input, setInput] = useState('');
  const [toggle, setToggle] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [deleting, setDeleting] = useState(-1);
  const [editToggle, setEditToggle] = useState(false);
  const { active, setActive, lists, setLists, user, login, logout } = props;

  function onChange(e) {
    setInput(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && e.target.name === 'list' && input.length !== 0) {
      addList();
      setInput('');
    }
  }

  function addList() {
    const allLists = {...lists};
    const position = Object.keys(allLists).length;
    const newList = {todos:[{exist:true}],position:position};
    if ( !(input in allLists ) ) {
      allLists[input] = newList;
    }
    input && setLists(allLists);
    setActive(input);
    setInput('');
    set(allLists);
  }

  function deleteList(list) {
    const allLists = {...lists};
    reposition(allLists, list);
    delete allLists[list];
    setLists(allLists);
    set(allLists);
    setDeleting(-1)
  }

  function set(lists) {
    const itemsRef = firebase.database().ref(`/users/${user.uid}`);
    itemsRef.set(lists);
  }

  function switchList(list) {
    toggleLists();
    setActive(list);
  }

  function toggleLists() {
    setLoaded(true);
    setToggle(!toggle);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const allLists = {...lists};
    const orderedLists = reorderLists(
      allLists,
      result.source.index,
      result.destination.index
    );
    setLists(orderedLists);
    set(orderedLists);
  }

  return (
    <StyledSidebar>
      <DragDropContext onDragEnd={onDragEnd}>
        <MobileHamburger>
          <Logo onClick={() => {setActive('')} } >TODO!</Logo>
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
              <Droppable droppableId="sidebar">
                {provided => (
                  <Lists 
                    animation={loaded?toggle?'slideIn .3s ease-in':'slideOut .3s ease-in forwards':null}
                    display={loaded?toggle?'flex':'flex':'none'}
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                  >
                    <LoginButtons>
                      {user
                          ? <LoginOutButton onClick={logout}>logout</LoginOutButton>
                          : <LoginOutButton Click={login}>login</LoginOutButton>
                      }
                      <EditToggle onClick={() => setEditToggle(!editToggle)}><img alt="edit-toggle" src={editButton}/></EditToggle >
                    </LoginButtons>
                    <SidebarInput
                      autoComplete="off"
                      type="text"
                      placeholder="..."
                      value={input}
                      onChange={onChange}
                      onKeyDown={ e => handleKeyDown(e) }
                      id="new-list"
                      name="list"
                    />
                    {lists &&
                        Object.entries(lists)
                        .sort((a, b) => a[1].position - b[1].position)
                        .map((list,i) =>
                          <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                            {provided => (
                              <List 
                                className={list[0]&&list[0]===active?"active":""}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                  onClick={e => switchList(list[0])}
                                >
                                  {deleting === i
                                      ? <DeleteDialog>Delete? <span onClick={ (e) => deleteList(list[0]) } id="yes">Yes</span><span onClick={()=> setDeleting(-1)} id="no">No</span></DeleteDialog >
                                      : <div className="list-name-wrapper" ><div>{list[0]}</div></div>
                                  }
                                  {editToggle 
                                      ? <DeleteList onClick={()=>setDeleting(i)}><img alt="delete-list" src={deleteButton}/></DeleteList>
                                      : <DeleteList onClick={()=>setDeleting(i)} className="hidden"><img alt="delete-list" src={deleteButton}/></DeleteList>
                                  }
                                </List>
                            )}
                          </Draggable>
                        )}
                        {provided.placeholder}
                      </Lists>
                )}
              </Droppable>
            </DragDropContext>
          </StyledSidebar>
  );
}

export default Sidebar;
