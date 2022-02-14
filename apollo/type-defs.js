import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Todo {
    id: ID!
    content: String!
    isCompleted: Boolean!
  }

  type Query {
    getTodoList: [Todo!]
  }

  type Mutation {
    createTodo(content: String!): Todo
    updateTodo(id: ID!, content: String!): Todo
    toggleTodo(id: ID!): Todo
    deleteTodo(id: ID!): Boolean
  }
`;
