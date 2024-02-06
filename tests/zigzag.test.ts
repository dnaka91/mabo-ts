import { describe, expect, test } from "bun:test";
import {
  decodeI16,
  decodeI32,
  decodeI64,
  decodeI128,
  encodeI16,
  encodeI32,
  encodeI64,
  encodeI128,
} from "../src/zigzag";

describe("roundtrip", () => {
  test("i16", () => {
    const min = (-2) ** 15;
    const max = 2 ** 15 - 1;
    expect(decodeI16(encodeI16(0))).toBe(0);
    expect(decodeI16(encodeI16(1))).toBe(1);
    expect(decodeI16(encodeI16(min))).toBe(min);
    expect(decodeI16(encodeI16(max))).toBe(max);
  });

  test("i32", () => {
    const min = (-2) ** 31;
    const max = 2 ** 31 - 1;
    expect(decodeI32(encodeI32(0))).toBe(0);
    expect(decodeI32(encodeI32(1))).toBe(1);
    expect(decodeI32(encodeI32(min))).toBe(min);
    expect(decodeI32(encodeI32(max))).toBe(max);
  });

  test("i64", () => {
    const min = (-2n) ** 63n;
    const max = 2n ** 63n - 1n;
    expect(decodeI64(encodeI64(0n))).toBe(0n);
    expect(decodeI64(encodeI64(1n))).toBe(1n);
    expect(decodeI64(encodeI64(min))).toBe(min);
    expect(decodeI64(encodeI64(max))).toBe(max);
  });

  test("i128", () => {
    const min = (-2n) ** 127n;
    const max = 2n ** 127n - 1n;
    expect(decodeI128(encodeI128(0n))).toBe(0n);
    expect(decodeI128(encodeI128(1n))).toBe(1n);
    expect(decodeI128(encodeI128(min))).toBe(min);
    expect(decodeI128(encodeI128(max))).toBe(max);
  });
});
