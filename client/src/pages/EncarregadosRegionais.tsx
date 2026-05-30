import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import PessoasGrid from "@/components/PessoasGrid";
import cartilhaData from "../cartilha-data.json";

export default function EncarregadosRegionais() {
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
        <h1 className="text-4xl font-bold text-primary">Encarregados Regionais</h1>
        <p className="text-muted-foreground text-lg">
          Conheça os encarregados regionais responsáveis pelos ensaios em cada localidade.
        </p>
      </div>

      <PessoasGrid
        title="Encarregados Regionais"
        pessoas={cartilhaData.encarregadosRegionais}
        showCidade={true}
        showBairro={true}
      />
    </div>
  );
}
