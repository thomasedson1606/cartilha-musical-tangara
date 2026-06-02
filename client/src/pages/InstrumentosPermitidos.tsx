import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Download, Music3 } from "lucide-react";
import { useLocation } from "wouter";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

interface Instrumento {
  nome: string;
  tom: string;
  afinacao: string;
  vozPrincipal: string;
  vozAlternativa: string;
}

interface Familia {
  nome: string;
  instrumentos: Instrumento[];
}

const familias: Familia[] = [
  {
    nome: "Cordas",
    instrumentos: [
      { nome: "Violino", tom: "Dó", afinacao: "Lá³", vozPrincipal: "Soprano escrito ou 8ª acima", vozAlternativa: "Contralto (na escrita)" },
      { nome: "Viola", tom: "Dó", afinacao: "Lá³", vozPrincipal: "Tenor (clave de Dó 3ª linha)", vozAlternativa: "Contralto (na escrita)" },
      { nome: "Violoncelo", tom: "Dó", afinacao: "Lá²", vozPrincipal: "Baixo (na escrita)", vozAlternativa: "Tenor (na escrita)" },
    ],
  },
  {
    nome: "Madeiras",
    instrumentos: [
      { nome: "Flauta Transversal", tom: "Dó", afinacao: "Lá⁴", vozPrincipal: "Soprano somente 8ª acima", vozAlternativa: "" },
      { nome: "Oboé", tom: "Dó", afinacao: "Lá³", vozPrincipal: "Soprano", vozAlternativa: "" },
      { nome: "Oboé D'Amore", tom: "Lá", afinacao: "Lá³", vozPrincipal: "Soprano", vozAlternativa: "Contralto" },
      { nome: "Corne Inglês", tom: "Fá", afinacao: "Lá³", vozPrincipal: "Contralto", vozAlternativa: "Soprano" },
      { nome: "Clarinete", tom: "Sib/Lá", afinacao: "Lá³", vozPrincipal: "Soprano", vozAlternativa: "Contralto / Tenor" },
      { nome: "Clarinete Alto", tom: "Mib", afinacao: "Lá²", vozPrincipal: "Tenor", vozAlternativa: "Soprano / Contralto" },
      { nome: "Clarinete Baixo", tom: "Sib", afinacao: "Lá²", vozPrincipal: "Baixo", vozAlternativa: "Tenor" },
      { nome: "Fagote", tom: "Dó", afinacao: "Lá²", vozPrincipal: "Baixo", vozAlternativa: "Tenor" },
      { nome: "Saxofone Soprano", tom: "Sib", afinacao: "Lá³", vozPrincipal: "Soprano", vozAlternativa: "Contralto" },
      { nome: "Saxofone Alto", tom: "Mib", afinacao: "Lá³", vozPrincipal: "Contralto", vozAlternativa: "Soprano / Tenor" },
      { nome: "Saxofone Tenor", tom: "Sib", afinacao: "Lá²", vozPrincipal: "Tenor", vozAlternativa: "Contralto" },
      { nome: "Saxofone Barítono", tom: "Mib", afinacao: "Lá²", vozPrincipal: "Baixo", vozAlternativa: "Tenor" },
    ],
  },
  {
    nome: "Metais",
    instrumentos: [
      { nome: "Trompete / Cornet", tom: "Sib/Dó", afinacao: "Lá³", vozPrincipal: "Soprano", vozAlternativa: "Contralto" },
      { nome: "Flugelhorn", tom: "Sib", afinacao: "Lá³", vozPrincipal: "Soprano", vozAlternativa: "Contralto" },
      { nome: "Trompa", tom: "Fá/Sib", afinacao: "Lá²", vozPrincipal: "Contralto", vozAlternativa: "Tenor" },
      { nome: "Trombone / Trombonito", tom: "Sib/Dó", afinacao: "Lá²", vozPrincipal: "Tenor", vozAlternativa: "Baixo" },
      { nome: "Barítono", tom: "Sib", afinacao: "Lá²", vozPrincipal: "Baixo", vozAlternativa: "Tenor" },
      { nome: "Eufônio", tom: "Sib", afinacao: "Lá²", vozPrincipal: "Baixo", vozAlternativa: "Tenor" },
      { nome: "Tubas", tom: "Mib/Fá ou Sib/Dó", afinacao: "Lá¹", vozPrincipal: "Baixo (soando uma 8ª abaixo)", vozAlternativa: "" },
    ],
  },
];

const todosInstrumentos = familias.flatMap(f => f.instrumentos.map(i => ({ ...i, familia: f.nome })));

export default function InstrumentosPermitidos() {
  const [, navigate] = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [filtroInstrumento, setFiltroInstrumento] = useState("TODOS");
  const [familiaFiltro, setFamiliaFiltro] = useState("TODAS");
  const [exportando, setExportando] = useState<"imagem" | "pdf" | null>(null);

  const instrumentoSelecionado = filtroInstrumento !== "TODOS"
    ? todosInstrumentos.find(i => i.nome === filtroInstrumento)
    : null;

  const familiasFiltradas = familiaFiltro === "TODAS"
    ? familias
    : familias.filter(f => f.nome === familiaFiltro);

  const exportarPDF = async () => {
    const familiasVisiveis = familiasFiltradas;
    if (familiasVisiveis.length === 0) return;
    setExportando("pdf");
    try {
      const pdf = new jsPDF("l", "mm", "a4");
      for (let i = 0; i < familiasVisiveis.length; i++) {
        const familia = familiasVisiveis[i];
        const element = document.getElementById(`familia-${familia.nome}`);
        if (!element) continue;
        if (i > 0) pdf.addPage();
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 280;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        if (imgHeight > 190) {
          pdf.addImage(imgData, "PNG", 5, 10, imgWidth, imgHeight);
        } else {
          const centeredY = (210 - imgHeight) / 2;
          pdf.addImage(imgData, "PNG", 5, centeredY, imgWidth, imgHeight);
        }
      }
      pdf.save("instrumentos-permitidos.pdf");
    } catch (error) {
      alert("Erro ao exportar PDF: " + (error instanceof Error ? error.message : error));
    } finally {
      setExportando(null);
    }
  };

  const exportarImagem = async () => {
    const familiasVisiveis = familiasFiltradas;
    if (familiasVisiveis.length === 0) return;
    setExportando("imagem");
    try {
      const container = document.getElementById("instrumentos-export");
      if (!container) return;
      const canvas = await html2canvas(container, { scale: 2, useCORS: true });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "instrumentos-permitidos.png";
      link.click();
    } catch (error) {
      alert("Erro ao exportar imagem: " + (error instanceof Error ? error.message : error));
    } finally {
      setExportando(null);
    }
  };

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

      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Music3 className="w-12 h-12 text-accent" />
        </div>
        <h1 className="text-4xl font-bold text-primary">Instrumentos Permitidos</h1>
        <p className="text-lg text-muted-foreground">
          Voz principal e alternativa para cada instrumento na orquestra
        </p>
      </div>

      {/* Filtro e Exportação */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-primary">Filtrar e Exportar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center justify-center flex-wrap">
            <div className="w-64">
              <Select value={filtroInstrumento} onValueChange={setFiltroInstrumento}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um instrumento..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos</SelectItem>
                  {todosInstrumentos.map((inst) => (
                    <SelectItem key={inst.nome} value={inst.nome}>
                      {inst.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={exportarImagem}
              disabled={exportando !== null}
              className="border-accent/30 text-accent hover:bg-accent hover:text-white flex gap-2"
            >
              <Download className="w-4 h-4" />
              {exportando === "imagem" ? "Exportando..." : "Imagem"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportarPDF}
              disabled={exportando !== null}
              className="border-accent/30 text-accent hover:bg-accent hover:text-white flex gap-2"
            >
              <Download className="w-4 h-4" />
              {exportando === "pdf" ? "Exportando..." : "PDF"}
            </Button>
          </div>
          <div className="flex gap-2 items-center justify-center flex-wrap">
            <span className="text-sm text-muted-foreground">Filtrar por família:</span>
            {["TODAS", "Cordas", "Madeiras", "Metais"].map((fam) => (
              <Button
                key={fam}
                variant={familiaFiltro === fam ? "default" : "outline"}
                size="sm"
                onClick={() => setFamiliaFiltro(fam)}
                className={
                  familiaFiltro === fam
                    ? "bg-accent text-white"
                    : "border-accent/30 text-accent hover:bg-accent hover:text-white"
                }
              >
                {fam}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instrumento selecionado */}
      {instrumentoSelecionado && (
        <Card className="border-accent/50 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-primary">{instrumentoSelecionado.nome}</CardTitle>
            <CardDescription className="text-muted-foreground">
              Família: {instrumentoSelecionado.familia}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Tom</p>
              <p className="text-lg font-semibold text-foreground">{instrumentoSelecionado.tom}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Afinação</p>
              <p className="text-lg font-semibold text-foreground">{instrumentoSelecionado.afinacao}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Voz Principal</p>
              <p className="text-lg font-semibold text-foreground">{instrumentoSelecionado.vozPrincipal}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Voz Alternativa</p>
              <p className="text-lg font-semibold text-foreground">{instrumentoSelecionado.vozAlternativa || "—"}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabelas + Observações para export */}
      <div id="instrumentos-export" className="space-y-8">
        <div className="space-y-8">
        {familiasFiltradas.map((familia) => (
          <div key={familia.nome} id={`familia-${familia.nome}`}>
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-primary">{familia.nome}</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary">
                      <th className="text-left text-white font-semibold py-3 px-3">Instrumento</th>
                      <th className="text-center text-white font-semibold py-3 px-3">Tom</th>
                      <th className="text-center text-white font-semibold py-3 px-3">Afinação</th>
                      <th className="text-center text-white font-semibold py-3 px-3">Voz Principal</th>
                      <th className="text-center text-white font-semibold py-3 px-3">Voz Alternativa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {familia.instrumentos.map((inst, idx) => (
                      <tr
                        key={inst.nome}
                        className={`border-b border-border/20 transition-colors ${
                          idx % 2 === 0 ? "bg-secondary/10" : ""
                        } hover:bg-accent/5 ${
                          filtroInstrumento !== "TODOS" && filtroInstrumento === inst.nome ? "bg-accent/20 ring-2 ring-accent" : ""
                        }`}
                        id={filtroInstrumento !== "TODOS" && filtroInstrumento === inst.nome ? "instrumento-destacado" : undefined}
                      >
                        <td className="py-2.5 px-3 font-medium text-foreground">{inst.nome}</td>
                        <td className="text-center py-2.5 px-3 text-foreground">{inst.tom}</td>
                        <td className="text-center py-2.5 px-3 text-foreground">{inst.afinacao}</td>
                        <td className="text-center py-2.5 px-3 text-foreground">{inst.vozPrincipal}</td>
                        <td className="text-center py-2.5 px-3 text-foreground">{inst.vozAlternativa || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        ))}
        </div>

      {/* Observações */}
        <Card className="border-l-4 border-l-accent bg-secondary/5">
        <CardHeader>
          <CardTitle className="text-primary">Observações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground">
          <div>
            <h3 className="font-bold text-primary mb-1">Soprano</h3>
            <p>Em uma eventual necessidade, todo músico deve estar apto a executar a voz do soprano.</p>
          </div>
          <div>
            <h3 className="font-bold text-primary mb-1">Sobre voz alternativa</h3>
            <p>Somente deverá ser executada quando solicitado pelo encarregado.</p>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
