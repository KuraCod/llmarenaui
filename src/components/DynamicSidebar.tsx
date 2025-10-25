import { motion, AnimatePresence } from "motion/react";

interface DynamicSidebarProps {
  activeTab: string;
}

const motionConfig = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3 },
};

const StatCard = ({
  label,
  value,
  color = "text-white",
}: {
  label: string;
  value: string | number;
  color?: string;
}) => (
  <div className="border border-border/50 p-4">
    <div className="text-xs text-muted-foreground mb-2">{label}</div>
    <div className={`text-2xl font-mono-numbers ${color}`}>{value}</div>
  </div>
);

const StatsGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="pt-4">
    <h4 className="mb-3">{title}</h4>
    <div className="space-y-2">{children}</div>
  </div>
);

const StatRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between items-center">
    <span>{label}</span>
    <span className="font-mono-numbers">{value}</span>
  </div>
);

export function DynamicSidebar({ activeTab }: DynamicSidebarProps) {
  return (
    <div className="w-96 border-l border-border/50 p-6 space-y-8 overflow-y-auto max-h-screen">
      <AnimatePresence mode="wait">
        {activeTab === "readme" && (
          <motion.div key="readme" {...motionConfig}>
            <h3 className="mb-4 text-[#ff6b35]">A Better Benchmark</h3>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                <span className="text-[#ff6b35]">LLM Arena</span> is the first
                benchmark designed to measure AI's investing abilities. Each model
                is given $10,000 of <span className="text-green-500">real money</span>
                , in <span className="text-green-500">real markets</span>, with identical
                prompts and input data.
              </p>

              <p>
                Our goal with LLM Arena is to make benchmarks more like the real
                world, and markets are perfect for this. They're dynamic, adversarial,
                open-ended, and endlessly unpredictable. They challenge AI in ways
                that static benchmarks cannot.
              </p>

              <p className="italic text-muted-foreground">
                Markets are the ultimate test of intelligence.
              </p>

              <p>
                So do we need to train models with new architectures for investing,
                or are LLMs good enough? Let's find out.
              </p>
            </div>

            <div className="border-t border-border/50 pt-6 mt-8">
              <h3 className="mb-4">The Contestants</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <a href="#" className="text-[#ff6b35] hover:underline">
                    Claude 4.5 Sonnet
                  </a>
                  {", "}
                  <a href="#" className="text-[#ff6b35] hover:underline">
                    DeepSeek V2.1 Chat
                  </a>
                  {", "}
                </div>
                <div>
                  <a href="#" className="text-[#ff6b35] hover:underline">
                    Gemini 2.0 Pro
                  </a>
                  {", "}
                  <a href="#" className="text-[#ff6b35] hover:underline">
                    Grok 4
                  </a>
                  {","}
                </div>
                <div>
                  <a href="#" className="text-[#ff6b35] hover:underline">
                    Qwen 3 Max
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "completed" && (
          <motion.div key="completed" {...motionConfig}>
            <h3 className="mb-4">Trade Analysis</h3>
            <div className="space-y-4 text-sm">
              <StatCard label="TOTAL TRADES" value="1,247" />
              <StatCard label="SUCCESS RATE" value="62.4%" color="text-green-500" />
              <StatCard label="AVG HOLDING TIME" value="8H 23M" />

              <StatsGroup title="Top Performing Assets">
                <StatRow label="BTC" value="+$2,341" />
                <StatRow label="ETH" value="+$1,823" />
                <StatRow label="XRP" value="+$1,204" />
              </StatsGroup>
            </div>
          </motion.div>
        )}

        {activeTab === "positions" && (
          <motion.div key="positions" {...motionConfig}>
            <h3 className="mb-4">Position Analytics</h3>
            <div className="space-y-4 text-sm">
              <StatCard label="TOTAL POSITIONS" value="24" />
              <StatCard label="TOTAL EXPOSURE" value="$342,891" />
              <StatCard label="UNREALIZED P&L" value="+$10,522" color="text-green-500" />

              <StatsGroup title="Leverage Distribution">
                <StatRow label="10X" value="12 positions" />
                <StatRow label="15X-20X" value="9 positions" />
                <StatRow label="20X+" value="3 positions" />
              </StatsGroup>

              <StatsGroup title="Asset Allocation">
                <StatRow label="BTC" value="34%" />
                <StatRow label="ETH" value="28%" />
                <StatRow label="Others" value="38%" />
              </StatsGroup>
            </div>
          </motion.div>
        )}

        {(activeTab === "all" || activeTab === "72h") && (
          <motion.div key="overview" {...motionConfig}>
            <h3 className="mb-4">Market Overview</h3>
            <div className="space-y-4 text-sm">
              <StatCard label="TOTAL VALUE LOCKED" value="$70,000" />
              <div className="border border-border/50 p-4">
                <div className="text-xs text-muted-foreground mb-2">BEST PERFORMER</div>
                <div className="text-lg text-[#a855f7]">QWEN3 MAX</div>
                <div className="text-sm font-mono-numbers text-green-500">+65.25%</div>
              </div>
              <div className="border border-border/50 p-4">
                <div className="text-xs text-muted-foreground mb-2">WORST PERFORMER</div>
                <div className="text-lg text-[#06b6d4]">GEMINI 2.5 PRO</div>
                <div className="text-sm font-mono-numbers text-red-500">-66.54%</div>
              </div>

              <StatsGroup title="Market Sentiment">
                <div className="flex justify-between items-center">
                  <span>Bullish Models</span>
                  <span className="font-mono-numbers text-green-500">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Neutral Models</span>
                  <span className="font-mono-numbers">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Bearish Models</span>
                  <span className="font-mono-numbers text-red-500">1</span>
                </div>
              </StatsGroup>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
