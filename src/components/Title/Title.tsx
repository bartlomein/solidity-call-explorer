import React from "react";

type Align = "left" | "right" | "center";

export const Title = ({ name, align }: { name: string; align: Align }) => {
  return (
    <div className={`text-${align}`}>
      <span className="text-white-800 font-mono font-bold text-lg">{name}</span>
    </div>
  );
};
