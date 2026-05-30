import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users,
  ensaiosLocaisTangara,
  ensaiosLocaisRegiao,
  encarregadosRegionais,
  encarregadosLocais,
  examinadoras,
  secretariaMusical,
  recomendacoes,
  hinoSilencioEventos,
  ondePossoTocarCategorias,
  posicaoOrquestraFamilias
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Ensaios Locais Tangará
export async function getEnsaiosLocaisTangara() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(ensaiosLocaisTangara);
}

// Ensaios Locais Região
export async function getEnsaiosLocaisRegiao() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(ensaiosLocaisRegiao);
}

// Encarregados Regionais
export async function getEncarregadosRegionais() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(encarregadosRegionais);
}

// Encarregados Locais
export async function getEncarregadosLocais() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(encarregadosLocais);
}

// Examinadoras
export async function getExaminadoras() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(examinadoras);
}

// Secretaria Musical
export async function getSecretariaMusical() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(secretariaMusical);
}

// Recomendações
export async function getRecomendacoes() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(recomendacoes).orderBy(recomendacoes.ordem);
}

// Hino do Silêncio
export async function getHinoSilencioEventos() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(hinoSilencioEventos).orderBy(hinoSilencioEventos.ordem);
}

// Onde Posso Tocar
export async function getOndePossoTocarCategorias() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(ondePossoTocarCategorias);
}

// Posição Orquestra
export async function getPosicaoOrquestraFamilias() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(posicaoOrquestraFamilias);
}
