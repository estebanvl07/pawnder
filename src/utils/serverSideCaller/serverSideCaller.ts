import type { GetServerSidePropsContext } from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import SuperJSON from "superjson";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

export async function createServerSideCaller(ctx: GetServerSidePropsContext) {
  return createServerSideHelpers({
    router: appRouter,
    ctx: await createTRPCContext(ctx),
    transformer: SuperJSON,
  });
}
