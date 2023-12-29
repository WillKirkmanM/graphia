import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ 
      title: z.string().min(1),
      slug: z.string().min(1),
      tags: z.string().optional(),
      body: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          title: input.title,
          slug: input.slug,
          body: input.body,
          tags: input.tags ?? "",

          createdBy: { connect: { id: ctx.session.user.id } },
          createdAt: new Date(),
        },
      });
    }),

    getAll: protectedProcedure.query(async ({ ctx }) => {
      return ctx.db.post.findMany();
    })
});
