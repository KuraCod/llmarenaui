import { useState } from "react";
import { GlassDock, GlassFilter, type DockIcon } from "./ui/liquid-glass";
import { motion, AnimatePresence } from "motion/react";
import { SlidingNumber } from "./ui/sliding-number";
import claudeLogo from "figma:asset/e7850a291e84adf285549cd1b5822f92ce088b4e.png";
import grokLogo from "figma:asset/6772e785e3d2a25d519176e04f02905f89374c4e.png";
import geminiLogo from "figma:asset/7f592223f95090e9356a8d1411a83f6132edd4fa.png";
import qwenLogo from "figma:asset/499039332c06091be66a7ded5fb545e1dd5193de.png";
import deepseekLogo from "figma:asset/949fb92cdadb76e7dbca3ac450bdbf7cfad508e4.png";

interface ModelDockProps {
  onModelClick: (modelKey: string) => void;
}

interface ModelIcon extends DockIcon {
  key: string;
  balance: number;
  change: string;
  color: string;
}

const modelIcons: ModelIcon[] = [
  {
    key: "claude",
    src: claudeLogo,
    alt: "CLAUDE SONNET 4.5",
    balance: 8985.95,
    change: "-10.14%",
    color: "#ff6b35",
  },
  {
    key: "gemini",
    src: geminiLogo,
    alt: "GEMINI 2.5 PRO",
    balance: 3346.42,
    change: "-66.54%",
    color: "#06b6d4",
  },
  {
    key: "grok",
    src: grokLogo,
    alt: "GROK 4",
    balance: 9029.73,
    change: "-9.70%",
    color: "#10b981",
  },
  {
    key: "deepseek",
    src: deepseekLogo,
    alt: "DEEPSEEK CHAT V3.1",
    balance: 13362.23,
    change: "+33.62%",
    color: "#3b82f6",
  },
  {
    key: "qwen",
    src: qwenLogo,
    alt: "QWEN3 MAX",
    balance: 16525.42,
    change: "+65.25%",
    color: "#a855f7",
  },
];

const formatBalance = (num: number): string => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function ModelDock({ onModelClick }: ModelDockProps) {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const hoveredModelData = modelIcons.find((m) => m.key === hoveredModel);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <GlassFilter />

      <AnimatePresence>
        {hoveredModelData && (
          <motion.div
            key={hoveredModel}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <div className="bg-black/90 border border-[#ff6b35]/30 rounded-lg p-4 shadow-2xl backdrop-blur-md">
              <div className="text-center min-w-[140px]">
                <div className="text-xs mb-1" style={{ color: hoveredModelData.color }}>
                  {hoveredModelData.alt}
                </div>
                <div className="font-mono-numbers mb-1 flex items-center justify-center">
                  ${formatBalance(hoveredModelData.balance)}
                </div>
                <div
                  className={`text-xs font-mono-numbers ${
                    hoveredModelData.change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {hoveredModelData.change}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <GlassDock
        icons={modelIcons.map((model) => ({
          ...model,
          onClick: () => onModelClick(model.key),
          onMouseEnter: () => setHoveredModel(model.key),
          onMouseLeave: () => setHoveredModel(null),
        }))}
      />
    </div>
  );
}
