import React from "react";
import List from "@mui/material/List";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { useQuery } from "@apollo/client";
import { TodoListQuery } from "../graphql";
import Todo from "./todo";

export default function TodoList() {
  const listRef = React.useRef();
  const todoCount = React.useRef(0);
  const { data, loading, error } = useQuery(TodoListQuery);

  React.useEffect(() => {
    if (listRef && data) {
      if (data.getTodoList.length > todoCount.current) {
        listRef.current.scrollTo({
          top: listRef.current.scrollHeight,
          left: 0,
          behavior: "smooth",
        });
      }
      todoCount.current = data.getTodoList.length;
    }
  });

  if (loading) {
    return (
      <Box sx={{ mb: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return message.message;
  }

  if (data.getTodoList.length === 0) {
    return <Box sx={{ mb: 4 }}>You have no todos yet.</Box>;
  }

  return (
    <List
      ref={listRef}
      sx={{ bgcolor: grey[100], mb: 4, maxHeight: 460, overflow: "auto" }}
    >
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
