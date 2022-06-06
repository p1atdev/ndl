import { DateTime, datetime } from "../deps.ts";
import { zenkakuToHankaku } from "./mod.ts";

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

export const parseCrazyDate = (
  date?: string | number,
): DateTime | undefined => {
  if (date === undefined) {
    return undefined;
  }

  const dateText = zenkakuToHankaku(String(date));

  const parseStyles = [
    "YYYY-MM-dd",
    "YYYY年M月d日",
    "YYYY-MM",
    "YYYYMM",
    "YYYY.M",
    "YYYY年M月",
    "cYYYY",
    "YYYY",
  ];

  const parsed = (() => {
    for (const style of parseStyles) {
      const dt = datetime().parse(dateText, style);

      if (!isNaN(dt.year)) {
        return dt;
      } else {
        continue;
      }
    }
  })();

  return parsed;
};
