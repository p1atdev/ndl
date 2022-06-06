# NDL API Client for Deno

[![deno module](https://shield.deno.dev/x/ndl)](https://deno.land/x/ndl)
![deno compatibility](https://shield.deno.dev/deno/^1.22)
[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)
![Test](https://github.com/p1atdev/ndl/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/p1atdev/ndl/branch/main/graph/badge.svg?token=SJ2W1IUKCR)](https://codecov.io/gh/p1atdev/ndl)
[![nest.land](https://nest.land/badge.svg)](https://nest.land/package/ndl)

Deno 用の国立国会図書館の検索 API クライアント

API 仕様書: https://iss.ndl.go.jp/information/api/riyou/

# Features

- OpenSearch エンドポイント対応

## Usage

### Import

(deno.land の方での登録をミスったのでしばらくは nest.land の方を使ってください。7 月くらいに対応します。)

- deno.land: https://deno.land/x/ndl@v0.1.3/mod.ts
- nest.land: https://x.nest.land/ndl@v0.1.3/mod.ts

### フリーワード検索

```ts
import { OpenSearch } from "https://x.nest.land/ndl@v0.1.3/mod.ts";

const client = OpenSearch();

const result = await client.search("タコピーの原罪");

console.log(result.count); // 3

const book = result.items[0];

console.log(book.title.value); // "タコピーの原罪"
console.log(book.title.pronounciation); // "タコピー ノ ゲンザイ"

console.log(book.volume); // "上"

console.log(book.identifier.find((id) => id.type == "ISBN")?.id); // "9784088830490"

console.log(book.price); // "630円"
```

### パラメーター指定検索

一部のパラメーターは配列にして AND 検索することができます。

```ts
const client = OpenSearch();

const result = await client.search({
  cnt: 5,
  title: ["ダンジョン", "飯"],
  creator: "九井諒子",
});

console.log(result.items.length); // 5

const book = result.items[0];

console.log(book.title.value); // "ダンジョン飯 = DELICIOUS IN DUNGEON"
console.log(book.title.pronounciation); // "ダンジョンメシ"

console.log(book.genre); // "漫画"

console.log(book.volume); // "1"

console.log(book.identifier.find((id) => id.type == "ISBN")?.id); // "9784047301535"

console.log(book.price); // "620円"
```

資料種を指定することもできます。

```ts
const client = OpenSearch();

const result = await client.search({
  cnt: 3,
  title: "キノの旅",
  mediatype: "children", // 児童書
});

console.log(result.items.length); // 3

const book = result.items[0];

console.log(book.title.value); // "キノの旅"
console.log(book.title.pronounciation); // "キノ ノ タビ"

console.log(book.category); // "児童書"

console.log(book.identifier.find((id) => id.type == "ISBN")?.id); // "4840215855"

console.log(book.price); // "530円"
```

指定できるパラメーターの役割については、型定義や
[仕様書](https://iss.ndl.go.jp/information/wp-content/uploads/2022/05/ndlsearch_api_20220520_jp.pdf)
を参考にしてください。

## TODO

- プロバイダ型定義
  ([参考](https://iss.ndl.go.jp/information/wp-content/uploads/2021/12/ndlsearch_api_ap1_20211220_jp.pdf))
- 未対応の返り値パラメーターの対応
  ([参考](https://www.ndl.go.jp/jp/dlib/standards/meta/2020/12/terms-list.pdf))
- 国会議事録検索
- メタデータ API
