import * as zigzag from "./zigzag";

export function encodeU16(v: number): Uint8Array {
  let value = v >>> 0;
  const buf = new Uint8Array(3);

  for (let i = 0; i < buf.length; i++) {
    buf[i] = value & 0xff;
    if (value < 128) {
      return buf.slice(0, i + 1);
    }

    buf[i] |= 0x80;
    value >>>= 7;
  }

  return buf;
}

export function decodeU16(v: Uint8Array): [number, number] {
  let value = 0;

  for (let i = 0; i < Math.min(v.length, 3); i++) {
    value |= (v[i] & 0x7f) << (7 * i);

    if ((v[i] & 0x80) === 0) {
      return [value >>> 0, i + 1];
    }
  }

  throw new Error("missing integer end marker");
}

export function sizeU16(v: number): number {
  if (v === 0) {
    return 1;
  }
  return Math.floor((Math.log2(v >>> 0) + 7) / 7);
}

export function encodeU32(v: number): Uint8Array {
  let value = v >>> 0;
  const buf = new Uint8Array(5);

  for (let i = 0; i < buf.length; i++) {
    buf[i] = value & 0xff;
    if (value < 128) {
      return buf.slice(0, i + 1);
    }

    buf[i] |= 0x80;
    value >>>= 7;
  }

  return buf;
}

export function decodeU32(v: Uint8Array): [number, number] {
  let value = 0;

  for (let i = 0; i < Math.min(v.length, 5); i++) {
    value |= (v[i] & 0x7f) << (7 * i);

    if ((v[i] & 0x80) === 0) {
      return [value >>> 0, i + 1];
    }
  }

  throw new Error("missing integer end marker");
}

export function sizeU32(v: number): number {
  if (v === 0) {
    return 1;
  }
  return Math.floor((Math.log2(v >>> 0) + 7) / 7);
}

export function encodeU64(v: bigint): Uint8Array {
  let value = v;
  const buf = new Uint8Array(10);

  for (let i = 0; i < buf.length; i++) {
    buf[i] = Number(value & 0xffn);
    if (value < 128n) {
      return buf.slice(0, i + 1);
    }

    buf[i] |= 0x80;
    value >>= 7n;
  }

  return buf;
}

export function decodeU64(v: Uint8Array): [bigint, number] {
  let value = 0n;

  for (let i = 0; i < Math.min(v.length, 10); i++) {
    value |= BigInt(v[i] & 0x7f) << BigInt(7 * i);

    if ((v[i] & 0x80) === 0) {
      return [value, i + 1];
    }
  }

  throw new Error("missing integer end marker");
}

export function sizeU64(v: bigint): number {
  if (v === 0n) {
    return 1;
  }
  return Math.floor((bigintLog2(v) + 7) / 7);
}

export function encodeU128(v: bigint): Uint8Array {
  let value = v;
  const buf = new Uint8Array(19);

  for (let i = 0; i < buf.length; i++) {
    buf[i] = Number(value & 0xffn);
    if (value < 128n) {
      return buf.slice(0, i + 1);
    }

    buf[i] |= 0x80;
    value >>= 7n;
  }

  return buf;
}

export function decodeU128(v: Uint8Array): [bigint, number] {
  let value = 0n;

  for (let i = 0; i < Math.min(v.length, 19); i++) {
    value |= BigInt(v[i] & 0x7f) << BigInt(7 * i);

    if ((v[i] & 0x80) === 0) {
      return [value, i + 1];
    }
  }

  throw new Error("missing integer end marker");
}

export function sizeU128(v: bigint): number {
  if (v === 0n) {
    return 1;
  }
  return Math.floor((bigintLog2(v) + 7) / 7);
}

export function encodeI16(v: number): Uint8Array {
  return encodeU16(zigzag.encodeI16(v));
}

export function decodeI16(v: Uint8Array): [number, number] {
  const [value, read] = decodeU16(v);
  return [zigzag.decodeI16(value), read];
}

export function sizeI16(v: number): number {
  return sizeU16(zigzag.encodeI16(v));
}

export function encodeI32(v: number): Uint8Array {
  return encodeU32(zigzag.encodeI32(v));
}

export function decodeI32(v: Uint8Array): [number, number] {
  const [value, read] = decodeU32(v);
  return [zigzag.decodeI32(value), read];
}

export function sizeI32(v: number): number {
  return sizeU32(zigzag.encodeI32(v));
}

export function encodeI64(v: bigint): Uint8Array {
  return encodeU64(zigzag.encodeI64(v));
}

export function decodeI64(v: Uint8Array): [bigint, number] {
  const [value, read] = decodeU64(v);
  return [zigzag.decodeI64(value), read];
}

export function sizeI64(v: bigint): number {
  return sizeU64(zigzag.encodeI64(v));
}

export function encodeI128(v: bigint): Uint8Array {
  return encodeU128(zigzag.encodeI128(v));
}

export function decodeI128(v: Uint8Array): [bigint, number] {
  const [value, read] = decodeU128(v);
  return [zigzag.decodeI128(value), read];
}

export function sizeI128(v: bigint): number {
  return sizeU128(zigzag.encodeI128(v));
}

function bigintLog2(v: bigint): number {
  const n = v.toString(2).length;
  return n > 0 ? n - 1 : 0;
}
