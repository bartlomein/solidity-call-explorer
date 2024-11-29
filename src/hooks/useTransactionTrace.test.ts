import { renderHook } from "@testing-library/react";
import { act, waitFor } from "@testing-library/react";
import { useTransactionTrace } from "./useTransactionTrace"; // Update with the correct path

describe("useTransactionTrace", () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should initialize with default states", () => {
    const { result } = renderHook(() => useTransactionTrace(""));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.trace).toBeNull();
  });

  it("should not fetch data if txHash is empty", async () => {
    const { result } = renderHook(() => useTransactionTrace(""));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.trace).toBeNull();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should set loading state while fetching", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ result: {} }),
    });

    const { result } = renderHook(() => useTransactionTrace("0x123"));

    await act(async () => {
      expect(result.current.isLoading).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("should handle a successful API response", async () => {
    const mockResponse = {
      result: {
        output: "0x",
        stateDiff: null,
        trace: [
          {
            action: {
              from: "0x123",
              callType: "call",
              gas: "0x5208",
              input: "0x",
              to: "0x456",
              value: "0x0",
            },
            result: {
              gasUsed: "0x5208",
              output: "0x",
            },
            subtraces: 0,
            traceAddress: [],
            type: "call",
          },
        ],
        vmTrace: null,
        transactionHash: "0x123",
      },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const { result } = renderHook(() => useTransactionTrace("0x123"));

    await waitFor(() => {
      expect(result.current.trace).not.toBeNull();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.trace).toEqual(mockResponse.result);
  });

  it("should handle API errors gracefully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({ error: { message: "API error" } }),
    });

    const { result } = renderHook(() => useTransactionTrace("0x123"));

    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.trace).toBeNull();
    expect(result.current.error?.message).toBe("Failed to fetch trace data");
  });

  it("should handle JSON-RPC error responses", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        error: { message: "Trace not available" },
      }),
    });

    const { result } = renderHook(() => useTransactionTrace("0x123"));

    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.trace).toBeNull();
    expect(result.current.error?.message).toBe("Trace not available");
  });
});
