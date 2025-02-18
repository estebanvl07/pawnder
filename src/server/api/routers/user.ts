import { updateUser } from "~/types/schemas/userSchema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as UserServices from "../services/users.services";
import { boolean, z } from "zod";

export const userRouter = createTRPCRouter({
  userLogged: protectedProcedure.query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const response = await ctx.db.user.findFirst({
      where: {
        id: userId,
      },
    });

    return response;
  }),
  completeUser: protectedProcedure
    .input(updateUser)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await UserServices.update(ctx.db, {
        id: userId,
        ...input,
      });

      const requiredPassword = await UserServices.requiredPassword(
        ctx.db,
        userId,
      );

      const userUpdated = ctx.db.user.update({
        where: {
          id: userId,
        },
        data: {
          accountStep: requiredPassword ? 2 : 3,
        },
      });

      return userUpdated;
    }),
  createPassword: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const requiredPassword = await UserServices.requiredPassword(
        ctx.db,
        userId,
      );

      if (!requiredPassword) {
        throw new Error("Este usario ya tiene contrasñea");
      }

      const passowrdCreated = await UserServices.createPassword(
        ctx.db,
        userId,
        input,
      );

      passowrdCreated &&
        (await ctx.db.user.update({
          data: {
            accountStep: 3,
          },
          where: {
            id: userId,
          },
        }));

      return { success: Boolean(passowrdCreated) };
    }),
  getUserByTag: protectedProcedure
    .input(
      z.object({
        userTag: z.string(),
        post: z.boolean().optional().default(true),
        commentsOfPost: z.boolean().optional().default(false),
      }),
    )
    .query(async ({ ctx, input }) => {
      const response = await UserServices.getUserByTag(ctx.db, input);
      return { ...response };
    }),
});
