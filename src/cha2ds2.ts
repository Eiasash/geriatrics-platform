export function cha2ds2Score(factors: number[]): number {
  return factors.reduce((a, b) => a + b, 0);
}