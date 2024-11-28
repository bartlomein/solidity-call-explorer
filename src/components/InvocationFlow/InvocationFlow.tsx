// TransactionFlow.tsx
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useLogParser } from "@/hooks/useTransactionDetails";
import { TransactionFlow } from "./TransactionFlow";

const InvocationFlow = ({ hash }: { hash: string }) => {
  console.log("hash", hash);
  const { isLoading, error, receipt, decodedLogs } = useLogParser(hash);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!receipt) {
    return <div>no receipt</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <TransactionFlow receipt={receipt} decodedLogs={decodedLogs || []} />
    </div>
  );
};

export default InvocationFlow;
