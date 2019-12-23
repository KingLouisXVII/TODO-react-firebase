import React from 'react';
import {
  TodosList,
  TodoItemWrapper,
  Checkbox,
  ButtonWrapper,
  ArchivedTodosItem,
  ClearArchive,
} from './styled/TodosStyles.js'


function Archive(props) {
  const { archive, setArchive, lists, setLists, active, set } = props;

  function unarchive(name, i) {
    const allLists = {...lists};
    const todos = allLists[active].todos;
    const newTodo = {
      name: name,
      completed: false,
      priority: false
    }
    todos.unshift(newTodo);
    todos.sort(function(a,b){return b.priority-a.priority});
    const archive = allLists[active].archive;
    allLists[active].archive = archive.filter(function (todo) {
      return todo.name !== name;
    });
    archive.length < 1 && archive.push({exist:true});
    setLists(allLists);
    set(allLists);
  }

  function clearArchive(active) {
    const allLists = {...lists};
    allLists[active].archive = [{exist:true}];
    setLists(allLists);
    set(allLists);
    setArchive(false);
  }

  return (
    <>
      <div style={{'textAlign':'center'}}>
        <h3>Archived Todos:</h3>
      </div>
      <TodosList key={Math.random()}>
        {!archive
          ? null
          : lists[active].archive 
          && lists[active].archive.length > 1 
          && lists[active].archive
          .reduce((todos, todo) => {
            if (!todo.exist) {
              todos.push(todo);
            }
            return todos;
          }, [])
          .map((todo,i) => 
            <TodoItemWrapper key={i}>
              <Checkbox 
                className={todo.completed?'checked':''} 
                onClick={()=>unarchive(todo.name,i)}
              />
              <ArchivedTodosItem >{todo.name}</ArchivedTodosItem>
            </TodoItemWrapper>
          )} 
          </TodosList>
        <ButtonWrapper>
          <ClearArchive onClick={()=>clearArchive(active)}>clear archive</ClearArchive>
        </ButtonWrapper>
        </>
  )
}

export default Archive;
