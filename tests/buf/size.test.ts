import { describe, expect, test } from "bun:test";
import { varint, zigzag } from "../../src";
import * as size from "../../src/buf/size";

const maxU8 = 2 ** 8 - 1;
const maxU16 = 2 ** 16 - 1;
const maxU32 = 2 ** 32 - 1;
const maxU64 = 2n ** 64n - 1n;
const maxU128 = 2n ** 128n - 1n;

const minI8 = (-2) ** 7;
const maxI8 = 2 ** 7 - 1;
const minI16 = (-2) ** 15;
const maxI16 = 2 ** 15 - 1;
const minI32 = (-2) ** 31;
const maxI32 = 2 ** 31 - 1;
const minI64 = (-2n) ** 63n;
const maxI64 = 2n ** 63n - 1n;
const minI128 = (-2n) ** 127n;
const maxI128 = 2n ** 127n - 1n;

describe("bool", () => {
  test("bool", () => {
    expect(size.sizeBool(false)).toBe(1);
    expect(size.sizeBool(true)).toBe(1);
  });
});

describe("int", () => {
  test("u8", () => {
    expect(size.sizeU8(0)).toBe(1);
    expect(size.sizeU8(maxU8)).toBe(1);
  });

  test("u16", () => {
    expect(size.sizeU16(0)).toBe(1);
    expect(size.sizeU16(maxU8)).toBe(2);
    expect(size.sizeU16(maxU16)).toBe(3);
  });

  test("u32", () => {
    expect(size.sizeU32(0)).toBe(1);
    expect(size.sizeU32(maxU8)).toBe(2);
    expect(size.sizeU32(maxU16)).toBe(3);
    expect(size.sizeU32(maxU32)).toBe(5);
  });

  test("u64", () => {
    expect(size.sizeU64(0n)).toBe(1);
    expect(size.sizeU64(BigInt(maxU8))).toBe(2);
    expect(size.sizeU64(BigInt(maxU16))).toBe(3);
    expect(size.sizeU64(BigInt(maxU32))).toBe(5);
    expect(size.sizeU64(maxU64)).toBe(10);
  });

  test("u128", () => {
    expect(size.sizeU128(0n)).toBe(1);
    expect(size.sizeU128(BigInt(maxU8))).toBe(2);
    expect(size.sizeU128(BigInt(maxU16))).toBe(3);
    expect(size.sizeU128(BigInt(maxU32))).toBe(5);
    expect(size.sizeU128(maxU64)).toBe(10);
    expect(size.sizeU128(maxU128)).toBe(19);
  });

  test("i8", () => {
    expect(size.sizeI8(minI8)).toBe(1);
    expect(size.sizeI8(-1)).toBe(1);
    expect(size.sizeI8(0)).toBe(1);
    expect(size.sizeI8(1)).toBe(1);
    expect(size.sizeI8(maxI8)).toBe(1);
  });

  test("i16", () => {
    expect(size.sizeI16(minI16)).toBe(3);
    expect(size.sizeI16(minI8)).toBe(2);
    expect(size.sizeI16(-1)).toBe(1);
    expect(size.sizeI16(0)).toBe(1);
    expect(size.sizeI16(1)).toBe(1);
    expect(size.sizeI16(maxI8)).toBe(2);
    expect(size.sizeI16(maxI16)).toBe(3);
  });

  test("i32", () => {
    expect(size.sizeI32(minI32)).toBe(5);
    expect(size.sizeI32(minI16)).toBe(3);
    expect(size.sizeI32(minI8)).toBe(2);
    expect(size.sizeI32(-1)).toBe(1);
    expect(size.sizeI32(0)).toBe(1);
    expect(size.sizeI32(1)).toBe(1);
    expect(size.sizeI32(maxI8)).toBe(2);
    expect(size.sizeI32(maxI16)).toBe(3);
    expect(size.sizeI32(maxI32)).toBe(5);
  });

  test("i64", () => {
    expect(size.sizeI64(minI64)).toBe(10);
    expect(size.sizeI64(BigInt(minI32))).toBe(5);
    expect(size.sizeI64(BigInt(minI16))).toBe(3);
    expect(size.sizeI64(BigInt(minI8))).toBe(2);
    expect(size.sizeI64(-1n)).toBe(1);
    expect(size.sizeI64(0n)).toBe(1);
    expect(size.sizeI64(1n)).toBe(1);
    expect(size.sizeI64(BigInt(maxI8))).toBe(2);
    expect(size.sizeI64(BigInt(maxI16))).toBe(3);
    expect(size.sizeI64(BigInt(maxI32))).toBe(5);
    expect(size.sizeI64(maxI64)).toBe(10);
  });

  test("i128", () => {
    expect(size.sizeI128(minI128)).toBe(19);
    expect(size.sizeI128(minI64)).toBe(10);
    expect(size.sizeI128(BigInt(minI32))).toBe(5);
    expect(size.sizeI128(BigInt(minI16))).toBe(3);
    expect(size.sizeI128(BigInt(minI8))).toBe(2);
    expect(size.sizeI128(-1n)).toBe(1);
    expect(size.sizeI128(0n)).toBe(1);
    expect(size.sizeI128(1n)).toBe(1);
    expect(size.sizeI128(BigInt(maxI8))).toBe(2);
    expect(size.sizeI128(BigInt(maxI16))).toBe(3);
    expect(size.sizeI128(BigInt(maxI32))).toBe(5);
    expect(size.sizeI128(maxI64)).toBe(10);
    expect(size.sizeI128(maxI128)).toBe(19);
  });
});

describe("float", () => {
  test("f32", () => {
    expect(size.sizeF32(-3.40282347e38)).toBe(4);
    expect(size.sizeF32(0.0)).toBe(4);
    expect(size.sizeF32(3.40282347e38)).toBe(4);
  });

  test("f64", () => {
    expect(size.sizeF64(-1.7976931348623157e308)).toBe(8);
    expect(size.sizeF64(0.0)).toBe(8);
    expect(size.sizeF64(1.7976931348623157e308)).toBe(8);
  });
});

describe("string", () => {
  test("ascii", () => {
    expect(size.sizeString("")).toBe(1);
    expect(size.sizeString("test")).toBe(5);
  });

  test("utf-8", () => {
    expect(size.sizeString("!")).toBe(2);
    expect(size.sizeString("©")).toBe(3);
    expect(size.sizeString("✌")).toBe(4);
    expect(size.sizeString("🌅")).toBe(5);
  });
});

describe("vec", () => {
  test("empty", () => {
    expect(size.sizeVec([], size.sizeU32)).toBe(1);
  });

  test("ints", () => {
    expect(size.sizeVec([1], size.sizeU32)).toBe(2);
    expect(size.sizeVec([1, 2], size.sizeU32)).toBe(3);
    expect(size.sizeVec([1, 2, 3], size.sizeU32)).toBe(4);
  });

  test("strings", () => {
    expect(size.sizeVec(["he"], size.sizeString)).toBe(4);
    expect(size.sizeVec(["llo"], size.sizeString)).toBe(5);
    expect(size.sizeVec(["!"], size.sizeString)).toBe(3);
    expect(size.sizeVec(["he", "llo", "!"], size.sizeString)).toBe(10);
  });
});

describe("hash_map", () => {
  test("empty", () => {
    expect(size.sizeHashMap(new Map(), size.sizeU32, size.sizeU32)).toBe(1);
  });

  test("ints", () => {
    expect(
      size.sizeHashMap(new Map([[1, 1]]), size.sizeU32, size.sizeU32),
    ).toBe(3);
    expect(
      size.sizeHashMap(
        new Map([
          [1, 1],
          [2, 2],
        ]),
        size.sizeU32,
        size.sizeU32,
      ),
    ).toBe(5);
    expect(
      size.sizeHashMap(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        size.sizeU32,
        size.sizeU32,
      ),
    ).toBe(7);
  });

  test("strings", () => {
    expect(
      size.sizeHashMap(new Map([[1, "he"]]), size.sizeU32, size.sizeString),
    ).toBe(5);
    expect(
      size.sizeHashMap(new Map([[1, "llo"]]), size.sizeU32, size.sizeString),
    ).toBe(6);
    expect(
      size.sizeHashMap(new Map([[1, "!"]]), size.sizeU32, size.sizeString),
    ).toBe(4);
    expect(
      size.sizeHashMap(
        new Map([
          [1, "he"],
          [2, "llo"],
          [3, "!"],
        ]),
        size.sizeU32,
        size.sizeString,
      ),
    ).toBe(13);
  });
});

describe("hash_set", () => {
  test("empty", () => {
    expect(size.sizeHashSet(new Set([]), size.sizeU32)).toBe(1);
  });

  test("ints", () => {
    expect(size.sizeHashSet(new Set([1]), size.sizeU32)).toBe(2);
    expect(size.sizeHashSet(new Set([1, 2]), size.sizeU32)).toBe(3);
    expect(size.sizeHashSet(new Set([1, 2, 3]), size.sizeU32)).toBe(4);
    expect(size.sizeHashSet(new Set([1, 2, 2]), size.sizeU32)).toBe(3);
    expect(size.sizeHashSet(new Set([1, 1, 1]), size.sizeU32)).toBe(2);
  });

  test("strings", () => {
    expect(size.sizeHashSet(new Set(["he"]), size.sizeString)).toBe(4);
    expect(size.sizeHashSet(new Set(["llo"]), size.sizeString)).toBe(5);
    expect(size.sizeHashSet(new Set(["!"]), size.sizeString)).toBe(3);
    expect(size.sizeHashSet(new Set(["he", "llo", "!"]), size.sizeString)).toBe(
      10,
    );
    expect(size.sizeHashSet(new Set(["!", "!", "!"]), size.sizeString)).toBe(3);
  });
});

describe("option", () => {
  test("none", () => {
    expect(size.sizeOption(undefined, size.sizeU32)).toBe(1);
  });

  test("some", () => {
    expect(size.sizeOption(1, size.sizeU32)).toBe(2);
  });
});

describe("array", () => {
  // Same as the vec, so nothing really to test do here
});
