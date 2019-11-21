import React, { useState } from 'react';import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { reorderTodos } from '../utils/Reorder';
import deleteButton from '../assets/delete.svg'
import priorityButton from '../assets/important.svg'
import editButton from '../assets/edit.svg'
import firebase from '../utils/Firebase.js';

const StyledTodos = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  @media (max-width: 700px) {
    height: 100%;
  }
`;

const ListHeadline = styled.h6`
  display: none;
  margin: 0;
  text-align: center;
  margin-top: 1.5em;
  @media (max-width: 700px) {
   display: block; 
  }
`;

const InputWrapper = styled.div`
  width: 80%;
  display: flex;
  position: sticky;
  top: 0;
  z-index: 99;
  @media (max-width: 700px) {
    width: 100%;
    margin: 0;
    height: 2em;
    justify-content: center;
    top: 2em;
  }
`;

const TodosInput = styled.input`
  height: auto;
  width: 100%;
  padding: 0.3em;
  margin-top: 1em;
  margin-left: 1em;
  margin-right: 1em;
  align-self: center;
  word-break: break-word;
  border: 2px solid;
  font-size: 1em;
  align-self: center;
  outline: none;
  background-color: #8f9779;
  color: 	#071e17;
  border-color: #071e17;
  box-shadow: 5px 5px #071e17;
  @media (max-width: 700px) {
    width: 85%;
    margin: 0;
  }
`;

const TodosList = styled.ul`
  width: 70%;
  list-style-type: none;
  margin: 0;
  overflow: scroll;
  flex: 2;
  @media (max-width: 700px) {
    width: 100%;
    padding: 0;
  }
`;

const TodoItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: default !important;
  width: 90%;
  margin-left: 0.8em;
`;

const TodosItem = styled.li`
  display: flex;
  justify-content: space-between;
  height: auto;
  width: 100%;
  padding: 0.2em;
  margin: 0.5em;
  cursor: pointer;
  align-self: center;
  word-break: break-word;
  border: 2px solid;
  font-size: 0.7em;
  background-color: #232b2b;
  color: 	#8f9779;
  border-color: #071e17;
  box-shadow: 5px 5px #071e17;
  &:hover, &:active {
    box-shadow: 5px 5px #25584f;
  }
  @media (max-width: 700px) {
        font-size: 0.7em;
  }
`;

const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  margin: 0.1em;
  cursor: pointer;
  text-align: center;
  border: 3px solid #071e17;
  background-color: #232b2b;
  box-shadow: 3px 3px 	#071e17;
  &.checked {
    background-color: 	#8f9779;
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  align-self: baseline;
`;

const ImageButton = styled.img`
  cursor: pointer;
  width: 0.9em;
  opacity: 0.3;
  padding-left: 0.5em;
  &:hover {
    opacity: 1;
  }
`;

const ClearDone = styled.h2`
 &:hover {
  transition: all 0.5s ease;
  opacity: 0.7;
 }  
`;

function Todos(props) {
  const [input, setInput] = useState('');
  const { lists, setLists, active, user } = props;


  function onChange(e) {
    setInput(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && e.target.name === 'todo' && input.length !== 0) {
      addTodo(e);
      setInput('');
    }
  }

  function addTodo() {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    const newTodo = {
      name: input,
      completed: false,
      priority: false
    }
    todos.unshift(newTodo);
    todos.sort(function(a,b){return b.priority-a.priority});
    setLists(allLists);
    set(allLists);
  }

  function toggleTodo(i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    todos[i].completed = !todos[i].completed;
    todos[i].priority = false;
    todos.sort(function(a,b){return a.completed-b.completed});
    setLists(allLists);
    set(allLists);
  }

  function deleteTodo(i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    todos.length<=1&&todos.push({exist:true});
    todos.splice(i,1);
    console.log(todos);
    console.log(allLists);
    setLists(allLists);
    set(allLists);
  }

  function set(lists) {
    const itemsRef = firebase.database().ref(`/users/${user.uid}`);
    itemsRef.set(lists);
  }

  function removeCompleted(todo) {
    return todo.completed === false;
  } 

  function clearDone() {
    const allLists = {...lists};
    const newTodos = allLists[active].todos.filter(removeCompleted);
    allLists[active].todos = newTodos;
    setLists(allLists);
    setInput('');
    set(allLists);
  }

  function editTodo(i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    const todo = todos[i].name;
    todos.splice(i,1);
    setLists(allLists);
    setInput(todo);
    set(allLists);
  }

  function prioritize(i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    todos[i].priority = !todos[i].priority;
    todos[i].completed = false;
    todos.sort(function(a,b){return b.priority-a.priority});
    setLists(allLists);
    set(allLists);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const allLists = {...lists};
    reorderTodos(
      allLists[active].todos,
      result.source.index,
      result.destination.index
    );
    props.setLists(allLists);
  }

  return (
    <StyledTodos id="todos">
      <ListHeadline>{active}</ListHeadline>
      {active?
      <InputWrapper>
        <TodosInput
          autoComplete="off"
          type="text"
          placeholder="..."
          value={input}
          onChange={onChange}
          onKeyDown={e =>handleKeyDown(e)}
          name="todo"
        />
      </InputWrapper>
          : null
      }
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {provided => (
            <TodosList ref={provided.innerRef} {...provided.droppableProps}>
              {lists[active] ?
                lists[active].todos.reduce((todos, todo) => {
                  if (!todo.exist) {
                    todos.push(todo);
                  }
                  return todos;
                }, []).map((todo,i) =>
                  <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                    {provided => (
                      <TodoItemWrapper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Checkbox className={todo.completed?'checked':''} onClick={e=>toggleTodo(i)}></Checkbox>
                        <TodosItem
                          className={todo.completed?'completed':todo.priority?'priority':''}
                        >{todo.name}                        
                          <ButtonsWrapper>
                            <div onClick={e=>editTodo(i)} ><ImageButton alt="edit-todo" src={editButton}/></div>
                            <div onClick={e=>prioritize(i)}><ImageButton alt="prioritize-todo" src={priorityButton}/></div>
                            <div onClick={e=>deleteTodo(i)} ><ImageButton alt="delete-todo" src={deleteButton}/></div>
                          </ButtonsWrapper> 
                        </TodosItem>
                      </TodoItemWrapper>
                    )
                    }
                  </Draggable>
                )
                :
                null
              }
              {provided.placeholder}
            </TodosList>
          )}
        </Droppable>
      </DragDropContext>
      { 
        lists[active] && lists[active].todos.some(todo => todo.completed === true) ? 
          <ClearDone onClick={clearDone}>clear done</ClearDone> 
          : 
          null
      }
    </StyledTodos>
  )
}

export default Todos;
