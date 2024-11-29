import { renderHook } from "@testing-library/react";
import { act, waitFor } from "@testing-library/react";
import { useEventLogs } from "./useEventLogs";
import { ethers } from "ethers";

jest.mock("ethers");

describe("useEventLogs", () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should initialize with default states", () => {
    const { result } = renderHook(() => useEventLogs(""));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.logs).toBeNull();
    expect(result.current.receipt).toBeNull();
  });

  it("should set loading state while fetching", async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ result: {} }),
    });

    const { result } = renderHook(() => useEventLogs("0x123"));

    await act(async () => {
      expect(result.current.isLoading).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("should handle successful transaction receipt", async () => {
    const mockReceipt = {
      logs: [
        {
          address: "0xabc",
          topics: ["0x123"],
          data: "0x456",
        },
      ],
    };

    const mockAbi = JSON.stringify([
      {
        type: "event",
        name: "Transfer",
        inputs: [
          { indexed: true, name: "from", type: "address" },
          { indexed: true, name: "to", type: "address" },
          { indexed: false, name: "value", type: "uint256" },
        ],
      },
    ]);

    mockFetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ result: mockReceipt }),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ status: "1", result: mockAbi }),
      });

    ethers.Interface.prototype.parseLog = jest.fn().mockReturnValue({
      name: "Transfer",
      args: ["0xfrom", "0xto", 1000],
    });

    const { result } = renderHook(() => useEventLogs("0x123"));

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.logs).not.toBeNull(); // Ensure logs is not null
    });

    expect(result.current.logs).toHaveLength(1);
    expect(result.current.logs![0].decoded).toBe(true);
    expect(result.current.logs![0].name).toBe("Transfer");
    expect(result.current.logs![0].args).toEqual(["0xfrom", "0xto", 1000]);
  });

  it("should handle fetch errors", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Fetch failed"));

    const { result } = renderHook(() => useEventLogs("0x123"));

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.error).not.toBeNull(); // Ensure error is set
    });

    expect(result.current.error?.message).toBe("Fetch failed");
    expect(result.current.logs).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle empty logs in receipt", async () => {
    const mockReceipt = {
      logs: [],
    };

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ result: mockReceipt }),
    });

    const { result } = renderHook(() => useEventLogs("0x123"));

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.logs).toEqual([]);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
