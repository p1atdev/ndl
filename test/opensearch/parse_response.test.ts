import { OpenSearchRSSResponse } from "../../types/mod.ts";
import { assertEquals, xml } from "../../deps.ts";

Deno.test("xml parsing", async () => {
  const url =
    "https://iss.ndl.go.jp/api/opensearch?cnt=3&title=%E7%95%B0%E4%B8%96%E7%95%8C";

  const xmlString = await fetch(url).then((res) => res.text());

  const doc = xml.parse(xmlString);

  const res: OpenSearchRSSResponse = JSON.parse(JSON.stringify(doc));

  assertEquals(res.rss.channel.title, "異世界 - 国立国会図書館サーチ OpenSearch");
});
