import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Users, Clock, BookOpen, Zap, Calendar, Globe, ExternalLink, CalendarDays, Guitar } from "lucide-react";
import { Link } from "wouter";

const menuItems = [
  {
    icon: Clock,
    title: "Ensaios Locais - Tangará",
    description: "Confira os dias e horários dos ensaios em Tangará da Serra",
    href: "/ensaios-tangara",
    color: "text-blue-600",
  },
  {
    icon: Clock,
    title: "Ensaios Locais - Região",
    description: "Ensaios nas localidades da região com informações de cidade",
    href: "/ensaios-regiao",
    color: "text-amber-600",
  },
  {
    icon: Users,
    title: "Encarregados Regionais",
    description: "Conheça os encarregados responsáveis por cada localidade",
    href: "/encarregados-regionais",
    color: "text-green-600",
  },
  {
    icon: Users,
    title: "Encarregados Locais",
    description: "Encarregados dos ensaios em Tangará da Serra",
    href: "/encarregados-locais",
    color: "text-purple-600",
  },
  {
    icon: Users,
    title: "Examinadoras",
    description: "Examinadoras responsáveis pela avaliação musical",
    href: "/examinadoras",
    color: "text-pink-600",
  },
  {
    icon: Users,
    title: "Secretaria Musical",
    description: "Membros da Secretaria Musical da Congregação",
    href: "/secretaria-musical",
    color: "text-indigo-600",
  },
  {
    icon: Music,
    title: "Hino do Silêncio",
    description: "Sequência e horários para execução do Hino do Silêncio",
    href: "/hino-silencio",
    color: "text-red-600",
  },
  {
    icon: BookOpen,
    title: "Recomendações",
    description: "Orientações importantes para músicos e organistas",
    href: "/recomendacoes",
    color: "text-teal-600",
  },
  {
    icon: Zap,
    title: "Onde Posso Tocar?",
    description: "Confira em quais cultos você pode participar",
    href: "/onde-posso-tocar",
    color: "text-yellow-600",
  },
  {
    icon: Music,
    title: "Posição da Orquestra",
    description: "Organização dos instrumentos por família",
    href: "/posicao-orquestra",
    color: "text-orange-600",
  },
  {
    icon: Calendar,
    title: "Calendário de Ensaios",
    description: "Visualize os ensaios em um calendário interativo por mês",
    href: "/calendario-ensaio",
    color: "text-cyan-600",
  },
  {
    icon: CalendarDays,
    title: "Cultos em Tangará da Serra",
    description: "Dias e horários dos cultos em todas as comunas",
    href: "/cultos-tangara",
    color: "text-rose-600",
  },
  {
    icon: Guitar,
    title: "Instrumentos Permitidos",
    description: "Voz principal e alternativa de cada instrumento na orquestra",
    href: "/instrumentos-permitidos",
    color: "text-violet-600",
  },
];

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="flex justify-center">
          <Music className="w-16 h-16 text-accent" />
        </div>
        <h1 className="text-5xl font-bold text-primary">Cartilha Musical</h1>
        <p className="text-2xl text-accent font-semibold">Tangará da Serra e Região</p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Bem-vindo à plataforma digital da Cartilha de Ensaios Musicais da Congregação Cristã no Brasil.
          Aqui você encontra todas as informações sobre ensaios, encarregados, recomendações e orientações
          para os músicos da região.
        </p>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link key={index} href={item.href}>
              <a>
                <Card className="h-full border-border/50 hover:shadow-lg hover:border-accent/50 transition-all duration-200 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Icon className={`w-8 h-8 ${item.color} group-hover:text-accent transition-colors`} />
                    </div>
                    <CardTitle className="text-primary group-hover:text-accent transition-colors">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full border-accent/30 text-accent hover:bg-accent hover:text-white transition-colors"
                    >
                      Acessar
                    </Button>
                  </CardContent>
                </Card>
              </a>
            </Link>
          );
        })}
      </div>

      {/* Links Úteis */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary text-center">Links Úteis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://agenda.ccbmt.org.br/Lista"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="border-border/50 hover:shadow-lg hover:border-accent/50 transition-all duration-200 cursor-pointer group h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Globe className="w-8 h-8 text-accent group-hover:text-accent transition-colors" />
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-accent" />
                </div>
                <CardTitle className="text-primary group-hover:text-accent transition-colors">
                  Agenda de Batismos Mato Grosso
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Confira a agenda de batismos em Mato Grosso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full border-accent/30 text-accent hover:bg-accent hover:text-white transition-colors"
                >
                  Acessar
                </Button>
              </CardContent>
            </Card>
          </a>
          <a
            href="https://congregacaocristanobrasil.org.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="border-border/50 hover:shadow-lg hover:border-accent/50 transition-all duration-200 cursor-pointer group h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Globe className="w-8 h-8 text-accent group-hover:text-accent transition-colors" />
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-accent" />
                </div>
                <CardTitle className="text-primary group-hover:text-accent transition-colors">
                  Portal Congregação Cristã no Brasil
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Site oficial da Congregação Cristã no Brasil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full border-accent/30 text-accent hover:bg-accent hover:text-white transition-colors"
                >
                  Acessar
                </Button>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>

      {/* Footer Info */}
      <Card className="border-border/50 bg-secondary/5">
        <CardHeader>
          <CardTitle className="text-primary">Sobre esta Plataforma</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-foreground">
          <p>
            Esta plataforma foi desenvolvida por Thômas Edson para facilitar o acesso às informações contidas na Cartilha de Ensaios
            Musicais da Congregação Cristã no Brasil, especificamente para a região de Tangará da Serra e localidades.
          </p>
          <p>
            Aqui você encontra informações sobre os ensaios, encarregados, examinadoras, recomendações para músicos
            e organistas, bem como orientações sobre a posição dos instrumentos na orquestra.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
