import { useEffect } from "react";
import EnsaiosTable from "@/components/EnsaiosTable";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import cartilhaData from "../cartilha-data.json";

export default function EnsaiosLocaisRegiao() {
  const [, navigate] = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, []);
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
        <h1 className="text-4xl font-bold text-primary">Ensaios Locais - Localidades da Região</h1>
        <p className="text-muted-foreground text-lg">
          Confira os dias, horários e locais dos ensaios nas diferentes cidades e comunas da região.
        </p>
      </div>

      <EnsaiosTable
        title="Agenda de Ensaios Regionais"
        description="Ensaios Locais nas Localidades da Região"
        ensaios={cartilhaData.ensaiosLocaisRegiao}
        showCidade={true}
      />
    </div>
  );
}
