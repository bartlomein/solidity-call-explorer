import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { getCallTypeStyles } from "./utils";
import {
  TransactionTrace,
  TransactionTraceResponse,
} from "@/hooks/useTransactionTrace";

import { formatValue } from "@/utils/eth.utils";
import { Title } from "../Title/Title";

type TransactionTraceViewerP = {
  data: TransactionTraceResponse;
};

type TraceItemP = {
  trace: TransactionTrace;
  allTraces: TransactionTrace[];
  depth?: number;
};

export const TransactionTraceViewer = ({ data }: TransactionTraceViewerP) => {
  const TraceItem = ({ trace, allTraces, depth = 0 }: TraceItemP) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const callType = trace.action.callType.toUpperCase();

    const childTraces = allTraces.filter((t) => {
      if (!t.traceAddress || !trace.traceAddress) return false;
      if (t.traceAddress.length !== trace.traceAddress.length + 1) return false;
      return t.traceAddress
        .slice(0, -1)
        .every((addr, i) => addr === trace.traceAddress[i]);
    });

    return (
      <div className="font-mono text-sm">
        <div
          className="flex items-center gap-2  p-1 rounded cursor-pointer"
          style={{ marginLeft: `${depth * 20}px` }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {childTraces.length > 0 && (
            <div className="w-4">
              {isExpanded ? (
                <ChevronDown size={16} className="text-gray-500" />
              ) : (
                <ChevronRight size={16} className="text-gray-500" />
              )}
            </div>
          )}
          {childTraces.length === 0 && <div className="w-4" />}

          <div className="flex items-center gap-1">
            <span className="text-blue-500">→</span>
            <span className={getCallTypeStyles(callType)}>{callType}</span>
          </div>

          {trace.action.value && trace.action.value !== "0x0" && (
            <div className="text-gray-600">
              value: {formatValue(trace.action.value)} ETH
            </div>
          )}

          <div className="text-sky-600 text-xs truncate">
            {trace.action.from} → {trace.action.to}
          </div>

          {trace.result && (
            <div className="text-gray-500 text-xs">
              Gas: {parseInt(trace.result.gasUsed, 16)}
            </div>
          )}
        </div>

        {isExpanded && childTraces.length > 0 && (
          <div className="ml-4">
            {childTraces.map((childTrace, index) => (
              <TraceItem
                key={childTrace.traceAddress.join("-")}
                trace={childTrace}
                allTraces={allTraces}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-8xl mx-auto rounded-lg shadow">
      <Title name="Call Trace Log" align="center" />
      <div className="border rounded p-3 mt-4">
        {data.trace && data.trace.length > 0 && (
          <TraceItem trace={data.trace[0]} allTraces={data.trace} />
        )}
      </div>
    </div>
  );
};
