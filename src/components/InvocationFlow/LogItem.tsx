// LogItem.tsx
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  type DecodedLog,
  type UnDecodedLog,
} from "@/hooks/useTransactionDetails";

type LogItemProps = {
  log: DecodedLog | UnDecodedLog;
};

const isDecodedLog = (log: DecodedLog | UnDecodedLog): log is DecodedLog => {
  return "decoded" in log && log.decoded === true;
};

const formatValue = (value: any) => {
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

const DecodedLogContent = ({ log }: { log: DecodedLog }) => {
  const formatArgs = (args: any) => {
    return Object.entries(args).map(([key, value]) => (
      <div key={key} className="grid grid-cols-12 gap-2 hover:bg-muted p-1">
        <span className="col-span-1 text-muted-foreground">{key}:</span>
        <span className="col-span-11">{formatValue(value)}</span>
      </div>
    ));
  };

  return (
    <div className="ml-6 p-2 space-y-3 text-sm">
      <div className="space-y-1">
        <div className="text-muted-foreground">Event:</div>
        <div className="font-mono break-all">{log.eventName}</div>
      </div>

      <div className="space-y-1">
        <div className="text-muted-foreground">Parameters:</div>
        <div className="ml-2 space-y-1">
          {log.params.map((param, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-2 hover:bg-muted p-1"
            >
              <span className="col-span-3 text-muted-foreground">
                {param.name} ({param.type}):
              </span>
              <span className="col-span-9">{formatValue(param.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UndecodedLogContent = ({ log }: { log: UnDecodedLog }) => {
  return (
    <div className="ml-6 p-2 space-y-3 text-sm">
      Log item could not be decoded
      <div className="space-y-1">
        <div className="text-muted-foreground">Topics:</div>
        <div className="ml-2 space-y-1">
          {log.topics.map((topic, index) => (
            <div key={index} className="break-all font-mono">
              {formatValue(topic)}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-muted-foreground">Data:</div>
        <div className="font-mono break-all">{formatValue(log.data)}</div>
      </div>
      <div className="space-y-1">
        <div className="text-muted-foreground">Contract:</div>
        <div className="font-mono">{formatValue(log.address)}</div>
      </div>
    </div>
  );
};

export const LogItem = ({ log }: LogItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDecoded = isDecodedLog(log);

  return (
    <div className="bg-card border-l-2 border-border rounded-lg">
      <button
        className="flex items-center gap-2 p-2 w-full text-left hover:bg-muted/50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span className="text-primary">
          {isDecoded ? log.eventName : `Event at ${log.address}`}
        </span>
        {isDecoded && (
          <span className="text-muted-foreground ml-2 font-mono text-sm">
            {log.signature}
          </span>
        )}
      </button>

      {isExpanded &&
        (isDecoded ? (
          <DecodedLogContent log={log} />
        ) : (
          <UndecodedLogContent log={log} />
        ))}
    </div>
  );
};
