import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import cartilhaData from "../cartilha-data.json";

export default function OndePossoTocar() {
  const [, navigate] = useLocation();
  const { ondePossoTocar } = cartilhaData;
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const renderCell = (value: string) => {
    if (value === "Sim") {
      return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 font-bold text-sm">✓</span>;
    }
    if (value === "Não") {
      return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-sm">✗</span>;
    }
    return <span className="text-foreground">{value}</span>;
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
        <h1 className="text-4xl font-bold text-primary">Onde Posso Tocar?</h1>
        <p className="text-muted-foreground text-lg">
          Confira em quais tipos de cultos e reuniões você pode participar como músico.
        </p>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="border-b border-border/30">
          <CardTitle className="text-primary">Categorias de Cultos e Reuniões</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 bg-secondary/20 hover:bg-secondary/20">
                  <TableHead className="text-primary font-semibold text-left">Tipo de Culto</TableHead>
                  <TableHead className="text-primary font-semibold text-center">Músico Oficializado</TableHead>
                  <TableHead className="text-primary font-semibold text-center">Músico Não Oficializado</TableHead>
                  <TableHead className="text-primary font-semibold text-center">Músico RJM Batizado</TableHead>
                  <TableHead className="text-primary font-semibold text-center">Músico RJM Não Batizado</TableHead>
                  <TableHead className="text-primary font-semibold text-center">Música Ensaios</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ondePossoTocar.categorias.map((categoria, index) => (
                  <TableRow key={index} className="border-border/20 hover:bg-secondary/10 transition-colors">
                    <TableCell className="font-medium text-foreground">{categoria.tipo}</TableCell>
                    <TableCell className="text-center">{renderCell(categoria.musicoOficializado)}</TableCell>
                    <TableCell className="text-center">{renderCell(categoria.musicoNaoOficializado)}</TableCell>
                    <TableCell className="text-center">{renderCell(categoria.musicoRJMBatizado)}</TableCell>
                    <TableCell className="text-center">{renderCell(categoria.musicoRJMNaoBatizado)}</TableCell>
                    <TableCell className="text-center">{renderCell(categoria.musicoEnsaios)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-secondary/5">
        <CardHeader>
          <CardTitle className="text-primary">Observação</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">
            {ondePossoTocar.observacao}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
