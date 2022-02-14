import { gql } from "@apollo/client";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
  }

  type Todo {
    id: ID!
    content: String!
    isCompleted: Boolean!
  }

  type Query {
    viewer: User
    getTodoList: [Todo!]
  }

  type Mutation {
    createTodo(content: String!): Todo
    updateTodo(id: ID!, content: String!): Todo
    toggleTodo(id: ID!): Todo
    deleteTodo(id: ID!): Boolean
  }
`;
