import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, ArrowLeft } from "lucide-react";
import cartilhaData from "../cartilha-data.json";

export default function HinoSilencio() {
  const [, navigate] = useLocation();
  const { hinoSilencio } = cartilhaData;

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
        <h1 className="text-4xl font-bold text-primary">Hino do Silêncio</h1>
        <p className="text-muted-foreground text-lg">
          Conheça a sequência e os horários para execução do Hino do Silêncio.
        </p>
      </div>

      {hinoSilencio.exemplos.map((exemplo, idx) => (
        <Card key={idx} className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Music className="w-6 h-6 text-accent" />
              <CardTitle className="text-primary">{exemplo.titulo}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {exemplo.eventos.map((evento, index) => (
                <div key={index} className="flex gap-4 pb-3 border-b border-border/20 last:border-0">
                  {evento.hora ? (
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/10 border border-accent/20">
                        <span className="font-bold text-accent text-sm text-center">{evento.hora}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-16" />
                  )}
                  <div className="flex-1 pt-1">
                    <p className="text-foreground font-medium">{evento.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-border/50 bg-secondary/5">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <span className="text-accent">ℹ️</span>
            Observação Importante
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">
            {hinoSilencio.observacao}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
