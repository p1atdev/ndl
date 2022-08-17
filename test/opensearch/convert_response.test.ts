import {
  createOpenSearchRequest,
  getOpenSearchResult,
  sendOpenSearchRequest,
} from "../../utils/mod.ts";
import { assertEquals, assertExists, assertNotEquals } from "../../deps.ts";

Deno.test("opensearch convert result: old book", async () => {
  const req = createOpenSearchRequest({
    title: "吾輩は猫である",
  });

  const res = await sendOpenSearchRequest(req);

  // console.log(res.rss.channel.item);

  const result = getOpenSearchResult(res);

  //   console.log(result);

  assertNotEquals(result.count, 0);

  assertEquals(
    result.title,
    "吾輩は猫である - 国立国会図書館サーチ OpenSearch",
    "search title is not matched",
  );
});

Deno.test("opensearch convert response: recent book", async () => {
  const req = createOpenSearchRequest({
    isbn: "4758069700",
  });

  const res = await sendOpenSearchRequest(req);

  //   console.log(res.rss.channel.item);

  const result = getOpenSearchResult(res);

  const book = result.items[0];

  assertExists(book, "book does not exist");

  assertEquals(
    book.title.value,
    "アークナイツoperators! = アークナイツオペレーターズ!",
    "book title is not valid",
  );

  assertEquals(book.price, "900円", "book price is not valid");

  assertEquals(
    book.identifier.find((id) => id.type == "ISBN")?.id,
    "9784758069700",
    "book isbn is not valid",
  );
});
