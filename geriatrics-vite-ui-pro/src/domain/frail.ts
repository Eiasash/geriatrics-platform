export function frailScore(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}