import { drizzle } from "drizzle-orm/mysql2";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {
  ensaiosLocaisTangara,
  ensaiosLocaisRegiao,
  encarregadosRegionais,
  encarregadosLocais,
  examinadoras,
  secretariaMusical,
  recomendacoes,
  hinoSilencioEventos,
  ondePossoTocarCategorias,
  posicaoOrquestraFamilias,
} from "./drizzle/schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cartilhaDataPath = join(__dirname, "cartilha-data.json");
const cartilhaData = JSON.parse(readFileSync(cartilhaDataPath, "utf-8"));

const db = drizzle(process.env.DATABASE_URL);

async function seedDatabase() {
  try {
    console.log("🌱 Iniciando seed do banco de dados...");

    // Limpar tabelas existentes
    console.log("🗑️  Limpando dados existentes...");
    await db.delete(ensaiosLocaisTangara);
    await db.delete(ensaiosLocaisRegiao);
    await db.delete(encarregadosRegionais);
    await db.delete(encarregadosLocais);
    await db.delete(examinadoras);
    await db.delete(secretariaMusical);
    await db.delete(recomendacoes);
    await db.delete(hinoSilencioEventos);
    await db.delete(ondePossoTocarCategorias);
    await db.delete(posicaoOrquestraFamilias);

    // Inserir Ensaios Locais Tangará
    console.log("📅 Inserindo Ensaios Locais Tangará...");
    for (const ensaio of cartilhaData.ensaiosLocaisTangara) {
      await db.insert(ensaiosLocaisTangara).values({
        dia: ensaio.dia,
        horas: ensaio.horas,
        comum: ensaio.comum,
        encarregado: ensaio.encarregado,
      });
    }

    // Inserir Ensaios Locais Região
    console.log("🌍 Inserindo Ensaios Locais Região...");
    for (const ensaio of cartilhaData.ensaiosLocaisRegiao) {
      await db.insert(ensaiosLocaisRegiao).values({
        dia: ensaio.dia,
        horas: ensaio.horas,
        cidade: ensaio.cidade,
        comum: ensaio.comum,
        encarregado: ensaio.encarregado,
      });
    }

    // Inserir Encarregados Regionais
    console.log("👥 Inserindo Encarregados Regionais...");
    for (const encarregado of cartilhaData.encarregadosRegionais) {
      await db.insert(encarregadosRegionais).values({
        nome: encarregado.nome,
        cidade: encarregado.cidade,
        bairro: encarregado.bairro,
      });
    }

    // Inserir Examinadoras
    console.log("🎵 Inserindo Examinadoras...");
    for (const examinadora of cartilhaData.examinadoras) {
      await db.insert(examinadoras).values({
        nome: examinadora.nome,
        cidade: examinadora.cidade,
        bairro: examinadora.bairro,
      });
    }

    // Inserir Secretaria Musical
    console.log("📋 Inserindo Secretaria Musical...");
    for (const membro of cartilhaData.secretariaMusical) {
      await db.insert(secretariaMusical).values({
        nome: membro.nome,
        funcao: membro.funcao,
      });
    }

    // Inserir Recomendações
    console.log("💡 Inserindo Recomendações...");
    for (let i = 0; i < cartilhaData.recomendacoes.length; i++) {
      await db.insert(recomendacoes).values({
        descricao: cartilhaData.recomendacoes[i],
        ordem: i + 1,
      });
    }

    // Inserir Hino do Silêncio
    console.log("🎼 Inserindo Hino do Silêncio...");
    for (let i = 0; i < cartilhaData.hinoSilencio.eventos.length; i++) {
      const evento = cartilhaData.hinoSilencio.eventos[i];
      await db.insert(hinoSilencioEventos).values({
        hora: evento.hora,
        descricao: evento.descricao,
        ordem: i + 1,
      });
    }

    // Inserir Onde Posso Tocar
    console.log("🎸 Inserindo Onde Posso Tocar...");
    for (const categoria of cartilhaData.ondePossoTocar.categorias) {
      await db.insert(ondePossoTocarCategorias).values({
        tipo: categoria.tipo,
        musicoOficializado: categoria.musicoOficializado,
        musicoNaoOficializado: categoria.musicoNaoOficializado,
        musicoRJMBatizado: categoria.musicoRJMBatizado,
        musicoRJMNaoBatizado: categoria.musicoRJMNaoBatizado,
        musicoEnsaios: categoria.musicoEnsaios,
      });
    }

    // Inserir Posição Orquestra
    console.log("🎻 Inserindo Posição Orquestra...");
    for (const familia of cartilhaData.posicaoOrquestra.familias) {
      await db.insert(posicaoOrquestraFamilias).values({
        familia: familia.familia,
        instrumentos: familia.instrumentos,
      });
    }

    console.log("✅ Seed do banco de dados concluído com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao fazer seed do banco de dados:", error);
    process.exit(1);
  }
}

seedDatabase();
