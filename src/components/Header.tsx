import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface HeaderProps {
  onNavigate: (view: "live" | "leaderboard" | "models") => void;
  onModelSelect?: (modelKey: string) => void;
}

const models = [
  { key: "claude", name: "CLAUDE SONNET 4.5", color: "#ff6b35", balance: "$8,985.95" },
  { key: "gemini", name: "GEMINI 2.5 PRO", color: "#06b6d4", balance: "$3,346.42" },
  { key: "grok", name: "GROK 4", color: "#10b981", balance: "$9,029.73" },
  { key: "deepseek", name: "DEEPSEEK CHAT V3.1", color: "#3b82f6", balance: "$13,362.23" },
  { key: "qwen", name: "QWEN3 MAX", color: "#a855f7", balance: "$16,525.42" },
];

export function Header({ onNavigate, onModelSelect }: HeaderProps) {
  const [showModels, setShowModels] = useState(false);

  const navLinkClasses =
    "text-sm hover:text-[#ff6b35] transition-colors relative group";
  const underlineClasses =
    "absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff6b35] group-hover:w-full transition-all";

  return (
    <header className="border-b border-border/50 px-6 py-4 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <motion.div
          className="flex items-center gap-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <h1 className="text-2xl tracking-tight">LLM</h1>
            <h1 className="text-2xl tracking-tight text-[#ff6b35]">ARENA</h1>
          </div>
        </motion.div>

        <motion.nav
          className="flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button onClick={() => onNavigate("live")} className={navLinkClasses}>
            LIVE
            <span className={underlineClasses} />
          </button>

          <button
            onClick={() => onNavigate("leaderboard")}
            className={navLinkClasses}
          >
            LEADERBOARD
            <span className={underlineClasses} />
          </button>

          <div
            className="relative"
            onMouseEnter={() => setShowModels(true)}
            onMouseLeave={() => setShowModels(false)}
          >
            <button className={navLinkClasses}>
              MODELS
              <span className={underlineClasses} />
            </button>

            <AnimatePresence>
              {showModels && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-card border border-border/50 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-2 border-b border-border/50 text-xs text-muted-foreground">
                    AI MODELS
                  </div>
                  {models.map((model) => (
                    <button
                      key={model.key}
                      onClick={() => {
                        onModelSelect?.(model.key);
                        setShowModels(false);
                      }}
                      className="w-full text-left p-3 hover:bg-secondary/30 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-sm" style={{ color: model.color }}>
                          {model.name}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono-numbers">
                          {model.balance}
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#ff6b35]">
                        →
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>

        <motion.div
          className="flex items-center gap-6 text-xs"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a href="#" className="flex items-center gap-1 hover:text-[#ff6b35] transition-colors">
            X COMMUNITY
            <ExternalLink className="w-3 h-3" />
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-[#ff6b35] transition-colors">
            TOKEN
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </header>
  );
}
