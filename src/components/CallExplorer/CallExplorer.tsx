"use client";
import React, { useState } from "react";
import TransactionSearch from "../TransactionSearch/TransactionSearch";
import InvocationFlow from "../InvocationFlow/InvocationFlow";

const CallExplorer = () => {
  const [txHash, setTxHash] = useState("");

  const handleTransactionSearch = (hash: string) => {
    setTxHash(hash);
  };

  return (
    <div className="w-full">
      <div className="w-[400px] ml-auto py-4">
        <TransactionSearch onChange={handleTransactionSearch} />
      </div>

      <InvocationFlow hash={txHash} />
    </div>
  );
};

export default CallExplorer;
