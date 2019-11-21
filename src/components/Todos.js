import React, { useState } from 'react';import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderTodos } from '../utils/Reorder';
import deleteButton from '../assets/delete.svg'
import priorityButton from '../assets/important.svg'
import editButton from '../assets/edit.svg'
import firebase from '../utils/Firebase.js';
import {
  StyledTodos,
  ListHeadline,
  InputWrapper,
  TodosInput,
  TodosList,
  TodoItemWrapper,
  TodosItem,
  Checkbox,
  ButtonsWrapper,
  ImageButton,
  ClearDone
} from './TodosStyles.js'

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
                          className={todo.completed?'completed':null}
                          color={todo.priority?'#ef3f3f':'#071e17'}
                          textDecoration={todo.completed?'line-through':null}
                          opacity={todo.completed?'0.5':null}
                          animation={todo.completed?'fade 1s forwards':null}
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
