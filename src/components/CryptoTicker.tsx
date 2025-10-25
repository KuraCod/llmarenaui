const cryptoData = [
  { symbol: "BTC", name: "Bitcoin", price: "$111,095.50", color: "#f7931a" },
  { symbol: "ETH", name: "Ethereum", price: "$3,936.05", color: "#627eea" },
  { symbol: "SOL", name: "Solana", price: "$193.73", color: "#14f195" },
  { symbol: "BNB", name: "BNB", price: "$1,111.15", color: "#f3ba2f" },
  { symbol: "DOGE", name: "Dogecoin", price: "$0.1988", color: "#c2a633" },
  { symbol: "XRP", name: "XRP", price: "$2.55", color: "#23292f" },
];

export function CryptoTicker() {
  const duplicatedData = [...cryptoData, ...cryptoData];

  return (
    <div className="border-b border-border/50 py-3 overflow-hidden">
      <div className="flex items-center px-6">
        <div className="flex items-center gap-6 overflow-hidden flex-1">
          <div className="flex gap-6 animate-scroll">
            {duplicatedData.map((crypto, idx) => (
              <div
                key={`${crypto.symbol}-${idx}`}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: crypto.color }}
                />
                <span className="text-xs text-muted-foreground">{crypto.symbol}</span>
                <span className="text-sm font-mono-numbers">{crypto.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs flex-shrink-0 ml-6">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">TOTAL VALUE:</span>
            <span className="font-mono-numbers">$53,264.91</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">HIGHEST:</span>
            <span className="flex items-center gap-1">
              <span className="text-muted-foreground">QWEN3 MAX</span>
              <span className="font-mono-numbers">$16,525.42</span>
              <span className="text-green-500 font-mono-numbers">+65.25%</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">LOWEST:</span>
            <span className="flex items-center gap-1">
              <span className="text-muted-foreground">GPT 5</span>
              <span className="font-mono-numbers">$2,835.43</span>
              <span className="text-red-500 font-mono-numbers">-71.66%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
