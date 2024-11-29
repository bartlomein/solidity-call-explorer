import { getEventDetails, parseEventName, formatArgs } from "./utils";
import { Log } from "@/hooks/useEventLogs";

describe("getEventDetails", () => {
  const mockDecodedLog: Log = {
    decoded: true,
    fragment: {
      name: "Transfer",
      inputs: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
      ],
    },
    blockNumber: 123456,
    address: "0x123456789",
    args: ["0xsender", "0xreceiver", 1000],
  };

  const mockRawLog: Log = {
    decoded: false,
    blockNumber: 123456,
    address: "0x123456789",
  };

  test("should handle decoded logs correctly", () => {
    const result = getEventDetails(mockDecodedLog);

    expect(result).toEqual({
      isDecoded: true,
      name: "Transfer",
      blockNumber: 123456,
      address: "0x123456789",
      inputs: mockDecodedLog.fragment.inputs,
      args: ["0xsender", "0xreceiver", "1000"],
    });
  });

  test("should handle raw logs correctly", () => {
    const result = getEventDetails(mockRawLog);

    expect(result).toEqual({
      isDecoded: false,
      name: "Contract Call to 0x1234...6789",
      blockNumber: 123456,
      address: "0x123456789",
      inputs: null,
      args: null,
    });
  });

  test("should handle minimal log data", () => {
    const minimalLog: Log = {};
    const result = getEventDetails(minimalLog);

    expect(result).toEqual({
      isDecoded: false,
      name: "Raw Transaction",
      blockNumber: undefined,
      address: undefined,
      inputs: null,
      args: null,
    });
  });

  test("should handle log with no args property", () => {
    const logWithoutArgs: Log = {
      decoded: true,
      fragment: {
        name: "Event",
        inputs: [],
      },
      blockNumber: 123456,
    };

    const result = getEventDetails(logWithoutArgs);
    expect(result.args).toBeNull();
  });
});

describe("parseEventName", () => {
  test("should return fragment name for decoded logs", () => {
    const log: Log = {
      decoded: true,
      fragment: {
        name: "Transfer",
        inputs: [],
      },
    };

    expect(parseEventName(log)).toBe("Transfer");
  });

  test('should return "Raw Transaction" for minimal logs', () => {
    const log: Log = {};
    expect(parseEventName(log)).toBe("Raw Transaction");
  });
});

describe("formatArgs", () => {
  test("should convert all arguments to strings", () => {
    const args = [123, "0x456", true, null];
    const result = formatArgs(args);

    expect(result).toEqual(["123", "0x456", "true", ""]);
  });

  test("should handle empty array", () => {
    expect(formatArgs([])).toEqual([]);
  });

  test("should handle complex objects", () => {
    const complexArg = { foo: "bar" };
    expect(formatArgs([complexArg])).toEqual([complexArg.toString()]);
  });
});
