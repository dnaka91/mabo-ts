export const END_MARKER: number = 0;

/**
 * Identifier for a single struct or enum variant field.
 *
 * This type contains the actual identifier, plus additional information that is encoded together
 * with it. It allows for convenient en- and decoding of the information.
 */
export class FieldId {
  /** The real decoded field identifier. */
  value: number
  /** Encoding information for field skipping. */
  encoding: FieldEncoding

  /** Create a new instance of a field identifier. */
  constructor(value: number, encoding: FieldEncoding) {
    this.value = value
    this.encoding = encoding
  }

  /**
    * Convert from a raw number into the field identifier.
    *
    * @throws if the raw value contains an unknown field encoding.
    */
  static fromRaw(value: number): FieldId {
    return new FieldId(
      value >> 3,
      parseFieldEncoding(value),
    );
  }

  /**
   * Convert the field identifier into a raw number, which contains all its information.
   */
  intoRaw(): number {
    return this.value << 3 | this.encoding
  }
}

/**
 * Minimum detail about how a field is encoded, which allows to skip over a field if it's unknown.
 */
export enum FieldEncoding {
  /** Variable-length integer. */
  Varint = 0,
  /** Arbitrary content prefixed with its byte length. */
  LengthPrefixed = 1,
  /** 1-byte fixed width data. */
  Fixed1 = 2,
  /** 4-byte fixed width data. */
  Fixed4 = 3,
  /** 8-byte fixed width data. */
  Fixed8 = 4
}

function parseFieldEncoding(value: number): FieldEncoding {
  switch (value & 0b111) {
    case 0:
      return FieldEncoding.Varint;
    case 1:
      return FieldEncoding.LengthPrefixed;
    case 2:
      return FieldEncoding.Fixed1;
    case 3:
      return FieldEncoding.Fixed4;
    case 4:
      return FieldEncoding.Fixed8;
    default:
      throw Error(`invalid field encoding ${value & 0b111}`);
  }
}

/**
 * Identifier for a single enum variant.
 *
 * Currently, this is identical to the raw value it contains, but might be extended to encode
 * additional information like the {@link FieldId} in the future.
 */
export class VariantId {
  /** The real decoded variant identifier. */
  value: number

  constructor(value: number) {
    this.value = value
  }
}

export { ByteBuffer, Take } from "./buf/buffer";
export * as decode from "./buf/decode";
export * as encode from "./buf/encode";
export * as size from "./buf/size";

export * as varint from "./varint";
export * as zigzag from "./zigzag";
