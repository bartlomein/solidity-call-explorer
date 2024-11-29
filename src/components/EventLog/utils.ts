import { Log } from "@/hooks/useEventLogs";
import { formatAddress } from "@/utils/eth.utils";

export const getEventDetails = (log: Log) => {
  const isDecoded = log.decoded === true;
  const name = parseEventName(log);
  const blockNumber = log.blockNumber;

  const inputs = isDecoded ? log.fragment.inputs : {};
  const args = isDecoded && "args" in log ? log.args : {};

  return {
    isDecoded,
    name,
    blockNumber,
    address: log.address,
    inputs,
    args,
  };
};

const parseEventName = (log: Log): string => {
  if (log.decoded && log.fragment.name) {
    return log.fragment.name;
  }
  if (log.address) {
    return `Contract Call to ${formatAddress(log.address)}`;
  }
  return "Raw Transaction";
};
