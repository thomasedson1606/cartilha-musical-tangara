import { useState, useMemo, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import cartilhaData from "../cartilha-data.json";

interface Encarregado {
  nome: string;
  cidade: string;
  comum: string;
  tipo: "tangara" | "regiao";
}

export default function EncarregadosLocais() {
  const [, navigate] = useLocation();
  const [filtro, setFiltro] = useState("TODOS");
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const encarregadosRegiao: Encarregado[] = cartilhaData.ensaiosLocaisRegiao.map(e => ({
    nome: e.encarregado,
    cidade: e.cidade,
    comum: e.comum,
    tipo: "regiao" as const,
  }));

  const allEncarregados: Encarregado[] = [
    ...cartilhaData.encarregadosLocais.map(e => ({ ...e, tipo: "tangara" as const })),
    ...encarregadosRegiao,
  ];

  const encarregadosFiltrados = useMemo(() => {
    if (filtro === "TODOS") return allEncarregados;
    if (filtro === "TANGARÁ") return allEncarregados.filter(e => e.tipo === "tangara");
    if (filtro === "REGIÃO") return allEncarregados.filter(e => e.tipo === "regiao");
    return allEncarregados;
  }, [filtro]);

  return (
    <div className="space-y-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/")}
        className="text-accent hover:bg-accent/10 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-primary">Encarregados Locais</h1>
        <p className="text-muted-foreground text-lg">
          Confira os encarregados responsáveis pelos ensaios em cada comum.
        </p>
      </div>

      {/* Filtro */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-primary">Filtrar Encarregados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center justify-center flex-wrap">
            <Button
              variant={filtro === "TODOS" ? "default" : "outline"}
              onClick={() => setFiltro("TODOS")}
              className={filtro === "TODOS" ? "bg-accent text-white" : "border-accent/30 text-accent hover:bg-accent hover:text-white"}
            >
              TODOS
            </Button>
            <Button
              variant={filtro === "TANGARÁ" ? "default" : "outline"}
              onClick={() => setFiltro("TANGARÁ")}
              className={filtro === "TANGARÁ" ? "bg-blue-900 text-white" : "border-blue-900/30 text-blue-900 hover:bg-blue-900 hover:text-white"}
            >
              TANGARÁ
            </Button>
            <Button
              variant={filtro === "REGIÃO" ? "default" : "outline"}
              onClick={() => setFiltro("REGIÃO")}
              className={filtro === "REGIÃO" ? "bg-green-900 text-white" : "border-green-900/30 text-green-900 hover:bg-green-900 hover:text-white"}
            >
              REGIÃO
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Encarregados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {encarregadosFiltrados.map((encarregado, index) => (
          <Card
            key={index}
            className={`border-border/50 hover:shadow-lg transition-shadow ${
              encarregado.tipo === "tangara"
                ? "border-l-4 border-l-blue-900"
                : "border-l-4 border-l-green-900"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-primary text-lg">
                {encarregado.nome === "-" ? "Vago" : encarregado.nome}
              </CardTitle>
              <CardDescription className={encarregado.tipo === "tangara" ? "text-blue-900" : "text-green-900"}>
                {encarregado.tipo === "tangara" ? "Tangará da Serra" : encarregado.cidade}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {encarregado.tipo === "tangara" ? "Comum" : "Comum"}
                </p>
                <p className="text-foreground font-medium">{encarregado.comum}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
