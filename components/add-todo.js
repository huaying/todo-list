import React from "react";
import Grid from "@mui/material/Grid";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { AddTodoMutation } from "../graphql";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function AddTodo() {
  const [todoText, setTodoText] = React.useState("");
  const [mutationAddTodo] = useMutation(AddTodoMutation, {
    variables: { content: todoText },
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          getTodoList(existingTodoList) {
            const newTodoRef = cache.writeFragment({
              data: data.createTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                }
              `,
            });
            return [...existingTodoList, newTodoRef];
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
    <Grid container spacing={2} alignItems="center">
      <Grid item sm>
        <TextField
          size="small"
          fullWidth
          label="Add Todo"
          variant="outlined"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={addTodo} disabled={!todoText}>
          Add Todo
        </Button>
      </Grid>
    </Grid>
  );
}
