import React from "react";
import { getEventDetails } from "./utils";
import { Log } from "@/hooks/useEventLogs";
import { Title } from "../Title/Title";

type SingleLogP = {
  isDecoded: boolean;
  name: string;
  blockNumber: string;
  address: string;
  inputs: Record<string, any>[] | null;
  args: Record<any, any> | null;
};
const SingleLog = ({ isDecoded, name, inputs, args }: SingleLogP) => {
  return (
    <div className="bg-gray-800 rounded-sm">
      <div className="text-white-100 font-mono p-3 font-bold">{name}</div>
      {isDecoded ? (
        <div className=" w-full max-w-4xl">
          {inputs &&
            inputs.map((input, index) => (
              <div key={index} className="flex items-center rounded-lg p-3">
                <span className="text-purple-200 font-mono w-28 text-sm">
                  {input.name}
                </span>
                <span className="text-gray-500 font-mono w-24 text-sm">
                  {input.type}
                </span>
                <span className="text-blue-600 font-mono truncate text-sm">
                  {args && args[index]}
                </span>
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
};

export const EventLog = ({ logs }: { logs: Log[] }) => {
  if (logs.length === 0) {
    return (
      <div className="space-y-2 w-full max-w-8xl">
        <Title name="No event logs for this transaction" align="center" />
      </div>
    );
  }
  return (
    <div className="space-y-2 w-full max-w-8xl">
      <div className="m-6">
        <Title name="Event Log" align="center" />
      </div>
      <div className="border rounded  mt-4">
        {logs.map((log, index) => {
          const { isDecoded, name, blockNumber, address, inputs, args } =
            getEventDetails(log);

          return (
            <div key={index} className={`p-4 rounded-md`}>
              <SingleLog
                isDecoded={isDecoded}
                name={name}
                blockNumber={blockNumber}
                address={address}
                inputs={inputs}
                args={args}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
