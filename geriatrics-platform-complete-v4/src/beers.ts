export function checkBeersList(meds: string[]): string[] {
  const risky = ["diazepam", "amitriptyline"];
  return meds.filter(m => risky.includes(m.toLowerCase()));
}