import React from "react";

type Align = "left" | "right" | "center";
type Size = "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";

export const Title = ({
  name,
  align,
  size = "lg",
}: {
  name: string;
  align: Align;
  size?: Size;
}) => {
  return (
    <div className={`text-${align}`}>
      <span className={`text-white-800 font-mono font-bold text-${size} `}>
        {name}
      </span>
    </div>
  );
};
