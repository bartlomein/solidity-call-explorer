// TransactionFlow.tsx
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useLogParser } from "@/hooks/useTransactionDetails";

// API Functions

// Component
const TransactionFlow = ({ hash }: { hash: string }) => {
  const { decodedLogs, receipt } = useLogParser(hash);
  console.log({ decodedLogs, receipt });

  return <div className=""></div>;
};

export default TransactionFlow;
