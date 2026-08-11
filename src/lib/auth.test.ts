import { describe, it, expect, beforeAll } from "vitest";
import { verifyPassword, isWeakPassword } from "./auth";

describe("verifyPassword", () => {
  beforeAll(() => {
    process.env.ADMIN_PASSWORD = "MyS3cur3P@ss!";
  });

  it("accepts correct password", () => {
    expect(verifyPassword("Bearer MyS3cur3P@ss!")).toBe(true);
  });

  it("rejects wrong password", () => {
    expect(verifyPassword("Bearer wrongpassword")).toBe(false);
  });

  it("rejects missing header", () => {
    expect(verifyPassword(null)).toBe(false);
  });

  it("rejects malformed header", () => {
    expect(verifyPassword("Basic xxx")).toBe(false);
  });
});

describe("isWeakPassword", () => {
  it("detects short password", () => {
    expect(isWeakPassword("abc")).toBe(true);
  });

  it("detects common pattern 1234", () => {
    expect(isWeakPassword("1234zoma12345")).toBe(true);
  });

  it("accepts strong password", () => {
    expect(isWeakPassword("MyS3cur3P@ss!")).toBe(false);
  });
});
