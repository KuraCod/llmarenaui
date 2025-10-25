import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const trades = [
  {
    model: "Gemini 2.5 Pro",
    modelColor: "#06b6d4",
    type: "short",
    asset: "ETH",
    price: "$3,872.1 → $3,937.4",
    quantity: "-1.27",
    notional: "$4,918 → $5,000",
    holdingTime: "4H 57M",
    pnl: "-$86.90",
    time: "10/24, 5:33 PM",
  },
  {
    model: "Gemini 2.5 Pro",
    modelColor: "#06b6d4",
    type: "long",
    asset: "DOGE",
    price: "$0.19538 → $0.1945",
    quantity: "11039.00",
    notional: "$2,157 → $2,147",
    holdingTime: "2H 31M",
    pnl: "-$11.33",
    time: "10/24, 12:53 PM",
  },
  {
    model: "Gemini 2.5 Pro",
    modelColor: "#06b6d4",
    type: "long",
    asset: "SOL",
    price: "$189.98 → $190.1",
    quantity: "21.31",
    notional: "$4,048 → $4,051",
    holdingTime: "18H 9M",
    pnl: "-$0.43",
    time: "10/24, 12:53 PM",
  },
  {
    model: "Gemini 2.5 Pro",
    modelColor: "#06b6d4",
    type: "short",
    asset: "BNB",
    price: "$1,100 → $1,099.4",
    quantity: "-2.74",
    notional: "$3,014 → $3,012",
    holdingTime: "6M",
    pnl: "-$0.57",
    time: "10/24, 12:33 PM",
  },
];

export function CompletedTrades() {
  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-sm">FILTER:</h2>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-transparent border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ALL MODELS</SelectItem>
              <SelectItem value="gemini">GEMINI 2.5 PRO</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <h2 className="text-sm">Showing Last 100 Trades</h2>
      </div>

      <div className="space-y-4">
        {trades.map((trade, idx) => (
          <div
            key={idx}
            className="border border-border/50 p-4 space-y-2 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <span style={{ color: trade.modelColor }}>{trade.model}</span>
                <span>completed a</span>
                <span
                  className={
                    trade.type === "long" ? "text-green-500" : "text-red-500"
                  }
                >
                  {trade.type}
                </span>
                <span>trade on</span>
                <span className="inline-flex items-center gap-1">
                  <span>{trade.asset}!</span>
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{trade.time}</span>
            </div>

            <div className="space-y-1 text-sm pl-6">
              <div>
                Price: <span className="font-mono-numbers">{trade.price}</span>
              </div>
              <div>
                Quantity:{" "}
                <span className="font-mono-numbers">{trade.quantity}</span>
              </div>
              <div>
                Notional:{" "}
                <span className="font-mono-numbers">{trade.notional}</span>
              </div>
              <div>
                Holding time:{" "}
                <span className="font-mono-numbers">{trade.holdingTime}</span>
              </div>
              <div
                className={
                  trade.pnl.startsWith("-") ? "text-red-500" : "text-green-500"
                }
              >
                NET P&L:{" "}
                <span className="font-mono-numbers">{trade.pnl}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
