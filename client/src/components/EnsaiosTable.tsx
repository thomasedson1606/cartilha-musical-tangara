import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Ensaio {
  dia: string;
  horas: string;
  comum: string;
  encarregado: string;
  cidade?: string;
}

interface EnsaiosTableProps {
  title: string;
  description?: string;
  ensaios: Ensaio[];
  showCidade?: boolean;
}

export default function EnsaiosTable({ title, description, ensaios, showCidade = false }: EnsaiosTableProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="border-b border-border/30">
        <CardTitle className="text-primary">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 bg-secondary/20 hover:bg-secondary/20">
                <TableHead className="text-primary font-semibold">Dia do Ensaio</TableHead>
                <TableHead className="text-primary font-semibold">Horas</TableHead>
                {showCidade && <TableHead className="text-primary font-semibold">Cidade</TableHead>}
                <TableHead className="text-primary font-semibold">Comum</TableHead>
                <TableHead className="text-primary font-semibold">Encarregado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ensaios.map((ensaio, index) => (
                <TableRow key={index} className="border-border/20 hover:bg-secondary/10 transition-colors">
                  <TableCell className="font-medium text-foreground">{ensaio.dia}</TableCell>
                  <TableCell className="text-foreground">{ensaio.horas || "-"}</TableCell>
                  {showCidade && <TableCell className="text-foreground">{ensaio.cidade}</TableCell>}
                  <TableCell className="text-foreground">{ensaio.comum}</TableCell>
                  <TableCell className="text-foreground font-medium text-accent">{ensaio.encarregado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
