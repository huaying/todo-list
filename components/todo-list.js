import React from "react";
import { useQuery } from "@apollo/client";
import { TodoListQuery } from "../graphql";
import Todo from "./todo";

export default function TodoList() {
  const { data, loading, error } = useQuery(TodoListQuery);

  if (loading || error) {
    return null;
  }

  return (
    <div>
      {data.getTodoList.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          content={todo.content}
          isCompleted={todo.isCompleted}
        />
      ))}
    </div>
  );
}
