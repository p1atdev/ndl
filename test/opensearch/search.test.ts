import { OpenSearch } from "../../models/mod.ts";
import {
  assertArrayIncludes,
  assertEquals,
  assertNotEquals,
} from "../../deps.ts";

Deno.test("opensearch: any search", async () => {
  const client = OpenSearch();

  const result = await client.search("吾輩は猫である");

  assertNotEquals(result.count, 0);
});

Deno.test("opensearch: custom query search (cnt, title)", async () => {
  const client = OpenSearch();

  const result = await client.search({
    cnt: 5,
    title: "チェンソーマン",
  });

  assertArrayIncludes(result.items.map((item) => item.title.value), [
    "チェンソーマン = Chain saw man",
  ]);

  assertEquals(
    result.items[0].identifier.find((id) => id.type == "ISBN")?.id,
    "9784088817804",
  );
});

Deno.test("opensearch: custom query search (cnt, title[])", async () => {
  const client = OpenSearch();

  const result = await client.search({
    cnt: 5,
    title: ["タコピー", "原罪"],
  });

  assertArrayIncludes(result.items.map((item) => item.title.value), [
    "タコピーの原罪",
  ]);

  assertEquals(result.items[0].price, "630円");
});
