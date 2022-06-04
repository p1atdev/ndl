import { createOpenSearchRequest, formatDate } from "../../utils/mod.ts";
import { assertEquals } from "../../deps.ts";

Deno.test("opensearch request: simple (title)", () => {
  const req = createOpenSearchRequest({
    title: "吾輩は猫である",
  });

  console.log(req.url);

  assertEquals(
    req.url,
    "https://iss.ndl.go.jp/api/opensearch?title=%E5%90%BE%E8%BC%A9%E3%81%AF%E7%8C%AB%E3%81%A7%E3%81%82%E3%82%8B",
  );
});

Deno.test("opensearch request: simple (isbn)", () => {
  const req = createOpenSearchRequest({
    isbn: "4758069700",
  });

  console.log(req.url);

  assertEquals(
    req.url,
    "https://iss.ndl.go.jp/api/opensearch?isbn=4758069700",
  );
});

Deno.test("opensearch request: complex (cnt, dpid, dpgroupid, title)", () => {
  const req = createOpenSearchRequest({
    cnt: 5,
    dpid: "aozora",
    dpgroupid: "digitalcontents",
    title: ["吾輩", "猫"],
  });

  console.log(req.url);

  assertEquals(
    req.url,
    "https://iss.ndl.go.jp/api/opensearch?cnt=5&dpid=aozora&dpgroupid=digitalcontents&title=%E5%90%BE%E8%BC%A9+%E7%8C%AB",
  );
});

Deno.test("opensearch request: complex (cnt, title, creator, mediatype)", () => {
  const req = createOpenSearchRequest({
    cnt: 10,
    title: ["羅生門"],
    creator: ["芥川", "龍之介"],
    mediatype: "book",
  });

  console.log(req.url);

  assertEquals(
    req.url,
    "https://iss.ndl.go.jp/api/opensearch?cnt=10&title=%E7%BE%85%E7%94%9F%E9%96%80&creator=%E8%8A%A5%E5%B7%9D+%E9%BE%8D%E4%B9%8B%E4%BB%8B&mediatype=1",
  );
});

Deno.test("opensearch request: complex (cnt, from, until, mediatype)", () => {
  const req = createOpenSearchRequest({
    cnt: 100,
    from: formatDate(new Date("2021-01-01"), "YYYY-MM-dd"),
    until: formatDate(new Date("2021-02-28"), "YYYY-MM-dd"),
    mediatype: "book",
  });

  console.log(req.url);

  assertEquals(
    req.url,
    "https://iss.ndl.go.jp/api/opensearch?cnt=100&from=2021-01-01&until=2021-02-28&mediatype=1",
  );
});

Deno.test("opensearch request: complex (cnt, publisher)", () => {
  const req = createOpenSearchRequest({
    cnt: 5,
    publisher: "筑摩書房",
  });

  console.log(req.url);

  assertEquals(
    req.url,
    "https://iss.ndl.go.jp/api/opensearch?cnt=5&publisher=%E7%AD%91%E6%91%A9%E6%9B%B8%E6%88%BF",
  );
});

Deno.test("opensearch request: complex (cnt, title, publisher)", () => {
  const req = createOpenSearchRequest({
    cnt: 7,
    title: "新約聖書",
    digitized_publisher: "国立国会図書館",
  });

  console.log(req.url);

  assertEquals(
    req.url,
    "https://iss.ndl.go.jp/api/opensearch?cnt=7&title=%E6%96%B0%E7%B4%84%E8%81%96%E6%9B%B8&digitized_publisher=%E5%9B%BD%E7%AB%8B%E5%9B%BD%E4%BC%9A%E5%9B%B3%E6%9B%B8%E9%A4%A8",
  );
});

Deno.test("opensearch request: complex (cnt, idx, title)", () => {
  const req = createOpenSearchRequest({
    cnt: 66,
    idx: 6,
    title: "新約聖書",
  });

  console.log(req.url);

  assertEquals(
    req.url,
    "https://iss.ndl.go.jp/api/opensearch?cnt=66&idx=6&title=%E6%96%B0%E7%B4%84%E8%81%96%E6%9B%B8",
  );
});
