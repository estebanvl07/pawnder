import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const actionsRouter = createTRPCRouter({
  onFolow: protectedProcedure
    .input(z.object({ userFollowig: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      try {
        if (!userId) {
          throw new Error("No se encontro el usuario");
        }
        const userFolowed = await ctx.db.follows.create({
          data: {
            followerId: userId,
            followingId: input.userFollowig,
          },
        });
        return userFolowed;
      } catch (error) {
        return error;
      }
    }),
  onUnFolow: protectedProcedure
    .input(z.object({ userFolowed: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      try {
        if (!userId) {
          throw new Error("No se encontro el usuario");
        }
        const userFolowed = await ctx.db.follows.delete({
          where: {
            followerId_followingId: {
              followerId: userId,
              followingId: input.userFolowed,
            },
          },
        });
        return userFolowed;
      } catch (error) {
        return error;
      }
    }),
  onLike: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      try {
        if (!userId) {
          throw new Error("No se encontro el usuario");
        }
        const postLiked = await ctx.db.likes.create({
          data: {
            postId: input.postId,
            userId: userId,
          },
        });
        return postLiked;
      } catch (error) {
        return error;
      }
    }),
  onDisLike: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      try {
        if (!userId) {
          throw new Error("No se encontro el usuario");
        }
        const postLiked = await ctx.db.likes.delete({
          where: {
            userId_postId: {
              postId: input.postId,
              userId: userId,
            },
          },
        });
        return postLiked;
      } catch (error) {
        return error;
      }
    }),

  //   create: protectedProcedure
  //     .input(z.object({ name: z.string().min(1) }))
  //     .mutation(async ({ ctx, input }) => {
  //       return ctx.db.post.create({
  //         data: {
  //           name: input.name,
  //           createdBy: { connect: { id: ctx.session.user.id } },
  //         },
  //       });
  //     }),

  // getLatest: protectedProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });

  //   return post ?? null;
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
