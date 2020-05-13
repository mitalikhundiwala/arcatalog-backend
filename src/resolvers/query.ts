import { AuthenticationError } from 'apollo-server';
import { Context } from '../context';

export const query = {
    getUsers: async (parent: any, args: any, ctx: Context) => {
        return await ctx.prisma.user.findMany();
    }
};
