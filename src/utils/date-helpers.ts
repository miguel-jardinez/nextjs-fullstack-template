import dayjs from "dayjs";

/**
 * Gets the day of the month from a Date object using dayjs.
 * @param date - Date object from which to extract the day of the month.
 * @returns Number representing the day of the month (1-31).
 * @throws Error if the day of the month is invalid.
 * @example getNumberDayOfMonth(new Date("2024-06-15")) // returns 15
 */
export const getNumberDayOfMonth = (date: Date): number => {
  const numberDay = dayjs(date).date();

  if (numberDay < 1 || numberDay > 31) {
    throw new Error("Invalid day of month");
  }

  return numberDay;
};

/**
 * Returns a Date object corresponding to the specified day of the month,
 * using the current month and year. If the day does not exist in the current month,
 * dayjs will adjust the date to the last valid day of the month.
 *
 * @param dayOfMonth - Day of the month (1-31) to obtain.
 * @example
 * // If today is 2024-06-10 and dayOfMonth is 15:
 * getDateFromDayOfMonth(15); // returns 2024-06-15
 */
export const getDateFromDayOfMonth = (dayOfMonth: number): Date => {
  if (dayOfMonth < 1 || dayOfMonth > 31) {
    throw new Error("Invalid day of month");
  }

  const today = dayjs().startOf("day");
  const date = today.date(dayOfMonth);

  return date.toDate();
};

/**
 * Returns the next credit card cutoff date based on the given cutoff day of the month.
 * If today's date is less than or equal to the cutoff day, returns the cutoff date for this month.
 * If today's date is greater than the cutoff day, returns the cutoff date for the next month.
 * Handles months with fewer days than the cutoff day by using the last valid day of the month.
 *
 * @param cutoffDay - The day of the month (1-31) when the credit card statement is generated.
 * @returns Date object representing the next cutoff date.
 * @throws Error if the cutoffDay is not a valid day of the month (1-31).
 * @example
 * // If today is June 10 and cutoffDay is 15:
 * getNextCreditCardCutoffDate(15); // returns June 15
 *
 * // If today is June 20 and cutoffDay is 15:
 * getNextCreditCardCutoffDate(15); // returns July 15
 */
export const getNextCreditCardCutoffDate = (cutoffDay: number): Date => {
  if (cutoffDay < 1 || cutoffDay > 31) {
    throw new Error("Invalid cutoff day. Must be between 1 and 31.");
  }

  const today = dayjs().startOf("day");
  let targetMonth = today.month();
  let targetYear = today.year();

  if (today.date() > cutoffDay) {
    targetMonth += 1;
    if (targetMonth > 11) {
      targetMonth = 0;
      targetYear += 1;
    }
  }

  // Get the last day of the target month
  const lastDayOfTargetMonth = dayjs()
    .year(targetYear)
    .month(targetMonth)
    .endOf("month")
    .date();

  const validCutoffDay = Math.min(cutoffDay, lastDayOfTargetMonth);

  const cutoffDate = dayjs()
    .year(targetYear)
    .month(targetMonth)
    .date(validCutoffDay)
    .startOf("day");

  return cutoffDate.toDate();
};

/**
 * Calculates the difference in days between two dates.
 * @param date - The initial date.
 * @param dateToCompare - The date to compare with the initial date.
 * @returns The number of days between the two dates.
 * @example
 * daysDiferenceBetweenDates(new Date("2024-06-01"), new Date("2024-06-10")) // returns 9
 */
export const daysDiferenceBetweenDates = (
  date: Date,
  dateToCompare: Date,
): number => dayjs(dateToCompare).diff(dayjs(date), "day");

/**
 * Calculates the number of days left until the next credit card payment due date.
 *
 * @param paymentDueDay - The day of the month (1-31) when the payment is due.
 * @returns The number of days remaining until the next payment due date.
 * @throws Error if the paymentDueDay is not a valid day of the month (1-31).
 *
 * @example
 * // If today is June 10 and paymentDueDay is 15:
 * getDaysLeftToPayment(15); // returns 5
 *
 * // If today is June 20 and paymentDueDay is 15:
 * getDaysLeftToPayment(15); // returns number of days until July 15
 */
export const getDaysLeftToPayment = (paymentDueDay: number): number => {
  if (paymentDueDay < 1 || paymentDueDay > 31) {
    throw new Error("Invalid payment due day. Must be between 1 and 31.");
  }

  const today = dayjs().startOf("day");
  let nextPaymentMonth = today.month();
  let nextPaymentYear = today.year();

  // If the payment day for this month has already passed, move to next month
  if (today.date() > paymentDueDay) {
    nextPaymentMonth += 1;
    if (nextPaymentMonth > 11) {
      nextPaymentMonth = 0;
      nextPaymentYear += 1;
    }
  }

  // Handle months with fewer days than paymentDueDay
  const daysInTargetMonth = dayjs()
    .year(nextPaymentYear)
    .month(nextPaymentMonth)
    .daysInMonth();
  const validPaymentDay = Math.min(paymentDueDay, daysInTargetMonth);

  const nextPaymentDate = dayjs()
    .year(nextPaymentYear)
    .month(nextPaymentMonth)
    .date(validPaymentDay)
    .startOf("day");

  const daysLeft = nextPaymentDate.diff(today, "day");

  return daysLeft;
};

/**
 * Formats a date into a human-readable string with customizable separator and month format.
 *
 * @param dateToFormat - The date to format (Date object, string, or number).
 * @param separator - The separator to use between day, month, and year (e.g., "-", "/", ".").
 * @param showMonthAsNumber - If true, shows the month as a number (e.g., "06"); if false, shows the full month name (e.g., "June").
 * @returns The formatted date string (e.g., "20-June-2027" or "20/06/2027").
 *
 * @example
 * formatReadableDate("2027-06-20", "-", false); // "20-June-2027"
 * formatReadableDate(new Date(2027, 5, 20), "/", true); // "20/06/2027"
 */
export const formatReadableDate = (
  dateToFormat: Date | string | number,
  separator: string = "-",
  showMonthAsNumber: boolean = false,
): string => {
  const date = dayjs(dateToFormat);
  if (!date.isValid()) {
    throw new Error("Invalid date provided.");
  }

  const dayOfMonth = date.format("DD");
  const yearFull = date.format("YYYY");
  const monthFormatted = showMonthAsNumber
    ? date.format("MM")
    : date.format("MMMM");

  return [dayOfMonth, monthFormatted, yearFull].join(separator);
};
