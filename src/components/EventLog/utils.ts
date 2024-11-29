import { Log } from "@/hooks/useEventLogs";
import { formatAddress } from "@/utils/eth.utils";

const formatArgs = (args: any[]) => {
  return args.map((arg) => arg.toString());
};

export const getEventDetails = (log: Log) => {
  const isDecoded = log.decoded === true;
  const name = parseEventName(log);
  const blockNumber = log.blockNumber;
  const address = log.address;

  const inputs = isDecoded ? log.fragment.inputs : null;
  const args = isDecoded && "args" in log ? formatArgs(log.args) : null;

  return {
    isDecoded,
    name,
    blockNumber,
    address,
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
