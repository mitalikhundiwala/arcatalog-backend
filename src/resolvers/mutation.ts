import { Context } from "../context";

export const mutation = {
  createUser: async (parent: any, args: any, ctx: Context) => {
    return await ctx.prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
      },
    });
  },
};
