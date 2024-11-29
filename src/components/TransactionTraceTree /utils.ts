export function getCallTypeStyles(callType: string): string {
  const baseClasses = "px-2 py-0.5 rounded text-xs";

  const callTypeStyles: any = {
    DELEGATECALL: "bg-purple-900/50 text-purple-400",
    STATICCALL: "bg-green-900/50 text-green-400",
    CALL: "bg-blue-900/50 text-blue-400",
  };

  return `${baseClasses} ${
    callTypeStyles[callType] || "bg-gray-900/50 text-gray-400"
  }`;
}
