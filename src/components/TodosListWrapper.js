import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderTodos } from '../utils/Reorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faExclamation, faTimes, faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {
  TodosList,
  TodoItemWrapper,
  TodosItem,
  EditTodo,
  Checkbox,
  TodoButtonsWrapper,
} from './styled/TodosStyles.js'


function TodosListWrapper(props) {
  const { lists, setLists, active, edit, toggleTodo, editName, handleKeyDown, toggleButtons, editTodo, prioritize, deleteTodo, setToggleButtons, onChange } = props;

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
    setLists(allLists);
  }

  return (
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
                edit === i ?
                  <TodoItemWrapper
                    key={i.toString()}
                  >
                    <Checkbox 
                      className={todo.completed ? 'checked' : ''} 
                      onClick={e => toggleTodo(i)}
                    />
                    <EditTodo 
                      autoFocus
                      type="text"
                      value={editName.toUpperCase()}
                      onChange={onChange}
                      onKeyDown={e => handleKeyDown(e)}
                      name="edit"
                    />
                  </TodoItemWrapper>
                : <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                  {provided => (
                    <TodoItemWrapper
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Checkbox 
                        className={todo.completed?'checked':''} 
                        onClick={e=>toggleTodo(i)}/>
                      <TodosItem
                        className={todo.completed ? 'completed' : undefined}
                        bordercolor={todo.priority ? '#ef3f3f' : '#071e17'}
                        textDecoration={todo.completed ? 'line-through': undefined}
                      >
                        <span>{todo.name}</span>                        
                        {toggleButtons === i 
                            ? <TodoButtonsWrapper justify={toggleButtons === i ? 1 : 0}>
                              <FontAwesomeIcon icon={faEdit} onClick={e => editTodo(i)}/>
                              <FontAwesomeIcon icon={faExclamation} onClick={e => prioritize(i)}/>
                              <FontAwesomeIcon icon={faTrashAlt} onClick={e => deleteTodo(i)}/>
                              <FontAwesomeIcon icon={faTimes} onClick={e => setToggleButtons(-1)}/>
                            </TodoButtonsWrapper> 
                            : <TodoButtonsWrapper justify={toggleButtons === i ? 1 : 0}>
                              <FontAwesomeIcon icon={faEllipsisH} onClick={e => setToggleButtons(i)}/>
                            </TodoButtonsWrapper> 
                        }
                      </TodosItem>
                    </TodoItemWrapper>
                  )}
                </Draggable>
              )
              : null
            }
            {provided.placeholder}
          </TodosList>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default TodosListWrapper;
