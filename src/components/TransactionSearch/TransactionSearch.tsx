import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const TransactionSearch = ({
  onChange,
}: {
  onChange: (hash: string) => void;
}) => {
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState(false);

  const validateEthHash = (hash: string): boolean => {
    const ethHashRegex = /^0x([A-Fa-f0-9]{64})$/;
    return ethHashRegex.test(hash);
  };

  const handleSearch = () => {
    const isValid = validateEthHash(txHash);
    setError(!isValid);

    if (isValid) {
      onChange(txHash);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 ">
        <Input
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          placeholder="Enter transaction hash..."
          className={cn(error && "border-red-500")}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {error && (
        <p className="text-sm text-red-500">
          Please enter a valid Ethereum transaction hash
        </p>
      )}
    </div>
  );
};
