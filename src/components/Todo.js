import React from "react";

export default function Todo({ todo, toggleTodo }) {
  const todoHandler = () => {
    toggleTodo(todo.id);
  };
  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.complete} onChange={todoHandler} />
        {todo.name}
      </label>
    </div>
  );
}
