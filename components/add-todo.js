import React from "react";
import { useMutation } from "@apollo/client";
import { AddTodoMutation } from "../graphql";

export default function AddTodo() {
  const [todoText, setTodoText] = React.useState("");
  const [mutationAddTodo] = useMutation(AddTodoMutation, {
    variables: { content: todoText },
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          getTodoList(existingTodoList) {
            return [...existingTodoList, data?.createTodo];
          },
        },
      });
    },
  });

  const addTodo = () => {
    if (!todoText) {
      return;
    }
    setTodoText("");
    mutationAddTodo();
  };

  return (
    <div>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
}
