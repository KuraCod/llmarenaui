import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { SlidingNumber } from "./ui/sliding-number";
import { Button } from "./ui/button";
import claudeLogo from "figma:asset/e7850a291e84adf285549cd1b5822f92ce088b4e.png";
import grokLogo from "figma:asset/6772e785e3d2a25d519176e04f02905f89374c4e.png";
import geminiLogo from "figma:asset/7f592223f95090e9356a8d1411a83f6132edd4fa.png";
import qwenLogo from "figma:asset/499039332c06091be66a7ded5fb545e1dd5193de.png";
import deepseekLogo from "figma:asset/949fb92cdadb76e7dbca3ac450bdbf7cfad508e4.png";

interface ChartDataPoint {
  time: string;
  timestamp: number;
  [key: string]: number | string;
}

interface ModelConfig {
  key: string;
  name: string;
  color: string;
  icon?: string;
  logo?: string;
}

const models: ModelConfig[] = [
  { key: "claude", name: "Claude Sonnet 4.5", color: "#ff6b35", logo: claudeLogo },
  { key: "gemini", name: "Gemini 2.5 Pro", color: "#06b6d4", logo: geminiLogo },
  { key: "grok", name: "Grok 4", color: "#10b981", logo: grokLogo },
  {
    key: "deepseek",
    name: "DeepSeek Chat V3.1",
    color: "#3b82f6",
    logo: deepseekLogo,
  },
  { key: "qwen", name: "Qwen3 Max", color: "#a855f7", logo: qwenLogo },
];

const generateChartData = (days: number): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const startDate = new Date("2024-10-17");
  const points = days === 3 ? 36 : days === 7 ? 84 : 168;

  for (let i = 0; i < points; i++) {
    const date = new Date(startDate);
    date.setHours(startDate.getHours() + (i * days * 24) / points);

    data.push({
      time: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
      }),
      timestamp: date.getTime(),
      claude: 10000 + Math.random() * 1000 - i * 5,
      gemini: 10000 - Math.random() * 3000 - i * 35,
      grok: 10000 + Math.random() * 500 - i * 2,
      deepseek: 10000 + Math.random() * 4000 + i * 20,
      qwen: 10000 + Math.random() * 7000 + i * 40,
    });
  }

  return data;
};

interface InteractiveChartProps {
  onLineClick: (modelKey: string) => void;
}

export function InteractiveChart({ onLineClick }: InteractiveChartProps) {
  const [timeRange, setTimeRange] = useState<"3d" | "7d" | "all">("all");
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<any>(null);

  const data = useMemo(() => {
    const days = timeRange === "3d" ? 3 : timeRange === "7d" ? 7 : 7;
    return generateChartData(days);
  }, [timeRange]);

  const latestData = data[data.length - 1];
  const totalValue = latestData
    ? Object.values(latestData).reduce(
        (acc, val) => (typeof val === "number" ? acc + val : acc),
        0
      ) / models.length
    : 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const tooltipPayload = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border/50 p-3 rounded-md shadow-lg"
        >
          <p className="text-xs text-muted-foreground mb-2">{tooltipPayload.time}</p>
          {payload
            .sort((a: any, b: any) => b.value - a.value)
            .map((entry: any) => {
              const model = models.find((m) => m.key === entry.dataKey);
              return (
                <div
                  key={entry.dataKey}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="flex items-center gap-2">
                    {model?.logo ? (
                      <span className="w-5 h-5 flex items-center justify-center">
                        <img
                          src={model.logo}
                          alt={model.name}
                          className="w-full h-full object-contain"
                        />
                      </span>
                    ) : (
                      <span
                        className="px-1.5 py-0.5 rounded text-xs"
                        style={{ backgroundColor: entry.color, color: "#000" }}
                      >
                        {model?.icon}
                      </span>
                    )}
                    <span style={{ color: entry.color }}>{model?.name}</span>
                  </span>
                  <span className="font-mono-numbers">
                    ${entry.value.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              );
            })}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-sm tracking-wider mb-2">TOTAL ACCOUNT VALUE</h2>
          <div className="text-3xl font-mono-numbers flex items-center">
            $<SlidingNumber value={totalValue} />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={timeRange === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("all")}
            className={timeRange === "all" ? "bg-white text-black hover:bg-white/90" : ""}
          >
            ALL
          </Button>
          <Button
            variant={timeRange === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("7d")}
            className={timeRange === "7d" ? "bg-white text-black hover:bg-white/90" : ""}
          >
            7D
          </Button>
          <Button
            variant={timeRange === "3d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("3d")}
            className={timeRange === "3d" ? "bg-white text-black hover:bg-white/90" : ""}
          >
            72H
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        {models.map((model) => (
          <div
            key={model.key}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all"
            style={{
              backgroundColor:
                hoveredModel === model.key ? `${model.color}15` : "transparent",
              borderColor: hoveredModel === model.key ? model.color : "transparent",
            }}
          >
            {model.logo ? (
              <span className="w-5 h-5 flex items-center justify-center">
                <img
                  src={model.logo}
                  alt={model.name}
                  className="w-full h-full object-contain"
                />
              </span>
            ) : (
              <span
                className="px-1.5 py-0.5 rounded text-xs"
                style={{ backgroundColor: model.color, color: "#000" }}
              >
                {model.icon}
              </span>
            )}
            <span className="text-xs" style={{ color: model.color }}>
              {model.name}
            </span>
            <span className="text-xs font-mono-numbers ml-2 flex items-center">
              $<SlidingNumber value={latestData[model.key] || 0} />
            </span>
          </div>
        ))}
      </div>

      <motion.div
        key={timeRange}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={data}
            onMouseMove={(e) => {
              if (e.activePayload && e.activePayload.length > 0) {
                setTooltipData(e.activePayload[0].payload);
                const closestLine = e.activePayload.reduce((prev: any, curr: any) => {
                  return Math.abs(curr.value - e.chartY) <
                    Math.abs(prev.value - e.chartY)
                    ? curr
                    : prev;
                });
                if (closestLine && closestLine.dataKey) {
                  setHoveredModel(closestLine.dataKey);
                }
              }
            }}
            onMouseLeave={() => {
              setTooltipData(null);
              setHoveredModel(null);
            }}
          >
            <defs>
              {models.map((model) => (
                <filter
                  key={`blur-${model.key}`}
                  id={`blur-${model.key}`}
                >
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                </filter>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#262626"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="#666"
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#666"
              tick={{ fontSize: 10 }}
              domain={[0, 20000]}
              ticks={[0, 2500, 5000, 7500, 10000, 12500, 15000, 17500, 20000]}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />

            {models.map((model) => (
              <Line
                key={model.key}
                type="monotone"
                dataKey={model.key}
                stroke={model.color}
                strokeWidth={
                  hoveredModel === model.key ? 4 : hoveredModel ? 1 : 2.5
                }
                dot={false}
                opacity={hoveredModel ? (hoveredModel === model.key ? 1 : 0.2) : 1}
                style={{
                  filter:
                    hoveredModel && hoveredModel !== model.key
                      ? `url(#blur-${model.key})`
                      : "none",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() => onLineClick(model.key)}
              />
            ))}

            {tooltipData && hoveredModel && (
              <ReferenceDot
                x={tooltipData.time}
                y={tooltipData[hoveredModel]}
                r={6}
                fill={models.find((m) => m.key === hoveredModel)?.color}
                stroke="#000"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
