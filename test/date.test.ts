import { formatDate } from "../utils/mod.ts";
import { assertEquals } from "../deps.ts";
import { datetime } from "../deps.ts";

Deno.test("format date: 2020/1/16", () => {
  const date = new Date();
  date.setFullYear(2020);
  date.setMonth(0);
  date.setDate(16);

  const formatted = formatDate(date, "YYYY/MM/dd");

  assertEquals(formatted, "2020/01/16");
});

Deno.test("format date: 2050-11-14", () => {
  const formatted = formatDate(
    datetime({ year: 2050, month: 11, day: 14 }),
    "YYYY-MM-dd",
  );

  assertEquals(formatted, "2050-11-14");
});
