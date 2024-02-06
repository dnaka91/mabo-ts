export class ByteBuffer {
  #buf: Uint8Array;
  #view: DataView;
  #pos = 0;

  constructor(size: number) {
    const buffer = new ArrayBuffer(size);
    this.#buf = new Uint8Array(buffer);
    this.#view = new DataView(buffer);
  }

  private grow(size: number) {
    if (this.#buf.byteLength - this.#pos < size) {
      const bigger = new ArrayBuffer(this.#buf.byteLength * 2);
      new Uint8Array(bigger).set(this.#buf);

      this.#buf = new Uint8Array(bigger);
      this.#view = new DataView(bigger);
    }
  }

  put(value: ArrayLike<number>) {
    this.grow(value.length);
    this.#buf.set(value, this.#pos);
    this.#pos += value.length;
  }

  putU8(value: number) {
    this.grow(1);
    this.#view.setUint8(this.#pos, value);
    this.#pos += 1;
  }

  putI8(value: number) {
    this.grow(1);
    this.#view.setInt8(this.#pos, value);
    this.#pos += 1;
  }

  putF32(value: number) {
    this.grow(4);
    this.#view.setFloat32(value, this.#pos);
    this.#pos += 4;
  }

  putF64(value: number) {
    this.grow(8);
    this.#view.setFloat64(value, this.#pos);
    this.#pos += 8;
  }

  get(length: number): Uint8Array {
    const value = this.#buf.slice(this.#pos, this.#pos + length);
    this.#pos += length;
    return value;
  }

  getU8(): number {
    const value = this.#view.getUint8(this.#pos);
    this.#pos += 1;
    return value;
  }

  getI8(): number {
    const value = this.#view.getInt8(this.#pos);
    this.#pos += 1;
    return value;
  }

  getF32(): number {
    const value = this.#view.getFloat32(this.#pos);
    this.#pos += 4;
    return value;
  }

  getF64(): number {
    const value = this.#view.getFloat64(this.#pos);
    this.#pos += 8;
    return value;
  }

  buffer(): Uint8Array {
    return this.#buf;
  }

  advance(amount: number) {
    this.#pos += amount;
  }

  hasRemaining(): boolean {
    return this.#pos < this.#buf.length;
  }

  take(amount: number): Take {
    return new Take(this, amount);
  }
}

export class Take {
  #buf: ByteBuffer;
  #amount: number;

  constructor(buf: ByteBuffer, amount: number) {
    this.#buf = buf;
    this.#amount = amount;
  }
}
