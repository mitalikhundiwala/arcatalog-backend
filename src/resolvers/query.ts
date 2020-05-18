import { AuthenticationError } from 'apollo-server';
import { Context } from '../context';

export const query = {
    getUsers: async (parent: any, args: any, ctx: Context) => {
        if (!ctx.req.user) {
            throw new AuthenticationError('You must be logged in!');
        }
        return await ctx.prisma.user.findMany();
    },
    getBooks: async (parent: any, args: any, ctx: Context) => {
        if (!ctx.req.user) {
            throw new AuthenticationError('You must be logged in!');
        }
        return await ctx.prisma.book.findMany({
            include: {
                author: true
            }
        });
    },

    getBook: async (parent: any, args: any, ctx: Context) => {
        if (!ctx.req.user) {
            throw new AuthenticationError('You must be logged in!');
        }
        return await ctx.prisma.book.findOne({
            where: {
                id: args.id
            },
            include: {
                author: true
            }
        });
    },

    searchAuthors: async (parent: any, args: any, ctx: Context) => {
        if (!ctx.req.user) {
            throw new AuthenticationError('You must be logged in!');
        }
        const authors = await ctx.prisma.author.findMany({
            where: {
                name: {
                    contains: args.searchTerm
                }
            }
        });
        return authors;
    },

    getAuthors: async (parent: any, args: any, ctx: Context) => {
        if (!ctx.req.user) {
            throw new AuthenticationError('You must be logged in!');
        }
        return await ctx.prisma.author.findMany();
    }
};
