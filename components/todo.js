import React from "react";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { pink } from "@mui/material/colors";
import { useMutation } from "@apollo/client";
import {
  DeleteTodoMutation,
  UpdateTodoMutation,
  ToggleTodoMutation,
} from "../graphql";

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

  const [mutationToggleTodo] = useMutation(ToggleTodoMutation, {
    variables: { id },
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
    <ListItem sx={{ height: 60 }}>
      {isEditing ? (
        <Grid container spacing={2} alignItems="center">
          <Grid item sm xs>
            <TextField
              size="small"
              type="text"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setIsEditing(false);
                  mutationUpdateTodo();
                }
              }}
            />
          </Grid>
          <Grid item>
            <CheckIcon
              sx={{ cursor: "pointer" }}
              color="success"
              onClick={() => {
                setIsEditing(false);
                mutationUpdateTodo();
              }}
            />
          </Grid>
          <Grid item>
            <CloseIcon
              sx={{ cursor: "pointer" }}
              color="action"
              onClick={() => {
                setIsEditing(false);
                setTodoText(content);
              }}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} alignItems="center">
          <Grid
            item
            sm
            xs
            sx={{
              cursor: "pointer",
              "text-decoration": isCompleted ? "line-through" : undefined,
            }}
            onClick={mutationToggleTodo}
          >
            <ListItemText>{content}</ListItemText>
          </Grid>
          <Grid item>
            <EditOutlinedIcon
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() => setIsEditing(true)}
            />
          </Grid>
          <Grid item>
            <DeleteOutlineIcon
              onClick={mutationDeleteTodo}
              sx={{ cursor: "pointer", color: pink[500] }}
            />
          </Grid>
        </Grid>
      )}
    </ListItem>
  );
}
