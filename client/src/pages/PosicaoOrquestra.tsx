import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, ArrowLeft } from "lucide-react";
import cartilhaData from "../cartilha-data.json";

export default function PosicaoOrquestra() {
  const [, navigate] = useLocation();
  const { posicaoOrquestra } = cartilhaData;
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const familiaColors: Record<string, { bg: string; border: string; text: string }> = {
    "Cordas": { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
    "Madeiras": { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
    "Metais": { bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
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
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-primary">Posição dos Instrumentos na Orquestra</h1>
        <p className="text-muted-foreground text-lg">
          Conheça a organização e classificação dos instrumentos por família.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posicaoOrquestra.familias.map((familia, index) => {
          const colors = familiaColors[familia.familia] || { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700" };
          return (
            <Card key={index} className={`border-2 ${colors.border} shadow-sm hover:shadow-md transition-shadow`}>
              <CardHeader className={`${colors.bg} border-b-2 ${colors.border}`}>
                <CardTitle className={`flex items-center gap-2 ${colors.text}`}>
                  <Music className="w-5 h-5" />
                  {familia.familia}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {familia.instrumentos.split("; ").map((instrumento, idx) => (
                    <div key={idx} className="flex items-start gap-2 pb-2 border-b border-border/20 last:border-0">
                      <span className="text-accent font-bold text-lg leading-none mt-0.5">•</span>
                      <span className="text-foreground text-sm leading-relaxed">{instrumento}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
