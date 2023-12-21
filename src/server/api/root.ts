import { postRouter } from "~/server/api/routers/post";
import { tagRouter } from "~/server/api/routers/tag";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  tag: tagRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
