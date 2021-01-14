import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import TodoList from "./components/TodoList";

const LOCAL_STORAGE_KEY = "todoApp.todos";

const App = () => {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []); //useEffect always call whenever dependencies has a changes. THIS WILL RAN ONCE SINCE IT HAS EMPTY ARRAY

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]); //will run this function everytime {todos} has a changes.

  const onClickHandler = (event) => {
    const name = todoNameRef.current.value;
    if (name === "") {
      return;
    }
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null; // clear textbox
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  };

  return (
    <div className="todoApp">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button type="submit" onClick={onClickHandler}>
        Add todo
      </button>
      <button type="submit">Clear todo</button>
    </div>
  );
};

export default App;
