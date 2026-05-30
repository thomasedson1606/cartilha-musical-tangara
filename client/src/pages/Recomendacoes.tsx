import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import InfoCard from "@/components/InfoCard";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import cartilhaData from "../cartilha-data.json";

export default function Recomendacoes() {
  const [, navigate] = useLocation();
  const { recomendacoes } = cartilhaData;

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
        <h1 className="text-4xl font-bold text-primary">Recomendações aos Músicos e Organistas</h1>
        <p className="text-muted-foreground text-lg">
          Orientações importantes para todos os músicos e organistas da Congregação.
        </p>
      </div>

      <InfoCard title="Recomendações" icon={<CheckCircle2 className="w-5 h-5" />}>
        <div className="space-y-3">
          {recomendacoes.map((recomendacao, index) => (
            <Card key={index} className="border-border/30 bg-background hover:shadow-sm transition-shadow">
              <CardContent className="pt-4 flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 border border-accent/30">
                    <span className="text-accent text-xs font-bold">{index + 1}</span>
                  </div>
                </div>
                <p className="text-foreground leading-relaxed">{recomendacao}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </InfoCard>
    </div>
  );
}
