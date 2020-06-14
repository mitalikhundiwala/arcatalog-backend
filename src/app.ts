import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { createContext } from './context';
import { query } from './resolvers/query';
import { mutation } from './resolvers/mutation';

function initializeApp() {
    const server = new ApolloServer({
        typeDefs,
        resolvers: {
            Query: query,
            Mutation: mutation
        },
        context: createContext,
        introspection: true,
        playground: true
    });
    return server;
}

export { initializeApp };
