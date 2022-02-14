import gql from "graphql-tag";

export const TodoListQuery = gql`
  query getTodoList {
    getTodoList {
      id
      content
      isCompleted
    }
  }
`;

export const AddTodoMutation = gql`
  mutation AddTodoMutation($content: String!) {
    createTodo(content: $content) {
      id
      content
      isCompleted
    }
  }
`;

export const DeleteTodoMutation = gql`
  mutation DeleteTodoMutation($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export const ToggleTodoMutation = gql`
  mutation ToggleTodoMutation($id: ID!) {
    toggleTodo(id: $id) {
      id
      content
      isCompleted
    }
  }
`;

export const UpdateTodoMutation = gql`
  mutation UpdateTodoMutation($id: ID!, $content: String!) {
    updateTodo(id: $id, content: $content) {
      id
      content
      isCompleted
    }
  }
`;
