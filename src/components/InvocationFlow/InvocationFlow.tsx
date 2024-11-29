// TransactionFlow.tsx
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useEventLogs } from "@/hooks/useEventLogs";

import { useTransactionTrace } from "@/hooks/useTransactionTrace";
import TransactionTraceTree from "../TransactionTraceTree /TransactionTraceTree";
import TransactionTraceViewer from "../TransactionTraceTree /TransactionTraceTree";

const InvocationFlow = ({ hash }: { hash: string }) => {
  const { isLoading, error, receipt, decodedLogs } = useEventLogs(hash);
  const { trace } = useTransactionTrace(hash);

  return (
    <div className="max-w-10xl mx-auto">
      {trace && <TransactionTraceViewer data={trace} />}
    </div>
  );
};

export default InvocationFlow;
