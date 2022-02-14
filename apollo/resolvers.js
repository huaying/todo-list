import {
  getTodoList,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
} from "../server/service/todos";

export const resolvers = {
  Query: {
    getTodoList() {
      return getTodoList();
    },
  },
  Mutation: {
    createTodo(_, { content }) {
      return createTodo(content);
    },
    updateTodo(_, { id, content }) {
      if (content) {
        return updateTodo(id, content);
      }
      throw Error("content is required");
    },
    toggleTodo(_, { id }) {
      return toggleTodo(id);
    },
    deleteTodo(_, { id }) {
      return deleteTodo(id);
    },
  },
};
