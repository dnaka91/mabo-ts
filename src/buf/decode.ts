import { FieldId, VariantId } from "../index";
import * as varint from "../varint";
import { ByteBuffer } from "./buffer";

export interface Decode {
  decode(r: ByteBuffer): ThisType<this>;
}

export function decodeBool(r: ByteBuffer): boolean {
  return r.getU8() !== 0;
}

export function decodeU8(r: ByteBuffer): number {
  return r.getU8();
}

export function decodeI8(r: ByteBuffer): number {
  return r.getI8();
}

export function decodeU16(r: ByteBuffer): number {
  const [value, consumed] = varint.decodeU16(r.buffer());
  r.advance(consumed);
  return value;
}

export function decodeI16(r: ByteBuffer): number {
  const [value, consumed] = varint.decodeI16(r.buffer());
  r.advance(consumed);
  return value;
}

export function decodeU32(r: ByteBuffer): number {
  const [value, consumed] = varint.decodeU32(r.buffer());
  r.advance(consumed);
  return value;
}

export function decodeI32(r: ByteBuffer): number {
  const [value, consumed] = varint.decodeI32(r.buffer());
  r.advance(consumed);
  return value;
}

export function decodeU64(r: ByteBuffer): bigint {
  const [value, consumed] = varint.decodeU64(r.buffer());
  r.advance(consumed);
  return value;
}

export function decodeI64(r: ByteBuffer): bigint {
  const [value, consumed] = varint.decodeI64(r.buffer());
  r.advance(consumed);
  return value;
}

export function decodeU128(r: ByteBuffer): bigint {
  const [value, consumed] = varint.decodeU128(r.buffer());
  r.advance(consumed);
  return value;
}

export function decodeI128(r: ByteBuffer): bigint {
  const [value, consumed] = varint.decodeI128(r.buffer());
  r.advance(consumed);
  return value;
}

export function decodeF32(r: ByteBuffer): number {
  return r.getF32();
}

export function decodeF64(r: ByteBuffer): number {
  return r.getF64();
}

export function decodeString(r: ByteBuffer): string {
  return new TextDecoder().decode(decodeBytes(r));
}

export function decodeBytes(r: ByteBuffer): Uint8Array {
  const len = decodeU64(r);
  return r.get(Number(len));
}

export function decodeVec<T>(r: ByteBuffer, decode: (r: ByteBuffer) => T): T[] {
  const len = decodeU64(r);
  const vec = new Array<T>();

  return vec;
}

export function decodeFieldId(r: ByteBuffer): FieldId {
  return FieldId.fromRaw(decodeU32(r));
}

export function decodeVariantId(r: ByteBuffer): VariantId {
  return new VariantId(decodeU32(r));
}

export function skipField(r: ByteBuffer, id: FieldId) {}
