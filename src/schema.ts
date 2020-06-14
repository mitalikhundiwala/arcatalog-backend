import { gql } from 'apollo-server';

export const typeDefs = gql`
    enum Role {
        USER
        ADMIN
    }

    type User {
        email: String!
        userId: String!
        displayName: String!
        picture: String!
        role: Role
        createdAt: String
        updatedAt: String
    }

    type Author {
        id: String!
        name: String!
        createdAt: String
        updatedAt: String
    }

    type Book {
        id: String!
        title: String!
        author: [Author!]!
        frontCoverImage: String
        backCoverImage: String
        category: Category
        categoryId: String
        createdAt: String
        updatedAt: String
    }

    type Category {
        id: String!
        name: String!
        createdAt: String
        updatedAt: String
    }

    type Query {
        getUsers: [User]!
        getBooks: [Book]!
        getBook(id: String!): Book!
        searchAuthors(searchTerm: String!): [Author]!
        getAuthors: [Author]!
        getCategories: [Category]!
    }

    type Mutation {
        createBook(
            title: String!
            author: [String!]!
            category: String
            frontCoverImage: String
            backCoverImage: String
        ): Book!
        updateBook(
            id: String!
            title: String
            author: [String!]
            category: String
            frontCoverImage: String
            backCoverImage: String
        ): Book!
        createCategory(name: String!): Category!
        updateCategory(id: String!, name: String!): Category!
    }
`;
