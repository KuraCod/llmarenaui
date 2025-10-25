import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import claudeLogo from "figma:asset/e7850a291e84adf285549cd1b5822f92ce088b4e.png";
import grokLogo from "figma:asset/6772e785e3d2a25d519176e04f02905f89374c4e.png";
import geminiLogo from "figma:asset/7f592223f95090e9356a8d1411a83f6132edd4fa.png";
import qwenLogo from "figma:asset/499039332c06091be66a7ded5fb545e1dd5193de.png";
import deepseekLogo from "figma:asset/949fb92cdadb76e7dbca3ac450bdbf7cfad508e4.png";

interface Position {
  model: string;
  modelColor: string;
  modelLogo: string;
  positions: {
    side: "LONG" | "SHORT";
    coin: string;
    leverage: string;
    notional: string;
    exitPlan: boolean;
    unrealizedPnl: string;
    isProfit: boolean;
  }[];
  totalPnl: string;
  isProfitTotal: boolean;
  availableCash: string;
}

const positionsData: Position[] = [
  {
    model: "GPT 5",
    modelColor: "#3b82f6",
    modelLogo: deepseekLogo,
    totalPnl: "$332.69",
    isProfitTotal: true,
    availableCash: "$2,807.7",
    positions: [
      { side: "LONG", coin: "XRP", leverage: "15X", notional: "$4,620", exitPlan: true, unrealizedPnl: "$04.01", isProfit: true },
      { side: "LONG", coin: "DOGE", leverage: "16X", notional: "$1,572", exitPlan: true, unrealizedPnl: "$0.21", isProfit: true },
      { side: "LONG", coin: "BTC", leverage: "20X", notional: "$5,554", exitPlan: true, unrealizedPnl: "$76.83", isProfit: true },
      { side: "LONG", coin: "ETH", leverage: "20X", notional: "$4,996", exitPlan: true, unrealizedPnl: "$8.19", isProfit: true },
      { side: "LONG", coin: "SOL", leverage: "20X", notional: "$4,096", exitPlan: true, unrealizedPnl: "$04.81", isProfit: true },
      { side: "LONG", coin: "BNB", leverage: "10X", notional: "$2,470", exitPlan: true, unrealizedPnl: "-$12.15", isProfit: false },
    ],
  },
  {
    model: "GROK 4",
    modelColor: "#10b981",
    modelLogo: grokLogo,
    totalPnl: "$1,202.09",
    isProfitTotal: true,
    availableCash: "$3,262.04",
    positions: [
      { side: "LONG", coin: "XRP", leverage: "10X", notional: "$5,063", exitPlan: true, unrealizedPnl: "$255.52", isProfit: true },
      { side: "LONG", coin: "DOGE", leverage: "10X", notional: "$13,601", exitPlan: true, unrealizedPnl: "$855.02", isProfit: true },
      { side: "LONG", coin: "BTC", leverage: "20X", notional: "$19,883", exitPlan: true, unrealizedPnl: "$152.87", isProfit: true },
      { side: "LONG", coin: "ETH", leverage: "10X", notional: "$4,958", exitPlan: true, unrealizedPnl: "-$37.74", isProfit: false },
      { side: "LONG", coin: "SOL", leverage: "10X", notional: "$6,127", exitPlan: true, unrealizedPnl: "$04.35", isProfit: true },
      { side: "LONG", coin: "BNB", leverage: "10X", notional: "$7,033", exitPlan: true, unrealizedPnl: "-$127.92", isProfit: false },
    ],
  },
  {
    model: "QWEN3 MAX",
    modelColor: "#a855f7",
    modelLogo: qwenLogo,
    totalPnl: "$6,099.74",
    isProfitTotal: true,
    availableCash: "$0.00",
    positions: [
      { side: "LONG", coin: "BTC", leverage: "20X", notional: "$217,706", exitPlan: true, unrealizedPnl: "$6,040", isProfit: true },
    ],
  },
  {
    model: "GEMINI 2.5 PRO",
    modelColor: "#06b6d4",
    modelLogo: geminiLogo,
    totalPnl: "$227.35",
    isProfitTotal: true,
    availableCash: "$1,363.26",
    positions: [
      { side: "LONG", coin: "XRP", leverage: "15X", notional: "$4,040", exitPlan: true, unrealizedPnl: "$160.13", isProfit: true },
      { side: "LONG", coin: "DOGE", leverage: "10X", notional: "$1,544", exitPlan: true, unrealizedPnl: "$27.84", isProfit: true },
      { side: "LONG", coin: "BTC", leverage: "20X", notional: "$5,554", exitPlan: true, unrealizedPnl: "$35.68", isProfit: true },
      { side: "LONG", coin: "ETH", leverage: "24X", notional: "$5,785", exitPlan: true, unrealizedPnl: "-$4.70", isProfit: false },
      { side: "LONG", coin: "SOL", leverage: "15X", notional: "$4,080", exitPlan: true, unrealizedPnl: "$76.49", isProfit: true },
      { side: "SHORT", coin: "BNB", leverage: "10X", notional: "$5,677", exitPlan: true, unrealizedPnl: "-$68.00", isProfit: false },
    ],
  },
  {
    model: "DEEPSEEK CHAT V3.1",
    modelColor: "#3b82f6",
    modelLogo: deepseekLogo,
    totalPnl: "$2,264.89",
    isProfitTotal: true,
    availableCash: "$0.00",
    positions: [
      { side: "LONG", coin: "XRP", leverage: "10X", notional: "$9,187", exitPlan: true, unrealizedPnl: "$363.97", isProfit: true },
      { side: "LONG", coin: "DOGE", leverage: "10X", notional: "$5,540", exitPlan: true, unrealizedPnl: "$397.48", isProfit: true },
      { side: "LONG", coin: "BTC", leverage: "10X", notional: "$13,329", exitPlan: true, unrealizedPnl: "$447.70", isProfit: true },
      { side: "LONG", coin: "ETH", leverage: "20X", notional: "$102,513", exitPlan: true, unrealizedPnl: "$947.18", isProfit: true },
      { side: "LONG", coin: "SOL", leverage: "15X", notional: "$15,052", exitPlan: true, unrealizedPnl: "$097.48", isProfit: true },
      { side: "LONG", coin: "BNB", leverage: "10X", notional: "$3,566", exitPlan: true, unrealizedPnl: "$11.07", isProfit: true },
    ],
  },
  {
    model: "CLAUDE SONNET 4.5",
    modelColor: "#ff6b35",
    modelLogo: claudeLogo,
    totalPnl: "$396.68",
    isProfitTotal: true,
    availableCash: "$0.00",
    positions: [
      { side: "LONG", coin: "XRP", leverage: "8X", notional: "$5,967", exitPlan: true, unrealizedPnl: "$82.63", isProfit: true },
      { side: "LONG", coin: "BTC", leverage: "20X", notional: "$49,954", exitPlan: true, unrealizedPnl: "$314.05", isProfit: true },
    ],
  },
];

export function PositionsView() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm">FILTER:</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-transparent border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ALL MODELS</SelectItem>
              <SelectItem value="gpt5">GPT 5</SelectItem>
              <SelectItem value="grok4">GROK 4</SelectItem>
              <SelectItem value="qwen3">QWEN3 MAX</SelectItem>
              <SelectItem value="gemini">GEMINI 2.5 PRO</SelectItem>
              <SelectItem value="deepseek">DEEPSEEK CHAT V3.1</SelectItem>
              <SelectItem value="claude">CLAUDE SONNET 4.5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-8">
        {positionsData.map((modelData, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex items-center gap-3 pb-2">
              <img src={modelData.modelLogo} alt={modelData.model} className="w-6 h-6 object-contain" />
              <h3 className="text-sm" style={{ color: modelData.modelColor }}>
                {modelData.model}
              </h3>
              <span className="text-sm ml-auto">
                TOTAL UNREALIZED P&L:{" "}
                <span className={modelData.isProfitTotal ? "text-green-500" : "text-red-500"}>
                  {modelData.totalPnl}
                </span>
              </span>
            </div>

            <div className="border border-border/50">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr className="text-xs">
                    <th className="text-left p-3">SIDE</th>
                    <th className="text-left p-3">COIN</th>
                    <th className="text-left p-3">LEVERAGE</th>
                    <th className="text-left p-3">NOTIONAL</th>
                    <th className="text-left p-3">EXIT PLAN</th>
                    <th className="text-left p-3">UNREAL P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {modelData.positions.map((position, posIdx) => (
                    <tr key={posIdx} className="border-t border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="p-3">
                        <span className={position.side === "LONG" ? "text-green-500" : "text-red-500"}>
                          {position.side}
                        </span>
                      </td>
                      <td className="p-3">
                        <span>{position.coin}</span>
                      </td>
                      <td className="p-3 font-mono-numbers">{position.leverage}</td>
                      <td className="p-3 font-mono-numbers">{position.notional}</td>
                      <td className="p-3">
                        {position.exitPlan && (
                          <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                            VIEW
                          </Button>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={position.isProfit ? "text-green-500 font-mono-numbers" : "text-red-500 font-mono-numbers"}>
                          {position.unrealizedPnl}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-sm text-muted-foreground pl-3 font-mono-numbers">
              AVAILABLE CASH: {modelData.availableCash}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
