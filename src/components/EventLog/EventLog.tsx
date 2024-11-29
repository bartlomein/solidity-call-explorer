import React from "react";
import { getEventDetails } from "./utils";
import { Log } from "@/hooks/useEventLogs";

const EventLog = ({ logs }: { logs: Log[] }) => {
  return (
    <div className="p-4 space-y-2 w-full max-w-6xl mx-auto  rounded-lg">
      {logs.map((log, index) => {
        const details = getEventDetails(log);

        return (
          <div
            key={index}
            className={`p-4 rounded-md ${
              details.isDecoded ? "bg-gray-700" : "bg-purple-800"
            }`}
          ></div>
        );
      })}
    </div>
  );
};

export default EventLog;
