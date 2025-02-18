import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const feedRouter = createTRPCRouter({
  search: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    if (input === "") {
      return { users: [], posts: [] };
    }

    const users = await ctx.db.user.findMany({
      where: {
        id: {
          not: userId,
        },
        username: {
          contains: input,
        },
      },
      take: 5,
    });

    const posts = await ctx.db.post.findMany({
      where: {
        content: {
          contains: input,
        },
      },
      include: {
        createdBy: true,
        images: true,
        comments: false,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      take: 10,
    });

    return { users, posts };
  }),
});
