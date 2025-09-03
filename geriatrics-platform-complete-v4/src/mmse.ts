export function interpretMMSE(score: number): string {
  if (score >= 24) return "Normal";
  if (score >= 18) return "Mild impairment";
  return "Severe impairment";
}