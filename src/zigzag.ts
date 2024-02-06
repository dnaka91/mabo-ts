export function encodeI16(value: number): number {
  return (value << 1) ^ (value >> 15);
}

export function decodeI16(value: number): number {
  return (value >>> 1) ^ -(value & 0b1);
}

export function encodeI32(value: number): number {
  return (value << 1) ^ (value >> 31);
}

export function decodeI32(value: number): number {
  return (value >>> 1) ^ -(value & 0b1);
}

export function encodeI64(value: bigint): bigint {
  return (value << 1n) ^ (value >> 63n);
}

export function decodeI64(value: bigint): bigint {
  return (value >> 1n) ^ -(value & 0b1n);
}

export function encodeI128(value: bigint): bigint {
  return (value << 1n) ^ (value >> 127n);
}

export function decodeI128(value: bigint): bigint {
  return (value >> 1n) ^ -(value & 0b1n);
}
