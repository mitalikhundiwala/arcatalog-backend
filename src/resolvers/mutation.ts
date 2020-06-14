import { AuthenticationError } from 'apollo-server';
import { Context } from '../context';

export const mutation = {
    createBook: async (parent: any, args: any, ctx: Context) => {
        if (!ctx.req.user) {
            throw new AuthenticationError('You must be logged in!');
        }
        const authorPromises = args.author.map((author: string) => {
            return ctx.prisma.author.upsert({
                where: { name: author },
                update: { name: author },
                create: { name: author }
            });
        });
        const authors = await Promise.all(authorPromises);
        return await ctx.prisma.book.create({
            data: {
                title: args.title,
                author: {
                    connect: authors.map((author: any) => {
                        return {
                            name: author.name
                        };
                    })
                },
                category: {
                    connect: {
                        id: args.category
                    }
                },
                frontCoverImage: args.frontCoverImage,
                backCoverImage: args.backCoverImage
            }
        });
    },
    updateBook: async (parent: any, args: any, ctx: Context) => {
        if (!ctx.req.user) {
            throw new AuthenticationError('You must be logged in!');
        }
        const authorPromises = args.author?.map((author: string) => {
            return ctx.prisma.author.upsert({
                where: { name: author },
                update: { name: author },
                create: { name: author }
            });
        });
        console.log('=======', args);
        const authors = await Promise.all(authorPromises);
        const p = await ctx.prisma.book.update({
            where: {
                id: args.id
            },
            data: {
                title: args.title,
                author: {
                    set: authors?.map((author: any) => {
                        return {
                            name: author.name
                        };
                    })
                },
                category: {
                    connect: {
                        id: args.category
                    }
                },
                frontCoverImage: args.frontCoverImage,
                backCoverImage: args.backCoverImage
            }
        });
        console.log(p);
        return p;
    },

    createCategory: async (parent: any, args: any, ctx: Context) => {
        return await ctx.prisma.category.create({
            data: {
                name: args.name
            }
        });
    },

    updateCategory: async (parent: any, args: any, ctx: Context) => {
        return await ctx.prisma.category.update({
            where: {
                id: args.id
            },
            data: {
                name: args.name
            }
        });
    }
};
