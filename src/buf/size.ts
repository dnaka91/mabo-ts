import * as varint from "../varint";

export function sizeBool(_: boolean): number {
  return 1;
}

export function sizeU8(_: number): number {
  return 1;
}

export function sizeI8(_: number): number {
  return 1;
}

export function sizeU16(value: number): number {
  return varint.sizeU16(value);
}

export function sizeI16(value: number): number {
  return varint.sizeI16(value);
}

export function sizeU32(value: number): number {
  return varint.sizeU32(value);
}

export function sizeI32(value: number): number {
  return varint.sizeI32(value);
}

export function sizeU64(value: bigint): number {
  return varint.sizeU64(value);
}

export function sizeI64(value: bigint): number {
  return varint.sizeI64(value);
}

export function sizeU128(value: bigint): number {
  return varint.sizeU128(value);
}

export function sizeI128(value: bigint): number {
  return varint.sizeI128(value);
}

export function sizeF32(value: number): number {
  return 4;
}

export function sizeF64(value: number): number {
  return 8;
}

export function sizeString(value: string): number {
  return sizeU32(value.length) + new TextEncoder().encode(value).length;
}

export function sizeBytes(value: Uint8Array): number {
  return sizeU32(value.length) + value.length;
}

export function sizeVec<T>(vec: T[], size: (v: T) => number): number {
  let sum = sizeU32(vec.length);
  for (const value of vec) {
    sum += size(value);
  }
  return sum;
}

export function sizeHashMap<K, V>(
  map: Map<K, V>,
  sizeKey: (k: K) => number,
  sizeValue: (v: V) => number,
): number {
  let sum = sizeU32(map.size);
  for (const [key, value] of map) {
    sum += sizeKey(key) + sizeValue(value);
  }
  return sum;
}

export function sizeHashSet<T>(set: Set<T>, size: (v: T) => number): number {
  let sum = sizeU32(set.size);
  for (const value of set) {
    sum += size(value);
  }
  return sum;
}

export function sizeOption<T>(
  option: T | undefined,
  size: (v: T) => number,
): number {
  let sum = sizeU8(0);
  if (option !== undefined) {
    sum += size(option);
  }
  return sum;
}

export function sizeArray<T>(array: T[], size: (v: T) => number): number {
  return sizeVec(array, size);
}

export function sizeFieldId(id: number): number {
  return sizeU32(id << 3);
}

export function sizeVariantId(id: number): number {
  return sizeU32(id);
}

export function sizeField(id: number, size: () => number): number {
  return sizeFieldId(id) + size();
}

export function sizeFieldOption<T>(
  id: number,
  option: T | undefined,
  size: (v: T) => number,
): number {
  if (option !== undefined) {
    return sizeFieldId(id) + size(option);
  }
  return 0;
}

export interface Size {
  size(): number;
}
