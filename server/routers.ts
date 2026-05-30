import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  cartilha: router({
    ensaiosLocaisTangara: publicProcedure.query(async () => {
      return await db.getEnsaiosLocaisTangara();
    }),
    ensaiosLocaisRegiao: publicProcedure.query(async () => {
      return await db.getEnsaiosLocaisRegiao();
    }),
    encarregadosRegionais: publicProcedure.query(async () => {
      return await db.getEncarregadosRegionais();
    }),
    encarregadosLocais: publicProcedure.query(async () => {
      return await db.getEncarregadosLocais();
    }),
    examinadoras: publicProcedure.query(async () => {
      return await db.getExaminadoras();
    }),
    secretariaMusical: publicProcedure.query(async () => {
      return await db.getSecretariaMusical();
    }),
    recomendacoes: publicProcedure.query(async () => {
      return await db.getRecomendacoes();
    }),
    hinoSilencioEventos: publicProcedure.query(async () => {
      return await db.getHinoSilencioEventos();
    }),
    ondePossoTocarCategorias: publicProcedure.query(async () => {
      return await db.getOndePossoTocarCategorias();
    }),
    posicaoOrquestraFamilias: publicProcedure.query(async () => {
      return await db.getPosicaoOrquestraFamilias();
    }),
  }),
});

export type AppRouter = typeof appRouter;
