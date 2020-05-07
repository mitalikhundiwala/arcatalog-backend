import { gql } from 'apollo-server';

export const typeDefs = gql`
    type User {
        email: String!
        userId: String!
        displayName: String!
        picture: String!
    }
    type Query {
        getUsers: [User]!
    }
    type Mutation {
        createUser(name: String!, email: String!): User!
    }
`;
