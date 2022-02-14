import React from "react";
import { useMutation } from "@apollo/client";
import { DeleteTodoMutation, UpdateTodoMutation } from "../graphql";

export default function Todo({ id, content, isCompleted }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [todoText, setTodoText] = React.useState(content);
  const [mutationDeleteTodo] = useMutation(DeleteTodoMutation, {
    variables: { id },
    update: (cache) => {
      cache.modify({
        fields: {
          getTodoList(existingTodoList, { readField }) {
            return existingTodoList.filter(
              (todo) => id !== readField("id", todo)
            );
          },
        },
      });
    },
  });

  const [mutationUpdateTodo] = useMutation(UpdateTodoMutation, {
    variables: { id, content: todoText },
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          getTodoList(existingTodoList, { readField }) {
            return existingTodoList.map((todo) =>
              todo.id !== id ? todo : data.updateTodo
            );
          },
        },
      });
    },
  });

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button
            onClick={() => {
              setIsEditing(false);
              mutationUpdateTodo();
            }}
          >
            done
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setTodoText(content);
            }}
          >
            cancel
          </button>
        </>
      ) : (
        <>
          <div>{content}</div>
          <button onClick={() => setIsEditing(true)}>edit</button>
          <button onClick={mutationDeleteTodo}>x</button>
        </>
      )}
    </div>
  );
}
