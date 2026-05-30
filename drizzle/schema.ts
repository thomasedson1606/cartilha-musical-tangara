import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Ensaios Locais de Tangará da Serra
export const ensaiosLocaisTangara = mysqlTable("ensaios_locais_tangara", {
  id: int("id").autoincrement().primaryKey(),
  dia: varchar("dia", { length: 100 }).notNull(),
  horas: varchar("horas", { length: 10 }).notNull(),
  comum: varchar("comum", { length: 100 }).notNull(),
  encarregado: varchar("encarregado", { length: 100 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EnsaioLocalTangara = typeof ensaiosLocaisTangara.$inferSelect;
export type InsertEnsaioLocalTangara = typeof ensaiosLocaisTangara.$inferInsert;

// Ensaios Locais da Região
export const ensaiosLocaisRegiao = mysqlTable("ensaios_locais_regiao", {
  id: int("id").autoincrement().primaryKey(),
  dia: varchar("dia", { length: 100 }).notNull(),
  horas: varchar("horas", { length: 10 }).notNull(),
  cidade: varchar("cidade", { length: 100 }).notNull(),
  comum: varchar("comum", { length: 100 }).notNull(),
  encarregado: varchar("encarregado", { length: 100 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EnsaioLocalRegiao = typeof ensaiosLocaisRegiao.$inferSelect;
export type InsertEnsaioLocalRegiao = typeof ensaiosLocaisRegiao.$inferInsert;

// Encarregados Regionais
export const encarregadosRegionais = mysqlTable("encarregados_regionais", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 100 }).notNull(),
  cidade: varchar("cidade", { length: 100 }).notNull(),
  bairro: varchar("bairro", { length: 100 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EncarregadoRegional = typeof encarregadosRegionais.$inferSelect;
export type InsertEncarregadoRegional = typeof encarregadosRegionais.$inferInsert;

// Encarregados Locais
export const encarregadosLocais = mysqlTable("encarregados_locais", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 100 }).notNull(),
  cidade: varchar("cidade", { length: 100 }).notNull(),
  bairro: varchar("bairro", { length: 100 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EncarregadoLocal = typeof encarregadosLocais.$inferSelect;
export type InsertEncarregadoLocal = typeof encarregadosLocais.$inferInsert;

// Examinadoras
export const examinadoras = mysqlTable("examinadoras", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 100 }).notNull(),
  cidade: varchar("cidade", { length: 100 }).notNull(),
  bairro: varchar("bairro", { length: 100 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Examinadora = typeof examinadoras.$inferSelect;
export type InsertExaminadora = typeof examinadoras.$inferInsert;

// Secretaria Musical
export const secretariaMusical = mysqlTable("secretaria_musical", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 100 }).notNull(),
  funcao: varchar("funcao", { length: 100 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SecretariaMusical = typeof secretariaMusical.$inferSelect;
export type InsertSecretariaMusical = typeof secretariaMusical.$inferInsert;

// Recomendações
export const recomendacoes = mysqlTable("recomendacoes", {
  id: int("id").autoincrement().primaryKey(),
  descricao: text("descricao").notNull(),
  ordem: int("ordem").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Recomendacao = typeof recomendacoes.$inferSelect;
export type InsertRecomendacao = typeof recomendacoes.$inferInsert;

// Hino do Silêncio - Eventos
export const hinoSilencioEventos = mysqlTable("hino_silencio_eventos", {
  id: int("id").autoincrement().primaryKey(),
  hora: varchar("hora", { length: 20 }).notNull(),
  descricao: text("descricao").notNull(),
  ordem: int("ordem").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HinoSilencioEvento = typeof hinoSilencioEventos.$inferSelect;
export type InsertHinoSilencioEvento = typeof hinoSilencioEventos.$inferInsert;

// Onde Posso Tocar - Categorias
export const ondePossoTocarCategorias = mysqlTable("onde_posso_tocar_categorias", {
  id: int("id").autoincrement().primaryKey(),
  tipo: varchar("tipo", { length: 100 }).notNull(),
  musicoOficializado: varchar("musico_oficializado", { length: 10 }).notNull(),
  musicoNaoOficializado: varchar("musico_nao_oficializado", { length: 10 }).notNull(),
  musicoRJMBatizado: varchar("musico_rjm_batizado", { length: 10 }).notNull(),
  musicoRJMNaoBatizado: varchar("musico_rjm_nao_batizado", { length: 10 }).notNull(),
  musicoEnsaios: varchar("musico_ensaios", { length: 10 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type OndePossoTocarCategoria = typeof ondePossoTocarCategorias.$inferSelect;
export type InsertOndePossoTocarCategoria = typeof ondePossoTocarCategorias.$inferInsert;

// Posição Orquestra - Famílias de Instrumentos
export const posicaoOrquestraFamilias = mysqlTable("posicao_orquestra_familias", {
  id: int("id").autoincrement().primaryKey(),
  familia: varchar("familia", { length: 100 }).notNull(),
  instrumentos: text("instrumentos").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PosicaoOrquestraFamilia = typeof posicaoOrquestraFamilias.$inferSelect;
export type InsertPosicaoOrquestraFamilia = typeof posicaoOrquestraFamilias.$inferInsert;