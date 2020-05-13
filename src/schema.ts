import { gql } from 'apollo-server';

export const typeDefs = gql`
    type User {
        email: String!
        userId: String!
        displayName: String!
        picture: String!
    }

    type Author {
        id: String!
        name: String!
    }

    type Book {
        id: String!
        title: String!
        author: [Author!]!
    }

    type Query {
        getUsers: [User]!
    }
    type Mutation {
        createBook(title: String!, author: [String!]!): Book!
    }
`;
