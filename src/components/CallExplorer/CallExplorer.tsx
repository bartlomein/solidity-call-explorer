"use client";
import React, { useState } from "react";
import { TransactionSearch } from "../TransactionSearch/TransactionSearch";
import { InvocationFlow } from "../InvocationFlow/InvocationFlow";
import { Title } from "../Title/Title";

export const CallExplorer = () => {
  const [txHash, setTxHash] = useState("");

  return (
    <div className="w-full h-screen">
      <div className="max-w-6xl mx-auto mx-auto flex justify-between">
        <div className="pt-8">
          <Title align="left" name="Transaction Explorer" size="base" />
        </div>
        <div className="w-[400px] py-4">
          <TransactionSearch onChange={setTxHash} />
        </div>
      </div>

      {txHash ? <InvocationFlow hash={txHash} /> : null}
    </div>
  );
};
