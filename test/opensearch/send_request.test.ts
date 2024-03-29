import {
  createOpenSearchRequest,
  sendOpenSearchRequest,
} from "../../utils/mod.ts";
import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertExists,
  assertNotEquals,
} from "../../deps.ts";

Deno.test("send opensearch request: simple (title)", async () => {
  const req = createOpenSearchRequest({
    title: "吾輩は猫である",
  });

  const res = await sendOpenSearchRequest(req);

  //   console.log(res.rss.channel.item);

  assert(Array.isArray(res.rss.channel.item), "item is not an array");

  assertNotEquals(
    res.rss.channel["openSearch:totalResults"],
    0,
  );
});

Deno.test("send opensearch request: simple (isbn)", async () => {
  const req = createOpenSearchRequest({
    isbn: "4758069700",
  });

  const res = await sendOpenSearchRequest(req);

  //   console.log(res.rss.channel.item);

  assertExists(res.rss.channel.item);

  if (Array.isArray(res.rss.channel.item)) {
    assertEquals(
      res.rss.channel.item[0].title,
      "アークナイツoperators! = アークナイツオペレーターズ!",
    );
  } else {
    assertEquals(
      res.rss.channel.item.title,
      "アークナイツoperators! = アークナイツオペレーターズ!",
    );
  }
});

Deno.test("send opensearch request: complex (cnt, dpid, dpgroupid, title)", async () => {
  const req = createOpenSearchRequest({
    cnt: 5,
    dpid: "aozora",
    dpgroupid: "digitalcontents",
    title: ["吾輩", "猫"],
  });

  const res = await sendOpenSearchRequest(req);

  //   console.log(res.rss.channel.item);

  assert(Array.isArray(res.rss.channel.item), "item is not an array");

  assertEquals(
    res.rss.channel.item[0]["dc:title"],
    "吾輩ハ猫デアル",
  );
});

Deno.test("send opensearch request: complex (cnt, title, creator, mediatype)", async () => {
  const req = createOpenSearchRequest({
    cnt: 10,
    title: ["羅生門"],
    creator: ["芥川", "龍之介"],
    mediatype: "book",
  });

  const res = await sendOpenSearchRequest(req);

  //   console.log(res.rss.channel.item);

  assert(Array.isArray(res.rss.channel.item), "item is not an array");

  assertArrayIncludes(res.rss.channel.item.map((item) => item.title), ["羅生門"]);
});

Deno.test("send opensearch request: complex (cnt, from, until, mediatype)", async () => {
  const req = createOpenSearchRequest({
    cnt: 10,
    title: "少年ジャンプ",
    from: "1968",
    until: "1970",
    mediatype: "book",
  });

  const res = await sendOpenSearchRequest(req);

  assert(Array.isArray(res.rss.channel.item), "item is not an array");

  //   console.log(res.rss.channel.item.map((item) => item.title));

  assertArrayIncludes(
    res.rss.channel.item.map((item) => item.title),
    ["少年ジャンプ"],
    "item does not includes 少年ジャンプ",
  );
});

Deno.test("send opensearch request: complex (cnt, publisher)", async () => {
  const req = createOpenSearchRequest({
    cnt: 5,
    publisher: "筑摩書房",
  });

  const res = await sendOpenSearchRequest(req);

  assert(Array.isArray(res.rss.channel.item), "item is not an array");

  //   console.log(res.rss.channel.item);

  assertArrayIncludes(
    res.rss.channel.item.map((item) => item["dc:publisher"]),
    ["筑摩書房"],
    "item does not includes 筑摩書房",
  );
});

Deno.test("send opensearch request: complex (cnt, title, publisher)", async () => {
  const req = createOpenSearchRequest({
    cnt: 100,
    title: ["ヨハネ", "福音書"],
    digitized_publisher: "国立国会図書館",
  });

  const res = await sendOpenSearchRequest(req);

  assert(Array.isArray(res.rss.channel.item), "item is not an array");

  //   console.log(res.rss.channel.item);

  assertArrayIncludes(
    res.rss.channel.item.map((item) => item.title),
    ["ヨハネによる福音書"],
    "ヨハネによる福音書 not found",
  );
});

Deno.test("send opensearch request: complex (cnt, idx, title)", async () => {
  const req = createOpenSearchRequest({
    cnt: 13,
    idx: 6,
    title: "新約聖書",
  });

  const res = await sendOpenSearchRequest(req);

  assert(Array.isArray(res.rss.channel.item), "item is not an array");

  //   console.log(res.rss.channel.item);

  assertEquals(
    res.rss.channel.item.length,
    13,
    "item length is not 13",
  );
});

Deno.test("send opensearch request: no result (cnt, title, mediatype)", async () => {
  const req = createOpenSearchRequest({
    cnt: 13,
    title: "にゃーん",
    mediatype: "newspaper",
  });

  const res = await sendOpenSearchRequest(req);

  //   console.log(res.rss.channel.item);

  assertEquals(res.rss.channel["openSearch:totalResults"], 0);
  assertEquals(res.rss.channel.item, undefined);
});
