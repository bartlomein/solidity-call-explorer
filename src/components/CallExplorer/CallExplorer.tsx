"use client";
import React, { useState } from "react";
import TransactionSearch from "../TransactionSearch/TransactionSearch";

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
      {/* Rest of content */}
      <div className="mt-20">{txHash && <p>Transaction Hash: {txHash}</p>}</div>
    </div>
  );
};

export default CallExplorer;
