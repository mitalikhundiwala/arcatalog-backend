import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    email: String!
    id: ID!
    name: String
  }
  type Query {
    getUsers: [User]!
  }
  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;
