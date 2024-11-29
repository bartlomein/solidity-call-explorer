"use client";
import React, { useState } from "react";
import { TransactionSearch } from "../TransactionSearch/TransactionSearch";
import { InvocationFlow } from "../InvocationFlow/InvocationFlow";

const CallExplorer = () => {
  const [txHash, setTxHash] = useState("");

  return (
    <div className="w-full h-screen">
      <div className="max-w-6xl mx-auto mx-auto flex justify-end ">
        <div className="w-[400px] p-4">
          <TransactionSearch onChange={setTxHash} />
        </div>
      </div>

      <InvocationFlow hash={txHash} />
    </div>
  );
};

export default CallExplorer;
