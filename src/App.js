import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
    const [lists, setLists] = useState([{
        name: 'main',
        active: true,
        todos: [{
            name: 'test',
            completed: false
        },{
            name: 'test2',
            completed: false
        }]
    }])
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');


    useEffect(() => {
        const allLists = [...lists];
        const activeList = allLists.filter(list => list.active === true);
        console.log(activeList)
        const activeTodos = activeList[0].todos; 
        setTodos(activeTodos);
    }, [lists])

    function addTodo() {
        const newLists = [...lists];
        const newTodos = newLists[0].todos;
        const newTodo = {name:todo, completed:false};
        newTodos.push(newTodo);
        setTodos(newTodos);
    }

    function onChange(e) {
        setTodo(e.target.value);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            addTodo(e);
            setTodo('');
        }
    }

    return (
        <div className="App">
            {
                lists.map((list,i) =>
                        <div>{list.name}</div>
            )}
                        <input
                            type="text"
                            value={todo}
                            onChange={onChange}
                            onKeyDown={e => handleKeyDown(e)}
                        />
                        <ul>
                            {
                                todos.map((todo,i) =>
                                    <li>{todo.name}</li>
                                )
                            }
                        </ul>
        </div>
    );
}

export default App;

