import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TodoList from "../components/todo-list";
import AddTodo from "../components/add-todo";

const Index = () => {
  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <TodoList />
        <AddTodo />
      </Grid>
    </Container>
  );
};

export default Index;
