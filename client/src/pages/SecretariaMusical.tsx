import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import PessoasGrid from "@/components/PessoasGrid";
import cartilhaData from "../cartilha-data.json";

export default function SecretariaMusical() {
  const [, navigate] = useLocation();
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
        <h1 className="text-4xl font-bold text-primary">Secretaria Musical</h1>
        <p className="text-muted-foreground text-lg">
          Conheça os membros da Secretaria Musical responsáveis pela coordenação das atividades musicais.
        </p>
      </div>

      <PessoasGrid
        title="Secretaria Musical"
        pessoas={cartilhaData.secretariaMusical}
        showFuncao={true}
      />
    </div>
  );
}
