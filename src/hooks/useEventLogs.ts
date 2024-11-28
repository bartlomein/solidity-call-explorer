import { useState, useEffect } from "react";
import { ethers } from "ethers";

interface TransactionReceipt {
  blockHash: string;
  blockNumber: string;
  contractAddress: string | null;
  cumulativeGasUsed: string;
  effectiveGasPrice: string;
  from: string;
  gasUsed: string;
  logs: Array<{
    address: string;
    topics: string[];
    data: string;
    blockNumber: string;
    blockHash: string;
    logIndex: string;
  }>;
  logsBloom: string;
  status: string;
  to: string;
  transactionHash: string;
  transactionIndex: string;
  type: string;
}

interface DecodedLog {
  address: string;
  eventName: string;
  signature: string;
  decoded: boolean;
  params: {
    name: string;
    type: string;
    value: any;
    indexed: boolean;
  }[];
  raw: {
    topics: string[];
    data: string;
  };
}
interface UnDecodedLog {
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  logIndex: string;
  removed: boolean;
  decoded: boolean;
}

type Logs = DecodedLog | UnDecodedLog;

interface UseLogParserResult {
  isLoading: boolean;
  error: Error | null;
  logs: Logs[] | null;
  receipt: TransactionReceipt | null;
}

export function useEventLogs(txHash: string): UseLogParserResult {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [decodedLogs, setDecodedLogs] = useState<DecodedLog[] | null>(null);
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);

  useEffect(() => {
    const parseTransactionLogs = async () => {
      if (!txHash) return;

      try {
        // Fetch transaction receipt
        const response = await fetch(
          `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${txHash}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API}`
        );

        const data = await response.json();
        const rec = data.result;
        setReceipt(rec);

        if (!rec || !rec.logs) {
          setDecodedLogs([]);
          return;
        }

        const parsedLogs: any = [];

        // doing this to handle API rate limiting for ABI calls
        for (const log of rec.logs) {
          try {
            await new Promise((resolve) => setTimeout(resolve, 300));

            const abiResponse = await fetch(
              `https://api.etherscan.io/api?module=contract&action=getabi&address=${log.address}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API}`
            );

            const abiData = await abiResponse.json();

            if (abiData.status === "1") {
              const abi = JSON.parse(abiData.result);

              const iface = new ethers.Interface(abi);

              const decoded = iface.parseLog({
                topics: log.topics,
                data: log.data,
              });
              if (!decoded) {
                parsedLogs.push({ ...log, decoded: false });
              } else {
                parsedLogs.push({ ...decoded, decoded: true });
              }
            }
          } catch (e) {
            console.warn("Failed to decode log:", e);
            // Push null for failed decodes to maintain index correlation
            parsedLogs.push(null);
          }
        }

        setDecodedLogs(parsedLogs);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    parseTransactionLogs();
  }, [txHash]);

  return { isLoading, error, decodedLogs, receipt };
}
