"use client";
import React from "react";
export interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  toggleTodo: (checked: boolean, id: string) => void;
}

const TodoItem = (props: TodoItemProps) => {
  return (
    <li className="flex gap-1 items-center">
      <input
        id={props.id}
        type="checkbox"
        className="w-4 h-4 cursor-pointer peer"
        defaultChecked={props.completed}
        onChange={(e) => props.toggleTodo(e.target.checked, props.id)}
      />

      <label
        htmlFor={props.id}
        className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
      >
        {props.title}
      </label>
    </li>
  );
};

export default TodoItem;
