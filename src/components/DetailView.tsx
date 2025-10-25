import { motion } from "motion/react";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  ReferenceDot,
} from "recharts";
import { useState } from "react";
import { GradientBackground } from "./ui/gradient-background";
import gptLogo from "figma:asset/e793778aed74b4f9d394d4896b8b1f753f3b4d27.png";
import claudeLogo from "figma:asset/e7850a291e84adf285549cd1b5822f92ce088b4e.png";
import grokLogo from "figma:asset/6772e785e3d2a25d519176e04f02905f89374c4e.png";
import geminiLogo from "figma:asset/7f592223f95090e9356a8d1411a83f6132edd4fa.png";
import qwenLogo from "figma:asset/499039332c06091be66a7ded5fb545e1dd5193de.png";
import deepseekLogo from "figma:asset/949fb92cdadb76e7dbca3ac450bdbf7cfad508e4.png";

interface DetailViewProps {
  modelKey: string;
  onBack: () => void;
  onNavigate: (view: "live" | "leaderboard") => void;
}

const modelInfo: Record<string, { 
  name: string; 
  color: string; 
  totalValue: number;
  availableCash: number;
  icon: string;
  logo?: string;
  totalPnl: number;
  totalFees: number;
  netRealized: number;
  avgLeverage: number;
  avgConfidence: number;
  biggestWin: number;
  biggestLoss: number;
  holdLong: number;
  holdShort: number;
  holdFlat: number;
}> = {
  claude: { 
    name: 'CLAUDE SONNET 4.5', 
    color: '#ff6b35', 
    totalValue: 8985.95,
    availableCash: 2341.52,
    icon: 'C',
    logo: claudeLogo,
    totalPnl: -1014.05,
    totalFees: 329.63,
    netRealized: -1343.68,
    avgLeverage: 14.2,
    avgConfidence: 78.5,
    biggestWin: 1807,
    biggestLoss: -1679,
    holdLong: 42.3,
    holdShort: 35.8,
    holdFlat: 21.9,
  },
  gemini: { 
    name: 'GEMINI 2.5 PRO', 
    color: '#06b6d4', 
    totalValue: 3346.42,
    availableCash: 891.23,
    icon: 'GM',
    logo: geminiLogo,
    totalPnl: -6653.58,
    totalFees: 1009.12,
    netRealized: -7662.70,
    avgLeverage: 12.8,
    avgConfidence: 65.2,
    biggestWin: 247.70,
    biggestLoss: -750.02,
    holdLong: 28.4,
    holdShort: 31.6,
    holdFlat: 40.0,
  },
  grok: { 
    name: 'GROK 4', 
    color: '#10b981', 
    totalValue: 8986.93,
    availableCash: 3262.84,
    icon: 'GR',
    logo: grokLogo,
    totalPnl: -1013.07,
    totalFees: 211.48,
    netRealized: -2262.05,
    avgLeverage: 13.3,
    avgConfidence: 65.6,
    biggestWin: 1356,
    biggestLoss: -657.41,
    holdLong: 84.9,
    holdShort: 14.7,
    holdFlat: 0.4,
  },
  deepseek: { 
    name: 'DEEPSEEK CHAT V3.1', 
    color: '#3b82f6', 
    totalValue: 13362.23,
    availableCash: 4521.67,
    icon: 'DS',
    logo: deepseekLogo,
    totalPnl: 3362.23,
    totalFees: 209.63,
    netRealized: 3152.60,
    avgLeverage: 16.7,
    avgConfidence: 82.1,
    biggestWin: 1490,
    biggestLoss: -749.47,
    holdLong: 55.2,
    holdShort: 22.8,
    holdFlat: 22.0,
  },
  qwen: { 
    name: 'QWEN3 MAX', 
    color: '#a855f7', 
    totalValue: 16616.78,
    availableCash: 97.80,
    icon: 'Q3',
    logo: qwenLogo,
    totalPnl: 6616.78,
    totalFees: 613.23,
    netRealized: 481.80,
    avgLeverage: 15.4,
    avgConfidence: 81.9,
    biggestWin: 1453,
    biggestLoss: -586.18,
    holdLong: 16.5,
    holdShort: 1.7,
    holdFlat: 81.7,
  },
  gpt5: { 
    name: 'GPT 5', 
    color: '#3b82f6', 
    totalValue: 2835.43,
    availableCash: 2807.7,
    icon: 'G5',
    logo: gptLogo,
    totalPnl: -7164.57,
    totalFees: 315.82,
    netRealized: -7480.39,
    avgLeverage: 16.8,
    avgConfidence: 62.3,
    biggestWin: 265.69,
    biggestLoss: -621.81,
    holdLong: 64.2,
    holdShort: 28.3,
    holdFlat: 7.5,
  },
};

const tradesData: Record<string, any[]> = {
  qwen: [
    { side: 'LONG', coin: 'ETH', entryPrice: 3842.9, exitPrice: 3758.6, quantity: 0.10, holdingTime: '15d 33H', notionalEntry: 392.36, notionalExit: 383.75, totalFees: 0.31, netPnl: -8.92 },
    { side: 'SHORT', coin: 'SOL', entryPrice: 187.13, exitPrice: 183.77, quantity: 105.63, holdingTime: '5H 52M', notionalEntry: 19767, notionalExit: 19412, totalFees: 16.66, netPnl: 338.91 },
    { side: 'SHORT', coin: 'ETH', entryPrice: 3884.2, exitPrice: 3825.8, quantity: 5.11, holdingTime: '1H 2M', notionalEntry: 19848, notionalExit: 19550, totalFees: 16.75, netPnl: 281.77 },
    { side: 'LONG', coin: 'ETH', entryPrice: 3922, exitPrice: 3887.1, quantity: 13.20, holdingTime: '2H 8M', notionalEntry: 51770, notionalExit: 51310, totalFees: 46.39, netPnl: -507.07 },
  ],
  grok: [
    { side: 'LONG', coin: 'ETH', entryPrice: 3975.4, exitPrice: 3964, quantity: 1.43, holdingTime: '4H 15M', notionalEntry: 5685, notionalExit: 5669, totalFees: 4.54, netPnl: -20.84 },
    { side: 'SHORT', coin: 'ETH', entryPrice: 3821.5, exitPrice: 3976, quantity: -1.58, holdingTime: '27H 35M', notionalEntry: 6038, notionalExit: 6282, totalFees: 5.09, netPnl: -249.35 },
    { side: 'SHORT', coin: 'BNB', entryPrice: 1129.9, exitPrice: 1129.5, quantity: -12.33, holdingTime: '8H 44M', notionalEntry: 14030, notionalExit: 13927, totalFees: 9.80, netPnl: 93.55 },
  ],
  claude: [
    { side: 'SHORT', coin: 'BTC', entryPrice: 108420, exitPrice: 107950, quantity: -0.85, holdingTime: '12H 23M', notionalEntry: 92157, notionalExit: 91757, totalFees: 73.58, netPnl: 326.84 },
    { side: 'LONG', coin: 'ETH', entryPrice: 3842.5, exitPrice: 3891.2, quantity: 2.45, holdingTime: '6H 15M', notionalEntry: 9414, notionalExit: 9533, totalFees: 7.59, netPnl: 111.82 },
    { side: 'SHORT', coin: 'SOL', entryPrice: 188.92, exitPrice: 191.15, quantity: -42.30, holdingTime: '18H 44M', notionalEntry: 7991, notionalExit: 8086, totalFees: 6.43, netPnl: -100.73 },
    { side: 'LONG', coin: 'BNB', entryPrice: 1125.40, exitPrice: 1132.90, quantity: 5.20, holdingTime: '3H 52M', notionalEntry: 5852, notionalExit: 5891, totalFees: 4.75, netPnl: 34.25 },
  ],
  gemini: [
    { side: 'LONG', coin: 'BTC', entryPrice: 109200, exitPrice: 108100, quantity: 0.45, holdingTime: '8H 12M', notionalEntry: 49140, notionalExit: 48645, totalFees: 39.11, netPnl: -534.11 },
    { side: 'SHORT', coin: 'ETH', entryPrice: 3900.0, exitPrice: 3925.5, quantity: -1.80, holdingTime: '4H 35M', notionalEntry: 7020, notionalExit: 7066, totalFees: 5.63, netPnl: -51.53 },
    { side: 'LONG', coin: 'SOL', entryPrice: 185.50, exitPrice: 183.20, quantity: 25.40, holdingTime: '14H 28M', notionalEntry: 4712, notionalExit: 4653, totalFees: 3.77, netPnl: -62.17 },
  ],
  deepseek: [
    { side: 'LONG', coin: 'BTC', entryPrice: 106800, exitPrice: 108950, quantity: 1.25, holdingTime: '24H 15M', notionalEntry: 133500, notionalExit: 136188, totalFees: 107.90, netPnl: 2580.10 },
    { side: 'SHORT', coin: 'ETH', entryPrice: 3950.0, exitPrice: 3875.0, quantity: -3.50, holdingTime: '9H 42M', notionalEntry: 13825, notionalExit: 13562, totalFees: 11.06, netPnl: 251.94 },
    { side: 'LONG', coin: 'SOL', entryPrice: 182.30, exitPrice: 189.75, quantity: 48.20, holdingTime: '16H 33M', notionalEntry: 8787, notionalExit: 9146, totalFees: 7.17, netPnl: 351.83 },
    { side: 'SHORT', coin: 'BNB', entryPrice: 1138.50, exitPrice: 1129.90, quantity: -8.40, holdingTime: '5H 18M', notionalEntry: 9563, notionalExit: 9491, totalFees: 7.62, netPnl: 64.38 },
  ],
  gpt5: [
    { side: 'LONG', coin: 'BTC', entryPrice: 109500, exitPrice: 108200, quantity: 0.35, holdingTime: '12H 8M', notionalEntry: 38325, notionalExit: 37870, totalFees: 30.48, netPnl: -485.48 },
    { side: 'SHORT', coin: 'ETH', entryPrice: 3885.0, exitPrice: 3920.0, quantity: -2.10, holdingTime: '6H 22M', notionalEntry: 8159, notionalExit: 8232, totalFees: 6.57, netPnl: -79.57 },
    { side: 'LONG', coin: 'SOL', entryPrice: 188.40, exitPrice: 186.90, quantity: 18.50, holdingTime: '8H 15M', notionalEntry: 3485, notionalExit: 3458, totalFees: 2.78, netPnl: -30.53 },
    { side: 'SHORT', coin: 'BNB', entryPrice: 1132.0, exitPrice: 1135.5, quantity: -4.20, holdingTime: '4H 42M', notionalEntry: 4754, notionalExit: 4769, totalFees: 3.81, netPnl: -18.51 },
  ],
};

const activePositions: Record<string, any[]> = {
  qwen: [
    { coin: 'BTC', entryTime: '01:27:37', entryPrice: 107993, side: 'Long', quantity: 1.96, leverage: '20X', liqPrice: 104016, margin: 16361, unrealizedPnl: 6175 },
  ],
  grok: [
    { coin: 'XRP', entryTime: '00:17:49', entryPrice: 2.43, side: 'Long', quantity: 2303, leverage: '10X', liqPrice: 2.25, margin: 779.85, unrealizedPnl: 226.96 },
    { coin: 'DOGE', entryTime: '18:17:06', entryPrice: 0.19, side: 'Long', quantity: 68396, leverage: '10X', liqPrice: 0.18, margin: 2073, unrealizedPnl: 807.83 },
    { coin: 'BTC', entryTime: '16:15:25', entryPrice: 109940, side: 'Long', quantity: 0.17, leverage: '20X', liqPrice: 105851, margin: 1122, unrealizedPnl: 205.28 },
  ],
  claude: [
    { coin: 'BTC', entryTime: '14:32:18', entryPrice: 108200, side: 'Long', quantity: 0.82, leverage: '15X', liqPrice: 104350, margin: 5914, unrealizedPnl: 892.50 },
    { coin: 'ETH', entryTime: '09:45:22', entryPrice: 3885.50, side: 'Short', quantity: -1.35, leverage: '12X', liqPrice: 4120.80, margin: 438.17, unrealizedPnl: -156.23 },
  ],
  deepseek: [
    { coin: 'BTC', entryTime: '11:28:43', entryPrice: 107850, side: 'Long', quantity: 1.45, leverage: '18X', liqPrice: 103920, margin: 8691, unrealizedPnl: 1523.75 },
    { coin: 'SOL', entryTime: '08:12:09', entryPrice: 186.20, side: 'Long', quantity: 35.80, leverage: '15X', liqPrice: 179.45, margin: 444.29, unrealizedPnl: 312.48 },
  ],
  gpt5: [
    { coin: 'XRP', entryTime: '13:22:11', entryPrice: 2.48, side: 'Long', quantity: 1862, leverage: '15X', liqPrice: 2.36, margin: 308.05, unrealizedPnl: 27.73 },
    { coin: 'DOGE', entryTime: '10:45:33', entryPrice: 0.195, side: 'Long', quantity: 8063, leverage: '16X', liqPrice: 0.186, margin: 98.27, unrealizedPnl: 31.45 },
    { coin: 'BTC', entryTime: '08:18:27', entryPrice: 110200, side: 'Long', quantity: 0.05, leverage: '20X', liqPrice: 106092, margin: 277.70, unrealizedPnl: 45.38 },
    { coin: 'ETH', entryTime: '06:52:14', entryPrice: 3920.0, side: 'Long', quantity: 1.27, leverage: '20X', liqPrice: 3771.2, margin: 249.82, unrealizedPnl: 20.57 },
    { coin: 'SOL', entryTime: '04:33:08', entryPrice: 191.50, side: 'Long', quantity: 21.40, leverage: '20X', liqPrice: 184.24, margin: 204.81, unrealizedPnl: 47.73 },
    { coin: 'BNB', entryTime: '02:15:42', entryPrice: 1125.0, side: 'Long', quantity: 2.20, leverage: '10X', liqPrice: 1068.75, margin: 247.50, unrealizedPnl: -30.36 },
  ],
};

const generateDetailChartData = (modelKey: string, viewType: 'value' | 'percent') => {
  const data = [];
  const model = modelInfo[modelKey];
  const startValue = 10000;
  const endValue = model.totalValue;
  const points = 100;
  
  for (let i = 0; i < points; i++) {
    const progress = i / (points - 1);
    const value = startValue + (endValue - startValue) * progress + (Math.random() - 0.5) * 500;
    const percentChange = ((value - 10000) / 10000) * 100;
    
    data.push({
      time: `Day ${i + 1}`,
      value: viewType === 'value' ? value : percentChange,
      rawValue: value,
    });
  }
  
  return data;
};

export function DetailView({ modelKey, onBack, onNavigate }: DetailViewProps) {
  const model = modelInfo[modelKey];
  const [viewType, setViewType] = useState<'value' | 'percent'>('value');
  const [chartData, setChartData] = useState(generateDetailChartData(modelKey, viewType));
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);
  
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleViewTypeChange = (type: 'value' | 'percent') => {
    setViewType(type);
    setChartData(generateDetailChartData(modelKey, type));
  };

  const trades = tradesData[modelKey] || [];
  const positions = activePositions[modelKey] || [];

  return (
    <>
      <GradientBackground />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-black"
      >
        <div className="p-6">
          <div className="flex gap-3 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              [LIVE CHART]
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('leaderboard')}
              className="gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              [LEADERBOARD]
            </Button>
          </div>

          <div className="border border-border/50 p-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
              {model.logo ? (
                <div 
                  className="w-12 h-12 rounded flex items-center justify-center p-2" 
                  style={{ backgroundColor: model.color + '20' }}
                >
                  <img src={model.logo} alt={model.name} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div 
                  className="w-12 h-12 rounded flex items-center justify-center text-xl" 
                  style={{ backgroundColor: model.color + '20', color: model.color }}
                >
                  {model.icon}
                </div>
              )}
              <div>
                <div className="text-xs text-[#06b6d4] mb-1">[LINK TO WALLET]</div>
                <h1 className="text-xl">{model.name}</h1>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-xs text-muted-foreground">Total Account Value:</div>
                <div className="text-lg font-mono-numbers">${formatNumber(model.totalValue)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Available Cash:</div>
                <div className="text-lg font-mono-numbers">${formatNumber(model.availableCash)}</div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="border border-border/50 p-6">
              <div className="text-sm mb-2">Total P&L:</div>
              <div className={`text-2xl font-mono-numbers ${model.totalPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {model.totalPnl >= 0 ? '+' : ''}${formatNumber(model.totalPnl)}
              </div>
            </div>
            <div className="border border-border/50 p-6">
              <div className="text-sm mb-2">Total Fees:</div>
              <div className="text-2xl font-mono-numbers">${formatNumber(model.totalFees)}</div>
            </div>
            <div className="border border-border/50 p-6">
              <div className="text-sm mb-2">Net Realized:</div>
              <div className={`text-2xl font-mono-numbers ${model.netRealized >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {model.netRealized >= 0 ? '+' : ''}${formatNumber(model.netRealized)}
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-right mb-6">
            Does not include funding costs and rebates
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="border border-border/50 p-6">
              <div className="space-y-2">
                <div>Average Leverage: <span className="font-mono-numbers">{model.avgLeverage}</span></div>
                <div>Average Confidence: <span className="font-mono-numbers">{model.avgConfidence}%</span></div>
                <div>Biggest Win: <span className="font-mono-numbers text-green-500">${formatNumber(model.biggestWin)}</span></div>
                <div>Biggest Loss: <span className="font-mono-numbers text-red-500">${formatNumber(model.biggestLoss)}</span></div>
              </div>
            </div>
            <div className="border border-border/50 p-6">
              <div className="text-sm mb-3">HOLD TIMES</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Long:</span>
                  <span className="font-mono-numbers text-green-500">{model.holdLong}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Short:</span>
                  <span className="font-mono-numbers text-red-500">{model.holdShort}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Flat:</span>
                  <span className="font-mono-numbers">{model.holdFlat}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Positions */}
          {positions.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg">ACTIVE POSITIONS</h3>
                <div className="text-sm">
                  Total Unrealized P&L: <span className="font-mono-numbers text-green-500">
                    ${formatNumber(positions.reduce((sum, p) => sum + p.unrealizedPnl, 0))}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {positions.map((position, idx) => (
                  <div key={idx} className="border border-border/50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#ff6b35]/20 flex items-center justify-center">
                        <span className="text-xs">{position.coin}</span>
                      </div>
                      <span className="text-sm">{position.coin}</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div>Entry Time: <span className="font-mono-numbers">{position.entryTime}</span></div>
                      <div>Entry Price: <span className="font-mono-numbers">${formatNumber(position.entryPrice)}</span></div>
                      <div>Side: <span className={`font-mono-numbers ${position.side === 'Long' ? 'text-green-500' : 'text-red-500'}`}>{position.side}</span></div>
                      <div>Quantity: <span className="font-mono-numbers">{position.quantity}</span></div>
                      <div>Leverage: <span className="font-mono-numbers">{position.leverage}</span></div>
                      <div>Liquidation Price: <span className="font-mono-numbers">${formatNumber(position.liqPrice)}</span></div>
                      <div>Margin: <span className="font-mono-numbers">${formatNumber(position.margin)}</span></div>
                      <div>Unrealized P&L: <span className={`font-mono-numbers ${position.unrealizedPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>{position.unrealizedPnl >= 0 ? '+' : ''}${formatNumber(position.unrealizedPnl)}</span></div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xs mb-1">Exit Plan:</div>
                      <Button variant="outline" size="sm" className="w-full text-xs">VIEW</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Last 25 Trades */}
          <div>
            <h3 className="text-lg mb-4">LAST 25 TRADES</h3>
            <div className="border border-border/50 overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr className="text-xs">
                    <th className="text-left p-3">SIDE</th>
                    <th className="text-left p-3">COIN</th>
                    <th className="text-left p-3">ENTRY PRICE</th>
                    <th className="text-left p-3">EXIT PRICE</th>
                    <th className="text-left p-3">QUANTITY</th>
                    <th className="text-left p-3">HOLDING TIME</th>
                    <th className="text-left p-3">NOTIONAL ENTRY</th>
                    <th className="text-left p-3">NOTIONAL EXIT</th>
                    <th className="text-left p-3">TOTAL FEES</th>
                    <th className="text-left p-3">NET P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((trade, idx) => (
                    <tr key={idx} className="border-t border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className={`p-3 ${trade.side === 'LONG' ? 'text-green-500' : 'text-red-500'}`}>
                        {trade.side}
                      </td>
                      <td className="p-3">
                        {trade.coin}
                      </td>
                      <td className="p-3 font-mono-numbers">${formatNumber(trade.entryPrice)}</td>
                      <td className="p-3 font-mono-numbers">${formatNumber(trade.exitPrice)}</td>
                      <td className="p-3 font-mono-numbers">{trade.quantity}</td>
                      <td className="p-3 font-mono-numbers">{trade.holdingTime}</td>
                      <td className="p-3 font-mono-numbers">${formatNumber(trade.notionalEntry)}</td>
                      <td className="p-3 font-mono-numbers">${formatNumber(trade.notionalExit)}</td>
                      <td className="p-3 font-mono-numbers">${formatNumber(trade.totalFees)}</td>
                      <td className={`p-3 font-mono-numbers ${trade.netPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {trade.netPnl >= 0 ? '+' : ''}${formatNumber(Math.abs(trade.netPnl))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart Section */}
          <div className="mt-6 border border-border/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">PERFORMANCE CHART</h3>
              <div className="flex gap-2">
                <Button
                  variant={viewType === 'value' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleViewTypeChange('value')}
                  className={viewType === 'value' ? 'bg-[#ff6b35] text-white' : ''}
                >
                  VALUE ($)
                </Button>
                <Button
                  variant={viewType === 'percent' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleViewTypeChange('percent')}
                  className={viewType === 'percent' ? 'bg-[#ff6b35] text-white' : ''}
                >
                  PERCENT (%)
                </Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                onMouseMove={(e) => {
                  if (e.activePayload) {
                    setHoveredPoint(e.activePayload[0].payload);
                  }
                }}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#666"
                  tick={{ fontSize: 10 }}
                  interval={20}
                />
                <YAxis 
                  stroke="#666"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => viewType === 'value' ? `$${value.toLocaleString()}` : `${value.toFixed(1)}%`}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: '1px solid #333',
                    borderRadius: '4px',
                    padding: '8px'
                  }}
                  labelStyle={{ color: '#999', fontSize: '11px', marginBottom: '4px' }}
                  itemStyle={{ color: model.color, fontSize: '12px', fontFamily: 'monospace' }}
                  formatter={(value: any, name: string, props: any) => {
                    const rawValue = props.payload.rawValue;
                    if (viewType === 'value') {
                      return [`$${rawValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Value'];
                    } else {
                      return [`${value.toFixed(2)}%`, 'Change'];
                    }
                  }}
                  labelFormatter={(label) => label}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={model.color}
                  strokeWidth={3}
                  dot={false}
                />
                {hoveredPoint && (
                  <ReferenceDot
                    x={hoveredPoint.time}
                    y={hoveredPoint.value}
                    r={6}
                    fill={model.color}
                    stroke="#000"
                    strokeWidth={2}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </>
  );
}
