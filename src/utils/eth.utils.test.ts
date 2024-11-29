import { formatValue, formatAddress } from "./eth.utils";

describe("formatValue", () => {
  test('should return "0.0000" for null or undefined input', () => {
    expect(formatValue(null as unknown as string)).toBe("0.0000");
    expect(formatValue(undefined as unknown as string)).toBe("0.0000");
  });

  test('should return "0.0000" for "0x0"', () => {
    expect(formatValue("0x0")).toBe("0.0000");
  });

  test("should format numbers to 4 decimal places", () => {
    expect(formatValue("123.456789")).toBe("123.4568");
    expect(formatValue("0.123")).toBe("0.1230");
    expect(formatValue("1000")).toBe("1000.0000");
  });

  test("should handle integer inputs", () => {
    expect(formatValue("42")).toBe("42.0000");
    expect(formatValue("0")).toBe("0.0000");
  });
});

describe("formatAddress", () => {
  test("should return empty string for null or undefined input", () => {
    expect(formatAddress(null as unknown as string)).toBe("");
    expect(formatAddress(undefined as unknown as string)).toBe("");
  });

  test("should format ethereum addresses correctly", () => {
    const address = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
    expect(formatAddress(address)).toBe("0x742d...f44e");
  });

  test("should handle short addresses", () => {
    expect(formatAddress("0x123")).toBe("0x123...x123");
    expect(formatAddress("abcd")).toBe("abcd...abcd");
  });

  test("should handle minimum length addresses", () => {
    expect(formatAddress("12")).toBe("12...12");
  });

  test("should handle empty string", () => {
    expect(formatAddress("")).toBe("");
  });
});
