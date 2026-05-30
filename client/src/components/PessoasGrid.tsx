import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface Pessoa {
  nome: string;
  cidade?: string;
  bairro?: string;
  funcao?: string;
}

interface PessoasGridProps {
  title: string;
  pessoas: Pessoa[];
  showCidade?: boolean;
  showBairro?: boolean;
  showFuncao?: boolean;
}

export default function PessoasGrid({ 
  title, 
  pessoas, 
  showCidade = false, 
  showBairro = false,
  showFuncao = false 
}: PessoasGridProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-accent rounded-full"></div>
        <h2 className="text-3xl font-bold text-primary">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pessoas.map((pessoa, index) => (
          <Card key={index} className="border-border/50 hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-start gap-2">
                <Users className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary">{pessoa.nome}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {showCidade && pessoa.cidade && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cidade:</span>
                  <span className="font-medium text-foreground">{pessoa.cidade}</span>
                </div>
              )}
              {showBairro && pessoa.bairro && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bairro:</span>
                  <span className="font-medium text-foreground">{pessoa.bairro}</span>
                </div>
              )}
              {showFuncao && pessoa.funcao && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Função:</span>
                  <span className="font-medium text-foreground">{pessoa.funcao}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
