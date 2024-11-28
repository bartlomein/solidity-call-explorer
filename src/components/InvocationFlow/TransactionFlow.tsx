import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ethers } from "ethers";
import { LogItem } from "./LogItem";

export const TransactionFlow = ({ receipt, decodedLogs }: any) => {
  const [showLogs, setShowLogs] = useState(true);

  return (
    <div className="space-y-4 p-4">
      <div className="rounded-lg bg-white shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Transaction Receipt</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Status</p>
            <p
              className={`font-medium ${
                receipt.status === "0x1" ? "text-green-600" : "text-red-600"
              }`}
            >
              {receipt.status === "0x1" ? "Success" : "Failed"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Block Number</p>
            <p className="font-mono">{parseInt(receipt.blockNumber, 16)}</p>
          </div>
          <div>
            <p className="text-gray-500">From</p>
            <p className="font-mono truncate">{receipt.from}</p>
          </div>
          <div>
            <p className="text-gray-500">To</p>
            <p className="font-mono truncate">{receipt.to}</p>
          </div>
          <div>
            <p className="text-gray-500">Gas Used</p>
            <p className="font-mono">
              {ethers.formatUnits(receipt.gasUsed, 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow p-4">
        <button
          className="flex items-center gap-2 mb-4"
          onClick={() => setShowLogs(!showLogs)}
        >
          {showLogs ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <h2 className="text-lg font-semibold">
            Events ({decodedLogs.length})
          </h2>
        </button>

        {showLogs && (
          <div className="space-y-2">
            {decodedLogs?.map((log, index) => (
              <LogItem key={index} log={log} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
