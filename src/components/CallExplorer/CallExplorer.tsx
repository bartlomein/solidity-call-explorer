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
      <div className="fixed top-4 right-4 w-[400px]">
        <TransactionSearch onChange={handleTransactionSearch} />
      </div>

      <InvocationFlow hash={txHash} />
    </div>
  );
};

export default CallExplorer;
