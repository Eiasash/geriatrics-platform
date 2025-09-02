export function morseFallRisk(score: number): string {
  if (score >= 45) return "High risk";
  if (score >= 25) return "Moderate risk";
  return "Low risk";
}