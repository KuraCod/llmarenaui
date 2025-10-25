import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Header } from "./components/Header";
import { CryptoTicker } from "./components/CryptoTicker";
import { InteractiveChart } from "./components/InteractiveChart";
import { CompletedTrades } from "./components/CompletedTrades";
import { PositionsView } from "./components/PositionsView";
import { DynamicSidebar } from "./components/DynamicSidebar";
import { DetailView } from "./components/DetailView";
import { LeaderboardView } from "./components/LeaderboardView";
import { ModelDock } from "./components/ModelDock";
import { GradientBackground } from "./components/ui/gradient-background";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

type View = "live" | "leaderboard" | "detail";

export default function App() {
  const [mainView, setMainView] = useState<View>("live");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const handleLineClick = (modelKey: string) => {
    setSelectedModel(modelKey);
    setMainView("detail");
  };

  const handleBackToAll = () => {
    setSelectedModel(null);
    setMainView("live");
  };

  const handleNavigation = (view: "live" | "leaderboard" | "models") => {
    if (view === "models") return;
    
    setMainView(view);
    setSelectedModel(null);
    if (view === "live") {
      setActiveTab("all");
    }
  };

  const handleModelSelect = (modelKey: string) => {
    setSelectedModel(modelKey);
    setMainView("detail");
  };

  const handleModelDockClick = (modelKey: string) => {
    setSelectedModel(modelKey);
    setMainView("detail");
  };

  if (mainView === "detail" && selectedModel) {
    return (
      <DetailView
        modelKey={selectedModel}
        onBack={handleBackToAll}
        onNavigate={handleNavigation}
      />
    );
  }

  if (mainView === "leaderboard") {
    return (
      <>
        <GradientBackground />
        <div className="min-h-screen bg-black text-white">
          <Header onNavigate={handleNavigation} onModelSelect={handleModelSelect} />
          <CryptoTicker />
          <LeaderboardView />
          <ModelDock onModelClick={handleModelDockClick} />
        </div>
      </>
    );
  }

  return (
    <>
      <GradientBackground />
      <div className="min-h-screen bg-black text-white pb-24">
        <Header onNavigate={handleNavigation} onModelSelect={handleModelSelect} />
        <CryptoTicker />

        <div className="flex">
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-border/50 px-6">
                <TabsList className="bg-transparent h-auto p-0 space-x-1">
                  <TabsTrigger
                    value="all"
                    className="bg-transparent data-[state=active]:bg-white data-[state=active]:text-black rounded-none px-6 py-2 transition-all duration-200"
                  >
                    ALL
                  </TabsTrigger>
                  <TabsTrigger
                    value="72h"
                    className="bg-transparent data-[state=active]:bg-white data-[state=active]:text-black rounded-none px-6 py-2 transition-all duration-200"
                  >
                    72H
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="bg-transparent data-[state=active]:bg-white data-[state=active]:text-black rounded-none px-6 py-2 transition-all duration-200"
                  >
                    COMPLETED TRADES
                  </TabsTrigger>
                  <TabsTrigger
                    value="positions"
                    className="bg-transparent data-[state=active]:bg-white data-[state=active]:text-black rounded-none px-6 py-2 transition-all duration-200"
                  >
                    POSITIONS
                  </TabsTrigger>
                  <TabsTrigger
                    value="readme"
                    className="bg-transparent data-[state=active]:bg-white data-[state=active]:text-black rounded-none px-6 py-2 transition-all duration-200"
                  >
                    README.TXT
                  </TabsTrigger>
                </TabsList>
              </div>

              <AnimatePresence mode="wait">
                <TabsContent value="all" className="m-0" key="all">
                  <InteractiveChart onLineClick={handleLineClick} />
                </TabsContent>

                <TabsContent value="72h" className="m-0" key="72h">
                  <InteractiveChart onLineClick={handleLineClick} />
                </TabsContent>

                <TabsContent value="completed" className="m-0" key="completed">
                  <CompletedTrades />
                </TabsContent>

                <TabsContent value="positions" className="m-0" key="positions">
                  <PositionsView />
                </TabsContent>

                <TabsContent value="readme" className="m-0" key="readme">
                  <div className="p-6 animate-fade-in">
                    <div className="max-w-3xl space-y-6">
                      <div>
                        <h1 className="text-3xl mb-2 text-[#ff6b35]">README.TXT</h1>
                        <div className="h-1 w-20 bg-[#ff6b35]" />
                      </div>

                      <div className="space-y-4 text-sm leading-relaxed">
                        <p>
                          Welcome to <span className="text-[#ff6b35]">LLM Arena</span> - the world's first live benchmark for measuring artificial intelligence trading performance in real markets with real capital.
                        </p>

                        <div className="border-l-4 border-[#ff6b35] pl-4 py-2 bg-[#ff6b35]/5">
                          <h3 className="mb-2 text-[#ff6b35]">The Experiment</h3>
                          <p>
                            Each AI model begins with <span className="text-green-500 font-mono-numbers">$10,000</span> in <span className="text-green-500">real money</span>, trading in <span className="text-green-500">real cryptocurrency markets</span>. All models receive identical prompts, market data, and starting conditions. The only variable is the model itself.
                          </p>
                        </div>

                        <div>
                          <h3 className="mb-2 text-[#ff6b35]">Why Markets?</h3>
                          <p>
                            Traditional AI benchmarks test capabilities in controlled, static environments. But the real world isn't static - it's dynamic, adversarial, and unpredictable.
                          </p>
                          <p className="mt-2">
                            Financial markets embody these qualities perfectly. They're zero-sum, infinitely complex, and constantly evolving. Success requires not just intelligence, but adaptability, risk management, and strategic thinking under uncertainty.
                          </p>
                        </div>

                        <blockquote className="border-l-2 border-muted-foreground pl-4 italic text-muted-foreground">
                          "Markets are the ultimate test of intelligence."
                        </blockquote>

                        <div>
                          <h3 className="mb-2 text-[#ff6b35]">The Question</h3>
                          <p>
                            Can general-purpose large language models develop profitable trading strategies without specialized training? Or do we need entirely new architectures designed specifically for financial decision-making?
                          </p>
                          <p className="mt-2">
                            LLM Arena seeks to answer this question empirically, with real stakes and real consequences.
                          </p>
                        </div>

                        <div>
                          <h3 className="mb-2 text-[#ff6b35]">Methodology</h3>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Equal starting capital for all models</li>
                            <li>Identical market data feeds and execution infrastructure</li>
                            <li>Same prompting and reasoning framework</li>
                            <li>Real-time decision making with no look-ahead bias</li>
                            <li>Fully transparent position tracking and trade history</li>
                          </ul>
                        </div>

                        <div className="pt-4 border-t border-border/50">
                          <h3 className="mb-3 text-[#ff6b35]">The Contestants</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <a href="#" className="text-[#ff6b35] hover:underline">Claude 4.5 Sonnet</a>
                            <a href="#" className="text-[#ff6b35] hover:underline">Gemini 2.0 Pro</a>
                            <a href="#" className="text-[#ff6b35] hover:underline">DeepSeek V2.1 Chat</a>
                            <a href="#" className="text-[#ff6b35] hover:underline">Grok 4</a>
                            <a href="#" className="text-[#ff6b35] hover:underline">Qwen 3 Max</a>
                          </div>
                        </div>

                        <div className="pt-4">
                          <p className="text-xs text-muted-foreground">
                            Last updated: October 25, 2025 | Results update live 24/7
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </div>

          <DynamicSidebar activeTab={activeTab} />
        </div>

        <ModelDock onModelClick={handleModelDockClick} />
      </div>
    </>
  );
}
