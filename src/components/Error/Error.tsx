import React from "react";

export const Error = ({ error }: { error: Error | string }) => {
  return (
    <div className="text-red-500 text-center">
      {JSON.stringify(error.toString())}
    </div>
  );
};
