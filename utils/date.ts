import { DateTime, datetime } from "../deps.ts";

/**
 * Format date to specified format.
 * @param date Date
 * @param format string
 * @returns string
 */
export const formatDate = (date: Date | DateTime, format: string): string => {
  const dt = datetime(date);

  return dt.format(format);
};
