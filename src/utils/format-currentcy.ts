/**
 * Formats a numeric string to display as currency with dollar sign and commas
 * @param value - Raw numeric string (e.g., "2000000")
 * @returns Formatted currency string (e.g., "$2,000,000")
 * @example formatCurrency("2000000") // returns "$2,000,000"
 */
export const formatCurrency = (value: string): string => {
  const cleanValue = value.replace(/[^\d.]/g, "");

  if (!cleanValue) return "$0";

  const parts = cleanValue.split(".");
  if (parts.length > 2) return "$" + parts[0] + "." + parts.slice(1).join("");

  if (parts.length === 2 && parts[1].length > 2) {
    const dollars = parseInt(parts[0], 10);
    if (isNaN(dollars)) return "$0.00";
    return `$${dollars.toLocaleString()}.${parts[1].slice(0, 2)}`;
  }

  if (parts.length === 1) {
    const number = parseInt(parts[0], 10);
    if (isNaN(number)) return "$0";
    return `$${number.toLocaleString()}`;
  }

  const dollars = parseInt(parts[0], 10);
  if (isNaN(dollars)) return "$0.00";
  return `$${dollars.toLocaleString()}.${parts[1]}`;
};

/**
 * Converts a currency string to cents as number (Shopify-style)
 * If the cents are two zeros (e.g., ".00"), they are not included in the calculation.
 * @param value - Currency string (e.g., "$2,000.56")
 * @returns Number representing cents (e.g., 200056)
 * @example stringToCents("$2,000.56") // returns 200056
 */
export const stringToCents = (value: string): number => {
  const cleanValue = value.replace(/[$,]/g, "");

  if (!cleanValue) return 0;

  const parts = cleanValue.split(".");

  if (parts.length === 1) {
    // No decimals: "21345" -> 2134500 cents
    return parseInt(parts[0], 10) * 100;
  } else if (parts.length === 2) {
    // With decimals: "21345.56" -> 2134556 cents
    const dollars = parts[0];
    const cents = parts[1].padEnd(2, "0").slice(0, 2); // Ensure 2 digits
    if (cents === "00") {
      return parseInt(dollars, 10) * 100;
    }
    return parseInt(dollars, 10) * 100 + parseInt(cents, 10);
  }

  return 0;
};

/**
 * Converts cents (number) to formatted currency string
 * @param cents - Number representing cents (e.g., 200056)
 * @returns Formatted currency string (e.g., "$2,000.56")
 * @example centsToString(200056) // returns "$2,000.56"
 */
export const centsToString = (cents: number): string => {
  if (cents === 0) return "$0";
  const dollars = Math.floor(cents / 100);
  const remainingCents = cents % 100;
  const formattedDollars = dollars.toLocaleString();
  if (remainingCents === 0) {
    return `$${formattedDollars}`;
  }
  const formattedCents = remainingCents.toString().padStart(2, "0");
  return `$${formattedDollars}.${formattedCents}`;
};

/**
 * Formats input in real-time for currency display
 * @param value - Raw input string
 * @returns Formatted string with commas and limited decimals
 * @example formatCurrencyInput("2000000.567") // returns "$2,000,000.56"
 */
export const formatCurrencyInput = (value: string): string => {
  const cleanValue = value.replace(/[^\d.]/g, "");

  if (!cleanValue) return "";

  const parts = cleanValue.split(".");
  if (parts.length > 2) return parts[0] + "." + parts.slice(1).join("");

  if (parts.length === 2 && parts[1].length > 2) {
    return parts[0] + "." + parts[1].slice(0, 2);
  }

  if (parts.length === 1) {
    const number = parseInt(parts[0], 10);
    if (isNaN(number)) return "";
    return number.toLocaleString();
  }

  const dollars = parseInt(parts[0], 10);
  if (isNaN(dollars)) return "";
  return dollars.toLocaleString() + "." + parts[1];
};

/**
 * Cleans currency format and limits decimals to 2 digits
 * @param value - Formatted currency string
 * @returns Clean numeric string with max 2 decimals
 * @example unformatCurrency("$2,000.567") // returns "2000.56"
 */
export const unformatCurrency = (value: string): string => {
  const cleanValue = value.replace(/[^\d.]/g, "");

  const parts = cleanValue.split(".");
  if (parts.length === 2 && parts[1].length > 2) {
    return parts[0] + "." + parts[1].slice(0, 2);
  }

  return cleanValue;
};
