import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createPost } from "~/components/Post/schema";
import * as PostServices from "../services/post.services";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPost)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      try {
        console.log(userId, "USERRR");

        await ctx.db.post.create({
          data: {
            content: input.content,
            createdById: userId,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creando el post",
          cause: error,
        });
      }
    }),

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.post.create({
  //       data: {
  //         ...input
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),
  getPostById: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const response = await PostServices.getPostById(ctx.db, input);
      return response;
    }),

  // getLatest: protectedProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });

  //   return post ?? null;
  // }),

  // getSecretMessage: publicProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
