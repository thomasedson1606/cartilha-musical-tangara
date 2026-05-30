import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Music, ArrowLeft, Download } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import cartilhaData from "../cartilha-data.json";

interface Ensaio {
  dia: string;
  horas: string;
  comum: string;
  encarregado: string;
  cidade?: string;
  tipo?: string;
}

export default function CalendarioEnsaio() {
  const [, navigate] = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(String(currentDate.getMonth() + 1).padStart(2, "0"));
  const [selectedYear, setSelectedYear] = useState(String(currentDate.getFullYear()));
  const [filtro, setFiltro] = useState("TODOS");
  const [selectedEnsaio, setSelectedEnsaio] = useState<Ensaio | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Combinar ensaios de Tangará e Região
  const allEnsaios = [
    ...cartilhaData.ensaiosLocaisTangara.map(e => ({ ...e, cidade: "Tangará da Serra", tipo: "tangara" })),
    ...cartilhaData.ensaiosLocaisRegiao.map(e => ({ ...e, tipo: "regiao" })),
  ];

  // Filtrar ensaios baseado na seleção
  const ensaiosFiltrados = useMemo(() => {
    if (filtro === "TODOS") return allEnsaios;
    if (filtro === "TANGARÁ DA SERRA") return allEnsaios.filter(e => e.tipo === "tangara");
    if (filtro === "DEMAIS REGIÃO") return allEnsaios.filter(e => e.tipo === "regiao");
    return allEnsaios;
  }, [filtro]);

  // Função para obter todas as datas que correspondem a um padrão
  const getDatesForPattern = (pattern: string, year: number, month: number): number[] => {
    const dates: number[] = [];
    const lastDay = new Date(year, month + 1, 0).getDate();
    const diasSemana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    
    // Padrão "Última Segunda-Feira", "Último Sábado", etc
    if (pattern.startsWith("Última") || pattern.startsWith("Último")) {
      for (let day = lastDay; day >= lastDay - 6; day--) {
        if (day > 0) {
          const date = new Date(year, month, day);
          const dayName = diasSemana[date.getDay()];
          if (pattern.includes(dayName)) {
            dates.push(day);
            break;
          }
        }
      }
      return dates;
    }

    // Padrão "1ª Segunda-Feira", "2ª Sexta-Feira", etc
    const match = pattern.match(/^(\d)ª\s+(.+?)(?:\s*\(.*\))?$/);
    if (match) {
      const weekNumber = parseInt(match[1]);
      const dayName = match[2];
      let weekCount = 0;

      for (let day = 1; day <= lastDay; day++) {
        const date = new Date(year, month, day);
        const currentDayName = diasSemana[date.getDay()];
        
        if (currentDayName === dayName) {
          weekCount++;
          if (weekCount === weekNumber) {
            dates.push(day);
            break;
          }
        }
      }
    }

    return dates;
  };

  // Obter ensaios para um dia específico
  const getEnsaiosPorDia = (day: number): Ensaio[] => {
    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth) - 1;

    return ensaiosFiltrados.filter((ensaio) => {
      const matchingDates = getDatesForPattern(ensaio.dia, year, month);
      return matchingDates.includes(day);
    });
  };

  // Gerar calendário
  const calendarDays = useMemo(() => {
    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth) - 1;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [selectedMonth, selectedYear]);

  const monthName = new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const handlePreviousMonth = () => {
    const date = new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1, 1);
    date.setMonth(date.getMonth() - 1);
    setSelectedMonth(String(date.getMonth() + 1).padStart(2, "0"));
    setSelectedYear(String(date.getFullYear()));
  };

  const handleNextMonth = () => {
    const date = new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1, 1);
    date.setMonth(date.getMonth() + 1);
    setSelectedMonth(String(date.getMonth() + 1).padStart(2, "0"));
    setSelectedYear(String(date.getFullYear()));
  };

  // Função para obter cores baseado no tipo de ensaio
  const getEnsaioStyles = (tipo: string | undefined) => {
    if (tipo === "tangara") {
      return {
        bg: "bg-blue-900/20",
        text: "text-blue-900",
        hover: "hover:bg-blue-900/30",
      };
    } else {
      return {
        bg: "bg-green-900/20",
        text: "text-green-900",
        hover: "hover:bg-green-900/30",
      };
    }
  };

  // Exportar calendário como PDF
  const exportarPDF = async () => {
    const element = document.getElementById("calendario-export");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`calendario-ensaios-${selectedMonth}-${selectedYear}.pdf`);
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
    }
  };

  // Exportar calendário como imagem
  const exportarImagem = async () => {
    const element = document.getElementById("calendario-export");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `calendario-ensaios-${selectedMonth}-${selectedYear}.png`;
      link.click();
    } catch (error) {
      console.error("Erro ao exportar imagem:", error);
    }
  };

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  return (
    <div className="space-y-8">
      {/* Botão de voltar */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/")}
        className="text-accent hover:bg-accent/10 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Music className="w-12 h-12 text-accent" />
        </div>
        <h1 className="text-4xl font-bold text-primary">Calendário de Ensaios</h1>
        <p className="text-lg text-muted-foreground">
          Visualize todos os ensaios do mês selecionado
        </p>
      </div>

      {/* Filtro */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-primary">Filtrar Ensaios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center justify-center flex-wrap">
            <Button
              variant={filtro === "TODOS" ? "default" : "outline"}
              onClick={() => setFiltro("TODOS")}
              className={filtro === "TODOS" ? "bg-accent text-white" : "border-accent/30 text-accent hover:bg-accent hover:text-white"}
            >
              TODOS
            </Button>
            <Button
              variant={filtro === "TANGARÁ DA SERRA" ? "default" : "outline"}
              onClick={() => setFiltro("TANGARÁ DA SERRA")}
              className={filtro === "TANGARÁ DA SERRA" ? "bg-blue-900 text-white" : "border-blue-900/30 text-blue-900 hover:bg-blue-900 hover:text-white"}
            >
              TANGARÁ DA SERRA
            </Button>
            <Button
              variant={filtro === "DEMAIS REGIÃO" ? "default" : "outline"}
              onClick={() => setFiltro("DEMAIS REGIÃO")}
              className={filtro === "DEMAIS REGIÃO" ? "bg-green-900 text-white" : "border-green-900/30 text-green-900 hover:bg-green-900 hover:text-white"}
            >
              DEMAIS REGIÃO
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Controles de Mês/Ano e Exportação */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-primary">Selecione o Mês e Ano</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center justify-center flex-wrap">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => {
                  const monthNum = i + 1;
                  const monthName = new Date(2024, i, 1).toLocaleDateString("pt-BR", { month: "long" });
                  return (
                    <SelectItem key={monthNum} value={String(monthNum).padStart(2, "0")}>
                      {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() - 2 + i;
                  return (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date();
                setSelectedMonth(String(today.getMonth() + 1).padStart(2, "0"));
                setSelectedYear(String(today.getFullYear()));
              }}
              className="border-accent/30 text-accent hover:bg-accent hover:text-white"
            >
              Hoje
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={exportarPDF}
              className="border-accent/30 text-accent hover:bg-accent hover:text-white flex gap-2"
            >
              <Download className="w-4 h-4" />
              PDF
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={exportarImagem}
              className="border-accent/30 text-accent hover:bg-accent hover:text-white flex gap-2"
            >
              <Download className="w-4 h-4" />
              Imagem
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calendário */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePreviousMonth}
              className="text-accent hover:bg-accent/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <CardTitle className="text-primary capitalize">{monthName}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextMonth}
              className="text-accent hover:bg-accent/10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div id="calendario-export" className="space-y-4">
            {/* Cabeçalho com dias da semana */}
            <div className="grid grid-cols-7 gap-2">
              {diasSemana.map((dia) => (
                <div
                  key={dia}
                  className="text-center font-semibold text-primary text-sm py-2 border-b-2 border-accent/20"
                >
                  {dia}
                </div>
              ))}
            </div>

            {/* Dias do calendário */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                const ensaios = day ? getEnsaiosPorDia(day) : [];
                const isToday =
                  day &&
                  new Date().getDate() === day &&
                  new Date().getMonth() === parseInt(selectedMonth) - 1 &&
                  new Date().getFullYear() === parseInt(selectedYear);

                return (
                  <div
                    key={index}
                    className={`min-h-24 p-2 border rounded-lg transition-all ${
                      day
                        ? isToday
                          ? "bg-accent/10 border-accent"
                          : "border-border/30 hover:border-accent/50"
                        : "bg-muted/20"
                    }`}
                  >
                    {day && (
                      <div className="space-y-1">
                        <div
                          className={`text-sm font-semibold ${
                            isToday ? "text-accent" : "text-primary"
                          }`}
                        >
                          {day}
                        </div>
                        <div className="space-y-1">
                          {ensaios.length > 0 ? (
                            ensaios.map((ensaio, idx) => {
                              const styles = getEnsaioStyles(ensaio.tipo);
                              return (
                                <div
                                  key={idx}
                                  className={`text-xs ${styles.bg} ${styles.text} rounded p-1 truncate ${styles.hover} cursor-pointer transition-colors`}
                                  onClick={() => {
                                    setSelectedEnsaio(ensaio);
                                    setModalOpen(true);
                                  }}
                                  title={`${ensaio.cidade} - ${ensaio.comum} - ${ensaio.horas}`}
                                >
                                  <div className="font-semibold truncate">{ensaio.cidade}</div>
                                  <div className="truncate">{ensaio.comum}</div>
                                  <div className="text-xs">{ensaio.horas}</div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-xs text-muted-foreground italic">-</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legenda */}
      <Card className="border-border/50 bg-secondary/5">
        <CardHeader>
          <CardTitle className="text-primary text-sm">Legenda de Cores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-900"></div>
            <span>Ensaios de Tangará da Serra</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-900"></div>
            <span>Ensaios da Região</span>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes do Ensaio */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-primary">Detalhes do Ensaio</DialogTitle>
          </DialogHeader>
          {selectedEnsaio && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Cidade</p>
                <p className="text-lg font-semibold text-foreground">{selectedEnsaio.cidade}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Comum</p>
                <p className="text-lg font-semibold text-foreground">{selectedEnsaio.comum}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Horário</p>
                <p className="text-lg font-semibold text-foreground">{selectedEnsaio.horas}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Encarregado</p>
                <p className="text-lg font-semibold text-foreground">{selectedEnsaio.encarregado}</p>
              </div>
              <div className="pt-4 border-t border-border/30">
                <p className="text-xs text-muted-foreground italic">
                  Endereço e localização serão adicionados em breve
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
