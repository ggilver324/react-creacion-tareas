import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { TodoLists } from './components/TodoLists';

export const App = () => {

  const KEY = "todoApp.todos";

  const tasks = [{
    id: '1',
    task: 'Tarea 1',
    completed: false
  }];

  const [todos, setTodos] = useState( tasks );

  const todoTaskRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if(storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [ todos ]);

  const toggleTodo = (id) =>{
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }
  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;

    if(task === '') return;

    setTodos((prevTodos) => {

      return [...prevTodos, {id: uuidv4(), task, completed: false}]
    });

    todoTaskRef.current.value = null;
  }

  return (
        <>
          <h1 className="container text-center">Lista de tareas</h1>
          <TodoLists todos={ todos } toggleTodo={toggleTodo} />
          <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
          <button className="btn btn-primary" onClick={handleTodoAdd}>Agregar</button>
          <button onClick={handleClearAll} className="btn btn-danger">Eliminar</button>
          <div>
            Te quedan {todos.filter((todo) => !todo.completed).length} por terminar
          </div>
        </>
        );
}

