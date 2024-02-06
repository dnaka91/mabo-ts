import { describe, expect, test } from "bun:test";
import {
  decodeI16,
  decodeI32,
  decodeI64,
  decodeI128,
  decodeU16,
  decodeU32,
  decodeU64,
  decodeU128,
  encodeI16,
  encodeI32,
  encodeI64,
  encodeI128,
  encodeU16,
  encodeU32,
  encodeU64,
  encodeU128,
} from "../src/varint";

function roundtrip<T>(
  value: T,
  encode: (value: T) => Uint8Array,
  decode: (buf: Uint8Array) => [T, number],
): T {
  const buf = encode(value);
  const result = decode(buf);

  return result[0];
}

describe("roundtrip", () => {
  test("u16", () => {
    const max = 2 ** 16 - 1;
    expect(roundtrip(0, encodeU16, decodeU16)).toBe(0);
    expect(roundtrip(1, encodeU16, decodeU16)).toBe(1);
    expect(roundtrip(max, encodeU16, decodeU16)).toBe(max);
  });

  test("u32", () => {
    const max = 2 ** 32 - 1;
    expect(roundtrip(0, encodeU32, decodeU32)).toBe(0);
    expect(roundtrip(1, encodeU32, decodeU32)).toBe(1);
    expect(roundtrip(max, encodeU32, decodeU32)).toBe(max);
  });

  test("u64", () => {
    const max = 2n ** 64n - 1n;
    expect(roundtrip(0n, encodeU64, decodeU64)).toBe(0n);
    expect(roundtrip(1n, encodeU64, decodeU64)).toBe(1n);
    expect(roundtrip(max, encodeU64, decodeU64)).toBe(max);
  });

  test("u128", () => {
    const max = 2n ** 128n - 1n;
    expect(roundtrip(0n, encodeU128, decodeU128)).toBe(0n);
    expect(roundtrip(1n, encodeU128, decodeU128)).toBe(1n);
    expect(roundtrip(max, encodeU128, decodeU128)).toBe(max);
  });

  test("i16", () => {
    const min = (-2) ** 15;
    const max = 2 ** 15 - 1;
    expect(roundtrip(0, encodeI16, decodeI16)).toBe(0);
    expect(roundtrip(1, encodeI16, decodeI16)).toBe(1);
    expect(roundtrip(min, encodeI16, decodeI16)).toBe(min);
    expect(roundtrip(max, encodeI16, decodeI16)).toBe(max);
  });

  test("i32", () => {
    const min = (-2) ** 31;
    const max = 2 ** 31 - 1;
    expect(roundtrip(0, encodeI32, decodeI32)).toBe(0);
    expect(roundtrip(1, encodeI32, decodeI32)).toBe(1);
    expect(roundtrip(min, encodeI32, decodeI32)).toBe(min);
    expect(roundtrip(max, encodeI32, decodeI32)).toBe(max);
  });

  test("i64", () => {
    const min = (-2n) ** 63n;
    const max = 2n ** 63n - 1n;
    expect(roundtrip(0n, encodeI64, decodeI64)).toBe(0n);
    expect(roundtrip(1n, encodeI64, decodeI64)).toBe(1n);
    expect(roundtrip(min, encodeI64, decodeI64)).toBe(min);
    expect(roundtrip(max, encodeI64, decodeI64)).toBe(max);
  });

  test("i128", () => {
    const min = (-2n) ** 127n;
    const max = 2n ** 127n - 1n;
    expect(roundtrip(0n, encodeI128, decodeI128)).toBe(0n);
    expect(roundtrip(1n, encodeI128, decodeI128)).toBe(1n);
    expect(roundtrip(min, encodeI128, decodeI128)).toBe(min);
    expect(roundtrip(max, encodeI128, decodeI128)).toBe(max);
  });
});
