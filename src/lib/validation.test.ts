import { describe, it, expect } from "vitest";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s\-\+\(\)]{6,20}$/;

describe("email validation", () => {
  it("accepts valid email", () => {
    expect(emailRegex.test("test@example.com")).toBe(true);
  });

  it("rejects email without @", () => {
    expect(emailRegex.test("testexample.com")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(emailRegex.test("")).toBe(false);
  });
});

describe("phone validation", () => {
  it("accepts valid phone", () => {
    expect(phoneRegex.test("+261 38 54 422 52")).toBe(true);
  });

  it("accepts digits only", () => {
    expect(phoneRegex.test("0385442252")).toBe(true);
  });

  it("rejects too short", () => {
    expect(phoneRegex.test("123")).toBe(false);
  });
});
