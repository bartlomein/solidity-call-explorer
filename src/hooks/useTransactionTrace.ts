import { useEffect, useState } from "react";

type TransactionAction = {
  from: string;
  callType: "call" | "delegatecall" | "staticcall";
  gas: string;
  input: string;
  to: string;
  value: string;
};

type TransactionResult = {
  gasUsed: string;
  output: string;
};

export type TransactionTrace = {
  action: TransactionAction;
  result: TransactionResult;
  subtraces: number;
  traceAddress: number[];
  type: string;
};

export interface TransactionTraceResponse {
  output: string;
  stateDiff: null | any;
  trace: TransactionTrace[];
  vmTrace: null | any;
  transactionHash: string;
}

type UseTraceResult = {
  isLoading: boolean;
  error: Error | null;
  trace: TransactionTraceResponse | null;
};

export function useTransactionTrace(txHash: string): UseTraceResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [trace, setTrace] = useState<TransactionTraceResponse | null>(null);

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
  console.log("error", error);

  return { isLoading, error, trace };
}
