export function acbScore(drugs: number[]): number {
  return drugs.reduce((a, b) => a + b, 0);
}