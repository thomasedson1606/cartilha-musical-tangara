import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import EnsaiosLocaisTangara from "./pages/EnsaiosLocaisTangara";
import EnsaiosLocaisRegiao from "./pages/EnsaiosLocaisRegiao";
import EncarregadosRegionais from "./pages/EncarregadosRegionais";
import EncarregadosLocais from "./pages/EncarregadosLocais";
import Examinadoras from "./pages/Examinadoras";
import SecretariaMusical from "./pages/SecretariaMusical";
import HinoSilencio from "./pages/HinoSilencio";
import Recomendacoes from "./pages/Recomendacoes";
import OndePossoTocar from "./pages/OndePossoTocar";
import PosicaoOrquestra from "./pages/PosicaoOrquestra";
import CalendarioEnsaio from "./pages/CalendarioEnsaio";
import CultosTangara from "./pages/CultosTangara";
import InstrumentosPermitidos from "./pages/InstrumentosPermitidos";
import { Music, Sun, Moon } from "lucide-react";

function PageLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border/30 bg-card shadow-sm sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Music className="w-8 h-8 text-accent shrink-0" />
            <div className="truncate">
              <h1 className="text-xl font-bold text-primary truncate">Cartilha Musical</h1>
              <p className="text-xs text-muted-foreground truncate">Tangará da Serra e Região</p>
            </div>
          </div>
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border/30 bg-background hover:bg-secondary/20 transition-colors shrink-0"
              title={theme === "light" ? "Modo escuro" : "Modo claro"}
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-primary" />
              ) : (
                <Sun className="w-5 h-5 text-accent" />
              )}
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-8 flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-secondary/5 mt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Congregação Cristã no Brasil - Cartilha Musical Digital</p>
          <p className="mt-2">Tangará da Serra e Região</p>
        </div>
      </footer>
    </div>
  );
}
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/">
        {() => (
          <PageLayout>
            <Home />
          </PageLayout>
        )}
      </Route>
      <Route path="/ensaios-tangara">
        {() => (
          <PageLayout>
            <EnsaiosLocaisTangara />
          </PageLayout>
        )}
      </Route>
      <Route path="/ensaios-regiao">
        {() => (
          <PageLayout>
            <EnsaiosLocaisRegiao />
          </PageLayout>
        )}
      </Route>
      <Route path="/encarregados-regionais">
        {() => (
          <PageLayout>
            <EncarregadosRegionais />
          </PageLayout>
        )}
      </Route>
      <Route path="/encarregados-locais">
        {() => (
          <PageLayout>
            <EncarregadosLocais />
          </PageLayout>
        )}
      </Route>
      <Route path="/examinadoras">
        {() => (
          <PageLayout>
            <Examinadoras />
          </PageLayout>
        )}
      </Route>
      <Route path="/secretaria-musical">
        {() => (
          <PageLayout>
            <SecretariaMusical />
          </PageLayout>
        )}
      </Route>
      <Route path="/hino-silencio">
        {() => (
          <PageLayout>
            <HinoSilencio />
          </PageLayout>
        )}
      </Route>
      <Route path="/recomendacoes">
        {() => (
          <PageLayout>
            <Recomendacoes />
          </PageLayout>
        )}
      </Route>
      <Route path="/onde-posso-tocar">
        {() => (
          <PageLayout>
            <OndePossoTocar />
          </PageLayout>
        )}
      </Route>
      <Route path="/posicao-orquestra">
        {() => (
          <PageLayout>
            <PosicaoOrquestra />
          </PageLayout>
        )}
      </Route>
      <Route path="/calendario-ensaio">
        {() => (
          <PageLayout>
            <CalendarioEnsaio />
          </PageLayout>
        )}
      </Route>
      <Route path="/cultos-tangara">
        {() => (
          <PageLayout>
            <CultosTangara />
          </PageLayout>
        )}
      </Route>
      <Route path="/instrumentos-permitidos">
        {() => (
          <PageLayout>
            <InstrumentosPermitidos />
          </PageLayout>
        )}
      </Route>
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable={true}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
