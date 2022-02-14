import {
  getTodoList,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
} from "../server/service/todos";

export const resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return { id: 1, name: "John Smith", status: "cached" };
    },
    getTodoList() {
      return getTodoList();
    },
  },
  Mutation: {
    createTodo(_, { content }) {
      return createTodo(content);
    },
    updateTodo(_, { id, content }) {
      return updateTodo(id, content);
    },
    toggleTodo(_, { id }) {
      return toggleTodo(id);
    },
    deleteTodo(_, { id }) {
      return deleteTodo(id);
    },
  },
};
