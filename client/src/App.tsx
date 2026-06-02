import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
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
import { Music } from "lucide-react";

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/30 bg-white shadow-sm sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-accent" />
            <div>
              <h1 className="text-xl font-bold text-primary">Cartilha Musical</h1>
              <p className="text-xs text-muted-foreground">Tangará da Serra e Região</p>
            </div>
          </div>
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
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
