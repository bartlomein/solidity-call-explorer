import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const formatValue = (value) => {
  // Check if value is an address
  if (
    typeof value === "string" &&
    value.startsWith("0x") &&
    value.length === 42
  ) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-mono">
          {value.slice(0, 6)}...{value.slice(-4)}
        </span>
        <button
          onClick={() => navigator.clipboard.writeText(value)}
          className="text-blue-500 hover:text-blue-700 text-xs"
        >
          Copy
        </button>
      </div>
    );
  }

  // Check if value is a large number (potential ETH amount)
  if (typeof value === "string" && !isNaN(value)) {
    const num = Number(value);
    if (num > 1e9) {
      // Over 1 billion - likely wei
      const eth = (num / 1e18).toFixed(4);
      return `${eth} ETH`;
    }
  }

  // Check if value is a topic/hash
  if (
    typeof value === "string" &&
    value.startsWith("0x") &&
    value.length === 66
  ) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-mono">
          {value.slice(0, 6)}...{value.slice(-4)}
        </span>
        <button
          onClick={() => navigator.clipboard.writeText(value)}
          className="text-blue-500 hover:text-blue-700 text-xs"
        >
          Copy
        </button>
      </div>
    );
  }

  return String(value);
};

export const LogItem = ({ log }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatArgs = (args) => {
    return Object.entries(args).map(([key, value]) => (
      <div key={key} className="grid grid-cols-12 gap-2 hover:bg-gray-50 p-1">
        <span className="col-span-1 text-gray-500">{key}:</span>
        <span className="col-span-11">{formatValue(value)}</span>
      </div>
    ));
  };

  return (
    <div className="bg-muted border-l-2 border-gray-200 bg-r rounded-lg">
      <button
        className="flex items-center gap-2 p-2 w-full text-left hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span className="text-blue-600">{log.name}</span>
        <span className="text-gray-400 ml-2 font-mono text-sm">
          {log.signature}
        </span>
      </button>

      {isExpanded && (
        <div className="ml-6 p-2 space-y-3 text-sm">
          <div className="space-y-1">
            <div className="text-gray-500">Topic:</div>
            <div className="font-mono break-all">{log.topic}</div>
          </div>

          <div className="space-y-1">
            <div className="text-gray-500">Args:</div>
            <div className="ml-2 space-y-1">{formatArgs(log.args)}</div>
          </div>

          <div className="space-y-1">
            <div className="text-gray-500">Fragment:</div>
            <div className="ml-2 space-y-1">
              <div>Type: {log.fragment.type}</div>
              <div>Name: {log.fragment.name}</div>
              <div>Anonymous: {String(log.fragment.anonymous)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
