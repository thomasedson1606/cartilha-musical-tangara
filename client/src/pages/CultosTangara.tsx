import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, CalendarDays } from "lucide-react";
import { useLocation } from "wouter";
import html2canvas from "html2canvas";

interface Culto {
  comum: string;
  seg: boolean;
  ter: boolean;
  qua: boolean;
  qui: boolean;
  sex: boolean;
  sab: boolean;
  dom: boolean;
  rjm: boolean;
  horarioDom?: string;
}

const cultosData: Culto[] = [
  { comum: "CENTRAL", seg: false, ter: false, qua: true, qui: false, sex: false, sab: true, dom: true, rjm: true },
  { comum: "VILA SANTA TEREZINHA", seg: false, ter: false, qua: false, qui: true, sex: false, sab: false, dom: true, rjm: true },
  { comum: "JARDIM MIRANTE", seg: false, ter: true, qua: false, qui: false, sex: false, sab: true, dom: true, rjm: true },
  { comum: "JARDIM CALIFORNIA", seg: true, ter: false, qua: false, qui: false, sex: true, sab: false, dom: false, rjm: true },
  { comum: "JARDIM DOS IPES", seg: false, ter: true, qua: false, qui: false, sex: false, sab: true, dom: true, rjm: true },
  { comum: "ALTO DA BOA VISTA", seg: false, ter: false, qua: true, qui: false, sex: false, sab: false, dom: true, rjm: true },
  { comum: "VILA ESMERALDA", seg: false, ter: true, qua: false, qui: false, sex: true, sab: false, dom: true, rjm: true },
  { comum: "RESIDENCIAL DONA JULIA", seg: false, ter: false, qua: false, qui: true, sex: false, sab: false, dom: true, rjm: true },
  { comum: "ASSENTAMENTO ANTÔNIO CONSELHEIRO", seg: false, ter: false, qua: false, qui: true, sex: false, sab: false, dom: true, rjm: false },
  { comum: "GLEBA TRIÂNGULO", seg: false, ter: false, qua: false, qui: false, sex: false, sab: true, dom: false, rjm: true },
  { comum: "JARDIM ACAPULCO", seg: false, ter: false, qua: true, qui: false, sex: false, sab: false, dom: true, rjm: true },
  { comum: "DISTRITO DE PROGRESSO", seg: false, ter: false, qua: true, qui: false, sex: false, sab: true, dom: true, rjm: true },
  { comum: "DISTRITO VILA SÃO JOAQUIM", seg: false, ter: false, qua: false, qui: false, sex: false, sab: false, dom: true, rjm: false, horarioDom: "15:00" },
  { comum: "JARDIM BURITIS", seg: false, ter: false, qua: true, qui: false, sex: false, sab: false, dom: true, rjm: true },
  { comum: "AGROVILA 28", seg: false, ter: false, qua: false, qui: false, sex: false, sab: true, dom: false, rjm: false },
  { comum: "DISTRITO SÃO JORGE", seg: false, ter: false, qua: false, qui: false, sex: false, sab: false, dom: true, rjm: false, horarioDom: "15:00" },
  { comum: "JARDIM TARUMÃ", seg: false, ter: false, qua: false, qui: true, sex: false, sab: false, dom: true, rjm: true },
];

const colunas = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM", "RJM"] as const;
type Coluna = typeof colunas[number];

const getKey = (coluna: Coluna): keyof Culto => {
  const mapa: Record<Coluna, keyof Culto> = {
    "SEG": "seg", "TER": "ter", "QUA": "qua", "QUI": "qui",
    "SEX": "sex", "SÁB": "sab", "DOM": "dom", "RJM": "rjm",
  };
  return mapa[coluna];
};

export default function CultosTangara() {
  const [, navigate] = useLocation();

  const exportarImagem = async () => {
    const element = document.getElementById("tabela-export");
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "cultos-tangara-da-serra.png";
      link.click();
    } catch (error) {
      console.error("Erro ao exportar imagem:", error);
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
          <CalendarDays className="w-12 h-12 text-accent" />
        </div>
        <h1 className="text-4xl font-bold text-primary">Cultos em Tangará da Serra</h1>
        <p className="text-lg text-muted-foreground">
          Confira os dias de culto em cada Comum Congregação
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-primary">Dias de Culto por Comum</CardTitle>
              <CardDescription className="text-muted-foreground">
                ✓ = Há culto neste dia
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={exportarImagem}
              className="border-accent/30 text-accent hover:bg-accent hover:text-white flex gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar Imagem
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div id="tabela-export">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-accent/20">
                  <th className="text-left text-primary font-semibold py-2 px-2 whitespace-nowrap">
                    COMUM CONGREGAÇÃO
                  </th>
                  {colunas.map((col) => (
                    <th
                      key={col}
                      className="text-center text-primary font-semibold py-2 px-2 w-[52px]"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cultosData.map((culto, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-border/20 transition-colors ${
                      idx % 2 === 0 ? "bg-secondary/10" : ""
                    } hover:bg-accent/5`}
                  >
                    <td className="py-1.5 px-2 font-medium text-foreground text-xs whitespace-nowrap">
                      {culto.comum}
                    </td>
                    {colunas.map((col) => {
                      const key = getKey(col);
                      const temCulto = culto[key];
                      return (
                        <td key={col} className="text-center py-1.5 px-2">
                          {temCulto ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 font-bold text-xs">
                              ✓
                            </span>
                          ) : (
                            <span className="text-muted-foreground/20">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-secondary/5">
        <CardHeader>
          <CardTitle className="text-primary">Observações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-foreground">
          <p>• Os cultos durante a semana são às <strong>19:30</strong> horas.</p>
          <p>• Cultos de Domingo são às <strong>19:00</strong> horas.</p>
          <p>• <strong>Distrito Vila São Joaquim</strong> e <strong>Distrito São Jorge</strong>: Domingo às <strong>15:00</strong> horas.</p>
          <p>• <strong>RJM</strong> (Reunião de Jovens e Menores): Domingo às <strong>09:00</strong> horas nas comuns indicadas.</p>
        </CardContent>
      </Card>
    </div>
  );
}
