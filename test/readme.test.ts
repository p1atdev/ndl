import { OpenSearch } from "../mod.ts";
import { assertEquals } from "../deps.ts";

Deno.test("for readme: free word search", async () => {
  const client = OpenSearch();

  const result = await client.search("タコピーの原罪");

  assertEquals(result.count, 3);

  const book = result.items[0];

  assertEquals(book.title.value, "タコピーの原罪");
  assertEquals(book.title.pronounciation, "タコピー ノ ゲンザイ");

  assertEquals(book.genre, "漫画");

  assertEquals(book.volume, "上");

  assertEquals(
    book.identifier.find((id) => id.type == "ISBN")?.id,
    "9784088830490",
  );

  assertEquals(book.price, "630円");
});

Deno.test("for readme: custom parameter search", async () => {
  const client = OpenSearch();

  const result = await client.search({
    cnt: 5,
    title: ["ダンジョン", "飯"],
    creator: "九井諒子",
  });

  assertEquals(result.items.length, 5);

  const book = result.items[0];

  assertEquals(book.title.value, "ダンジョン飯 = DELICIOUS IN DUNGEON");
  assertEquals(book.title.pronounciation, "ダンジョンメシ");

  assertEquals(book.genre, "漫画");

  assertEquals(book.volume, "1");

  assertEquals(
    book.identifier.find((id) => id.type == "ISBN")?.id,
    "9784047301535",
  );

  assertEquals(book.price, "620円");
});

Deno.test("for readme: custom parameter search (mediatype)", async () => {
  const client = OpenSearch();

  const result = await client.search({
    cnt: 3,
    title: "キノの旅",
    mediatype: "children", // 児童書
  });

  assertEquals(result.items.length, 3);

  const book = result.items[0];

  assertEquals(book.title.value, "キノの旅");
  assertEquals(book.title.pronounciation, "キノ ノ タビ");

  assertEquals(book.category, "児童書");

  assertEquals(
    book.identifier.find((id) => id.type == "ISBN")?.id,
    "4840215855",
  );

  assertEquals(book.price, "530円");
});
