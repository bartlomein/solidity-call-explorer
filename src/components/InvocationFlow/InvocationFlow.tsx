// TransactionFlow.tsx
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useEventLogs } from "@/hooks/useEventLogs";

import { useTransactionTrace } from "@/hooks/useTransactionTrace";
import TransactionTraceTree from "../TransactionTraceTree /TransactionTraceTree";
import TransactionTraceViewer from "../TransactionTraceTree /TransactionTraceTree";
import EventLog from "../EventLog/EventLog";

const InvocationFlow = ({ hash }: { hash: string }) => {
  const {
    isLoading: isEventsLoading,
    error: logError,
    logs,
  } = useEventLogs(hash);

  const {
    isLoading: isTraceLoading,
    error: traceError,
    trace,
  } = useTransactionTrace(hash);

  console.log("logs", logs);

  return (
    <div className="max-w-6xl mx-auto">
      {isTraceLoading ? <div>Loading Trace</div> : null}
      {trace && !isTraceLoading ? (
        <TransactionTraceViewer data={trace} />
      ) : null}
      {traceError ? (
        <div className="text-red-500">{JSON.stringify(traceError)}</div>
      ) : null}
      {logs && !isEventsLoading ? <EventLog logs={logs} /> : null}
    </div>
  );
};

export default InvocationFlow;
