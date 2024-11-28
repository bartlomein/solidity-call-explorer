// useTransactionTrace.ts
import { useState, useEffect } from "react";

interface TraceResponse {
  action: {
    callType: string;
    from: string;
    gas: string;
    input: string;
    to: string;
    value: string;
  };
  blockHash: string;
  blockNumber: number;
  result: {
    gasUsed: string;
    output: string;
  };
  subtraces: number;
  traceAddress: number[];
  type: string;
}

interface UseTraceResult {
  isLoading: boolean;
  error: Error | null;
  trace: TraceResponse[] | null;
}

export function useTransactionTrace(txHash: string): UseTraceResult {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [trace, setTrace] = useState<TraceResponse[] | null>(null);

  useEffect(() => {
    const fetchTrace = async () => {
      if (!txHash) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
            body: JSON.stringify({
              id: 1,
              jsonrpc: "2.0",
              method: "trace_replayTransaction",
              params: [txHash, ["trace"]],
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch trace data");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }

        setTrace(data.result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrace();
  }, [txHash]);
  console.log("trace", trace);

  return { isLoading, error, trace };
}
