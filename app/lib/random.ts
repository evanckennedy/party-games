export function secureRandomIndex(length: number): number {
  if (!Number.isSafeInteger(length) || length < 1 || length > 0x1_0000_0000) {
    throw new RangeError("length must be an integer between 1 and 2^32");
  }

  const range = 0x1_0000_0000;
  const limit = range - (range % length);
  const values = new Uint32Array(1);
  let value: number;

  do {
    crypto.getRandomValues(values);
    value = values[0];
  } while (value >= limit);

  return value % length;
}