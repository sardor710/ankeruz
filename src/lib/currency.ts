/**
 * Official Currency Configuration: Uzbekistan Som (so'm)
 * Standard formatting: "665 000 so'm"
 */

export const CURRENCY_CODE = "UZS";
export const CURRENCY_SYMBOL = "so'm";
export const CURRENCY_DISPLAY = "so'm";

/**
 * Parses any price string or number into a clean number.
 * Handles inputs like:
 * - "665 000 so'm" -> 665000
 * - "665000" or 665000 -> 665000
 * - "2 690,00 kr" or "2 690 kr" -> 2690000
 * - "449,25 kr" -> 449000
 */
export function parseSom(value: string | number | undefined | null): number {
  if (value === undefined || value === null || value === "") return 0;
  if (typeof value === "number") {
    if (isNaN(value)) return 0;
    return value < 10000 && value > 0 ? Math.round(value * 1000) : Math.round(value);
  }

  let str = value.toString().trim();
  const isLegacyKr = /kr|sek/i.test(str);

  // Remove decimal cents like ,00 or .00 or ,25 before currency suffix
  str = str.replace(/[,.]\d{1,2}(?=\s*(kr|sek|$))/i, "");

  const cleaned = str.replace(/[^0-9]/g, "");
  let num = Number(cleaned);
  if (isNaN(num)) return 0;

  if (isLegacyKr || (num > 0 && num < 25000 && !str.includes("so'm") && !str.includes("som"))) {
    num = num * 1000;
  }

  return Math.round(num);
}

/**
 * Formats any number or numeric string into official "665 000 so'm" format.
 * Automatically inserts thousands separator space and appends "so'm".
 */
export function formatSom(value: number | string | undefined | null): string {
  const num = parseSom(value);
  const parts = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${parts} so'm`;
}

/**
 * Ensures any price string has the "so'm" word added automatically.
 * If user types "665000" or "665 000", it returns "665 000 so'm".
 */
export function ensureSomSuffix(input: string | number | undefined | null): string {
  return formatSom(input);
}
