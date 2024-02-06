import { FieldId, VariantId } from "../index";
import * as varint from "../varint";
import { ByteBuffer } from "./buffer";

export function encodeBool(w: ByteBuffer, value: boolean) {
  w.putU8(value ? 1 : 0);
}

export function encodeU8(w: ByteBuffer, value: number) {
  w.putU8(value);
}

export function encodeI8(w: ByteBuffer, value: number) {
  w.putI8(value);
}

export function encodeU16(w: ByteBuffer, value: number) {
  const encoded = varint.encodeU16(value);
  w.put(encoded);
}

export function encodeI16(w: ByteBuffer, value: number) {
  const encoded = varint.encodeI16(value);
  w.put(encoded);
}

export function encodeU32(w: ByteBuffer, value: number) {
  const encoded = varint.encodeU32(value);
  w.put(encoded);
}

export function encodeI32(w: ByteBuffer, value: number) {
  const encoded = varint.encodeI32(value);
  w.put(encoded);
}

export function encodeU64(w: ByteBuffer, value: bigint) {
  const encoded = varint.encodeU64(value);
  w.put(encoded);
}

export function encodeI64(w: ByteBuffer, value: bigint) {
  const encoded = varint.encodeI64(value);
  w.put(encoded);
}

export function encodeU128(w: ByteBuffer, value: bigint) {
  const encoded = varint.encodeU128(value);
  w.put(encoded);
}

export function encodeI128(w: ByteBuffer, value: bigint) {
  const encoded = varint.encodeI128(value);
  w.put(encoded);
}

export function encodeF32(w: ByteBuffer, value: number) {
  w.putF32(value);
}

export function encodeF64(w: ByteBuffer, value: number) {
  w.putF64(value);
}

export function encodeString(w: ByteBuffer, value: string) {
  const utf8 = new TextEncoder().encode(value);
  encodeU64(w, BigInt(utf8.length));
  w.put(utf8);
}

export function encodeBytes(w: ByteBuffer, value: Uint8Array) {
  encodeU64(w, BigInt(value.length));
  w.put(value);
}

export function encodeVec<T>(
  w: ByteBuffer,
  vec: T[],
  encode: (w: ByteBuffer, v: T) => void,
) {
  encodeU64(w, BigInt(vec.length));
  for (const value of vec) {
    encode(w, value);
  }
}

export function encodeHashMap<K, V>(
  w: ByteBuffer,
  map: Map<K, V>,
  encodeKey: (w: ByteBuffer, k: K) => void,
  encodeValue: (w: ByteBuffer, v: V) => void,
) {
  encodeU64(w, BigInt(map.size));
  for (const [key, value] of map) {
    encodeKey(w, key);
    encodeValue(w, value);
  }
}

export function encodeHashSet<T>(
  w: ByteBuffer,
  set: Set<T>,
  encode: (w: ByteBuffer, v: T) => void,
) {
  encodeU64(w, BigInt(set.size));
  for (const value of set) {
    encode(w, value);
  }
}

export function encodeOption<T>(
  w: ByteBuffer,
  option: T | undefined,
  encode: (w: ByteBuffer, v: T) => void,
) {
  if (option !== undefined) {
    encodeU8(w, 1);
    encode(w, option);
  } else {
    encodeU8(w, 0);
  }
}

export function encodeArray<T>(
  w: ByteBuffer,
  array: T[],
  encode: (w: ByteBuffer, v: T) => void,
) {
  encodeVec(w, array, encode);
}

export function encodeFieldId(w: ByteBuffer, id: FieldId) {
  return encodeU32(w, id.intoRaw());
}

export function sizeVariantId(w: ByteBuffer, id: VariantId) {
  return encodeU32(w, id.value);
}

export function encodeField(
  w: ByteBuffer,
  id: FieldId,
  encode: (w: ByteBuffer) => void,
) {
  encodeFieldId(w, id);
  encode(w);
}

export function sizeFieldOption<T>(
  w: ByteBuffer,
  id: FieldId,
  option: T | undefined,
  encode: (w: ByteBuffer, v: T) => void,
) {
  if (option !== undefined) {
    encodeFieldId(w, id);
    encode(w, option);
  }
}

export interface Encode {
  encode(w: ByteBuffer): void;
}
