import React, { useState } from 'react';
import firebase from '../utils/Firebase.js';
import {
  StyledTodos,
  InputWrapper,
  TodosInput,
  ButtonWrapper,
  ClearDone,
  ToggleArchive,
} from './TodosStyles.js'
import Archive from './Archive';
import TodosListWrapper from './TodosListWrapper';


function Todos(props) {
  const [input, setInput] = useState('');
  const [edit, setEdit] = useState(-1);
  const [editName, setEditName] = useState('');
  const [editValue, setEditValue] = useState({});
  const [toggleButtons, setToggleButtons] = useState(-1);
  const { lists, setLists, active, user, archive, setArchive } = props;


  function onChange(e) {
    if (e.target.name === 'todo') {
      setInput(e.target.value);
    } else if (e.target.name === 'edit') {
      setEditName(e.target.value);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && e.target.name === 'todo' && input.length !== 0) {
      addTodo(e);
      setInput('');
    } else if (e.key === 'Enter' && e.target.name === 'edit' && editName.length !== 0) {
      addEditedTodo(e);
      setEdit(-1);
      setEditName('');
      setEditValue({});
      setToggleButtons(-1);
    }
  }

  function addEditedTodo() {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    const position = editValue.position;
    const newTodo = {
      completed: editValue.completed,
      name: editName,
      priority: editValue.priority
    }
    todos.splice(position, 1, newTodo);
    setLists(allLists);
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

  function set(lists) {
    const itemsRef = firebase.database().ref(`/users/${user.uid}`);
    itemsRef.set(lists);
  }

  function removeCompleted(todo) {
    return todo.completed === false;
  } 

  function returnCompleted(todo) {
    return todo.completed === true;
  } 

  function clearDone() {
    const allLists = {...lists};
    const prevArchive = allLists[active].archive;
    const newTodos = allLists[active].todos.filter(removeCompleted);
    const archivedTodos = allLists[active].todos.filter(returnCompleted);
    newTodos.length <= 1 && newTodos.push({exist:true});
    allLists[active].todos = newTodos;
    allLists[active].archive = [...prevArchive, ...archivedTodos];
    setLists(allLists);
    setInput('');
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
    setToggleButtons(-1);
  }

  function editTodo(i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    const name = todos[i].name;
    const priority = todos[i].priority;
    const completed = todos[i].completed;
    const position = i;
    const newTodo = {
      name: name,
      priority: priority,
      completed: completed,
      position: position,
    };
    setEditValue(newTodo);
    setEditName(name);
    setEdit(i);
  }

  function deleteTodo(i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    todos.splice(i,1);
    todos.length <= 1 && todos.push({exist:true});
    setLists(allLists);
    set(allLists);
    setToggleButtons(-1);
  }

  return (
    <StyledTodos id="todos">
      {active
          ? <InputWrapper>
            <TodosInput
              autoComplete="off"
              type="text"
              placeholder="..."
              value={input.toUpperCase()}
              onChange={onChange}
              onKeyDown={e =>handleKeyDown(e)}
              name="todo"
            />
          </InputWrapper>
          : null
      }
      <TodosListWrapper
        lists={lists}
        setLists={setLists}
        active={active}
        edit={edit}
        toggleTodo={toggleTodo}
        editName={editName}
        handleKeyDown={handleKeyDown}
        toggleButtons={toggleButtons}
        editTodo={editTodo}
        prioritize={prioritize}
        deleteTodo={deleteTodo}
        setToggleButtons={setToggleButtons}
        onChange={onChange}
      />
      { lists[active] && lists[active].todos.some(todo => todo.completed === true) 
          ? <ButtonWrapper><ClearDone onClick={clearDone}>clear done</ClearDone></ButtonWrapper> 
          : null
      }
      { lists[active] && lists[active].archive && lists[active].archive.length > 1
          ? <ButtonWrapper>
            <ToggleArchive onClick={()=>setArchive(!archive)}>
              {archive?'hide':'show'} archive
            </ToggleArchive>
          </ButtonWrapper>
          : null
      }
      {!archive 
          ? null 
          : <Archive 
            lists={lists}
            setLists={setLists}
            active={active}
            set={set}
            archive={archive}
            setArchive={setArchive}
          />
      }
    </StyledTodos>
  )
}

export default Todos;
