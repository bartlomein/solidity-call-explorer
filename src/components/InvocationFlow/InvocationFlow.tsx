// TransactionFlow.tsx
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useEventLogs } from "@/hooks/useEventLogs";
import { TransactionFlow } from "./TransactionFlow";
import { useTransactionTrace } from "@/hooks/useTransactionTrace";

const InvocationFlow = ({ hash }: { hash: string }) => {
  const { isLoading, error, receipt, decodedLogs } = useEventLogs(hash);
  const { trace } = useTransactionTrace(hash);
  console.log("trace", trace);
  console.log("logs", decodedLogs);

  return <div className="max-w-4xl mx-auto"></div>;
};

export default InvocationFlow;
