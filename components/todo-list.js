import React from "react";
import List from "@mui/material/List";
import { grey } from "@mui/material/colors";
import { useQuery } from "@apollo/client";
import { TodoListQuery } from "../graphql";
import Todo from "./todo";

export default function TodoList() {
  const { data, loading, error } = useQuery(TodoListQuery);

  if (loading || error) {
    return null;
  }

  return (
    <List sx={{ bgcolor: grey[100], mb: 2, maxHeight: 500, overflow: "auto" }}>
      {data.getTodoList.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          content={todo.content}
          isCompleted={todo.isCompleted}
        />
      ))}
    </List>
  );
}
