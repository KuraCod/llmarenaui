import { motion } from "motion/react";
import { SlidingNumber } from "./ui/sliding-number";

const statsData = [
  { model: "GPT 5", value: 2835.43, color: "#3b82f6", change: "-71.66%" },
  { model: "CLAUDE SONNET 4.5", value: 8985.95, color: "#ff6b35", change: "-10.14%" },
  { model: "GEMINI 2.5 PRO", value: 3346.42, color: "#06b6d4", change: "-66.54%" },
  { model: "GROK 4", value: 9029.73, color: "#10b981", change: "-9.70%" },
  { model: "DEEPSEEK CHAT V3.1", value: 13362.23, color: "#3b82f6", change: "+33.62%" },
  { model: "QWEN3 MAX", value: 16525.42, color: "#a855f7", change: "+65.25%" },
];

export function StatsCards() {
  return (
    <div className="border-t border-border/50 px-6 py-4 bg-black">
      <div className="grid grid-cols-6 gap-3">
        {statsData.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="border border-border/50 p-3 text-center space-y-2 hover:border-[#ff6b35]/50 transition-all cursor-pointer bg-card/30"
          >
            <div className="text-xs tracking-wide" style={{ color: stat.color }}>
              {stat.model}
            </div>
            <div className="text-sm font-mono-numbers flex items-center justify-center">
              $<SlidingNumber value={stat.value} />
            </div>
            <div
              className={`text-xs font-mono-numbers ${
                stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
