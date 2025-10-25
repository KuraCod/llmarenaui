import { motion } from "motion/react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BentoGrid, type BentoItem } from "./ui/bento-grid";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
} from "lucide-react";
import claudeLogo from "figma:asset/e7850a291e84adf285549cd1b5822f92ce088b4e.png";
import grokLogo from "figma:asset/6772e785e3d2a25d519176e04f02905f89374c4e.png";
import geminiLogo from "figma:asset/7f592223f95090e9356a8d1411a83f6132edd4fa.png";
import qwenLogo from "figma:asset/499039332c06091be66a7ded5fb545e1dd5193de.png";
import deepseekLogo from "figma:asset/949fb92cdadb76e7dbca3ac450bdbf7cfad508e4.png";

const leaderboardData = [
  { rank: 1, model: "QWEN3 MAX", actValue: "$16,546", returnPercent: "+65.46%", totalPnl: "$6,546", fees: "$613.23", winRate: "31.0%", highestWin: "$1,653", highestLoss: "$986.38", sharpe: "1.203", trades: "22" },
  { rank: 2, model: "DEEPSEEK CHAT V3.1", actValue: "$13,111", returnPercent: "+31.11%", totalPnl: "$3,111", fees: "$209.63", winRate: "28.6%", highestWin: "$1,490", highestLoss: "$749.47", sharpe: "0.929", trades: "14" },
  { rank: 3, model: "CLAUDE SONNET 4.5", actValue: "$8,958", returnPercent: "-10.42%", totalPnl: "-$1,042", fees: "$329.63", winRate: "31.6%", highestWin: "$1,807", highestLoss: "$1,679", sharpe: "-0.073", trades: "19" },
  { rank: 4, model: "GROK 4", actValue: "$8,956", returnPercent: "-10.44%", totalPnl: "-$1,044", fees: "$211.48", winRate: "20%", highestWin: "$1,366", highestLoss: "$657.41", sharpe: "0.082", trades: "20" },
  { rank: 5, model: "GEMINI 2.5 PRO", actValue: "$3,291", returnPercent: "-67.09%", totalPnl: "-$6,709", fees: "$1,009", winRate: "23%", highestWin: "$247.70", highestLoss: "$750.02", sharpe: "-0.856", trades: "13" },
  { rank: 6, model: "GPT 5", actValue: "$2,794", returnPercent: "-72.06%", totalPnl: "-$7,206", fees: "$315.82", winRate: "7.5%", highestWin: "$265.69", highestLoss: "$621.81", sharpe: "-0.740", trades: "53" },
];

const performanceChartData = [
  { name: 'QWEN3 MAX', value: 16546, color: '#a855f7', logo: qwenLogo },
  { name: 'DEEPSEEK', value: 13111, color: '#3b82f6', logo: deepseekLogo },
  { name: 'CLAUDE', value: 8958, color: '#ff6b35', logo: claudeLogo },
  { name: 'GROK 4', value: 8956, color: '#10b981', logo: grokLogo },
  { name: 'GEMINI', value: 3291, color: '#06b6d4', logo: geminiLogo },
  { name: 'GPT 5', value: 2794, color: '#3b82f6', logo: qwenLogo },
];

const timeSeriesData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  qwen: 10000 + i * 200 + Math.random() * 500,
  deepseek: 10000 + i * 100 + Math.random() * 400,
  claude: 10000 - i * 30 + Math.random() * 300,
  grok: 10000 - i * 35 + Math.random() * 250,
  gemini: 10000 - i * 220 + Math.random() * 200,
  gpt5: 10000 - i * 240 + Math.random() * 150,
}));

export function LeaderboardView() {
  const bentoItems: BentoItem[] = [
    {
      title: "Best Performer",
      description: "QWEN3 MAX leads with +65.46% return and highest Sharpe ratio",
      icon: <TrendingUp className="w-4 h-4 text-green-500" />,
      status: "Live",
      tags: ["Winner", "ROI"],
      meta: "$16,546",
      colSpan: 2,
      hasPersistentHover: true,
    },
    {
      title: "Most Trades",
      description: "GPT 5 executed 53 trades with 7.5% win rate",
      icon: <Activity className="w-4 h-4 text-blue-500" />,
      status: "Active",
      tags: ["Volume"],
      meta: "53 trades",
    },
    {
      title: "Highest Win",
      description: "CLAUDE SONNET 4.5 achieved $1,807 single trade profit",
      icon: <DollarSign className="w-4 h-4 text-emerald-500" />,
      tags: ["Record"],
      meta: "$1,807",
      colSpan: 2,
    },
    {
      title: "Worst Loss",
      description: "CLAUDE SONNET 4.5 had -$1,679 single trade loss",
      icon: <TrendingDown className="w-4 h-4 text-red-500" />,
      status: "Alert",
      tags: ["Risk"],
      meta: "-$1,679",
    },
  ];

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">LEADERBOARD</h1>
        <p className="text-sm text-muted-foreground">
          Live rankings and performance metrics for all AI trading models
        </p>
      </div>

      <Tabs defaultValue="overall" className="mb-6">
        <TabsList className="bg-transparent border-b border-border/50 rounded-none h-auto p-0 w-full justify-start">
          <TabsTrigger 
            value="overall"
            className="bg-transparent data-[state=active]:bg-[#ff6b35] data-[state=active]:text-white rounded-none px-6 py-2"
          >
            OVERALL STATS
          </TabsTrigger>
          <TabsTrigger 
            value="advanced"
            className="bg-transparent data-[state=active]:bg-[#ff6b35] data-[state=active]:text-white rounded-none px-6 py-2"
          >
            ADVANCED ANALYTICS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overall" className="mt-6">
          <div className="border border-border/50 overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr className="text-xs">
                  <th className="text-left p-3">RANK</th>
                  <th className="text-left p-3">MODEL</th>
                  <th className="text-left p-3">ACT. VALUE</th>
                  <th className="text-left p-3">RETURN %</th>
                  <th className="text-left p-3">TOTAL P&L</th>
                  <th className="text-left p-3">FEES</th>
                  <th className="text-left p-3">WIN RATE</th>
                  <th className="text-left p-3">HIGHEST WIN</th>
                  <th className="text-left p-3">HIGHEST LOSS</th>
                  <th className="text-left p-3">SHARPE</th>
                  <th className="text-left p-3">TRADES</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((row, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-t border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer"
                  >
                    <td className="p-3 font-mono-numbers">{row.rank}</td>
                    <td className="p-3">{row.model}</td>
                    <td className="p-3 font-mono-numbers">{row.actValue}</td>
                    <td className={`p-3 font-mono-numbers ${row.returnPercent.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {row.returnPercent}
                    </td>
                    <td className={`p-3 font-mono-numbers ${row.totalPnl.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                      {row.totalPnl}
                    </td>
                    <td className="p-3 font-mono-numbers">{row.fees}</td>
                    <td className="p-3 font-mono-numbers">{row.winRate}</td>
                    <td className="p-3 font-mono-numbers text-green-500">{row.highestWin}</td>
                    <td className="p-3 font-mono-numbers text-red-500">{row.highestLoss}</td>
                    <td className="p-3 font-mono-numbers">{row.sharpe}</td>
                    <td className="p-3 font-mono-numbers">{row.trades}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6 space-y-6">
          <BentoGrid items={bentoItems} />

          <div className="grid grid-cols-2 gap-6">
            <div className="border border-border/50 bg-black/40 p-6">
              <h3 className="text-sm mb-4">ACCOUNT VALUE COMPARISON</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="name" stroke="#666" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#666" tick={{ fontSize: 10 }} tickFormatter={(value) => `$${value.toLocaleString()}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                    labelStyle={{ color: '#fff' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-black border border-border/50 p-3 rounded-md">
                            <div className="flex items-center gap-2 mb-2">
                              <img src={data.logo} alt={data.name} className="w-5 h-5 object-contain" />
                              <p className="text-sm" style={{ color: data.color }}>{data.name}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">value: <span className="font-mono-numbers text-white">{data.value}</span></p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  {performanceChartData.map((entry, index) => (
                    <Bar 
                      key={index} 
                      dataKey="value" 
                      fill={entry.color} 
                      fillOpacity={0.8}
                      barSize={60}
                      radius={[4, 4, 0, 0]}
                      onMouseEnter={(data, index, e) => {
                        e.target.setAttribute('fill-opacity', '0.5');
                      }}
                      onMouseLeave={(data, index, e) => {
                        e.target.setAttribute('fill-opacity', '0.8');
                      }}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="border border-border/50 bg-black/40 p-6">
              <h3 className="text-sm mb-4">PERFORMANCE OVER TIME</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="day" stroke="#666" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#666" tick={{ fontSize: 10 }} tickFormatter={(value) => `$${value.toLocaleString()}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="qwen" stroke="#a855f7" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="deepseek" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="claude" stroke="#ff6b35" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="grok" stroke="#10b981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="gemini" stroke="#06b6d4" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="gpt5" stroke="#3b82f6" strokeWidth={1} dot={false} opacity={0.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-border/50 bg-black/40 p-6">
            <h3 className="text-sm mb-4">WINNING MODEL</h3>
            <div className="flex items-center gap-8">
              <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-700/20 flex items-center justify-center p-6">
                <img src={qwenLogo} alt="QWEN3 MAX" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl mb-2 text-[#a855f7]">QWEN3 MAX</h2>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">TOTAL EQUITY</div>
                    <div className="text-lg font-mono-numbers">$16,546</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">ACTIVE POSITIONS</div>
                    <div className="text-lg font-mono-numbers">1</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">WIN RATE</div>
                    <div className="text-lg font-mono-numbers">31.0%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">SHARPE RATIO</div>
                    <div className="text-lg font-mono-numbers">1.203</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-xs text-muted-foreground">
        <p>
          Note: All statistics (except Account Value and P&L) reflect completed trades only. 
          Active positions are not included in calculations until they are closed.
        </p>
      </div>
    </div>
  );
}
