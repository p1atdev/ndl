import { zenkakuToHankaku } from "../utils/mod.ts";
import { assertEquals } from "../deps.ts";

Deno.test("zenkaku to hankaku: numbers", () => {
  const zenkaku = "０ １ ２ ３ ４ ５ ６ ７ ８ ９";
  const hankaku = zenkakuToHankaku(zenkaku);

  assertEquals(hankaku, "0 1 2 3 4 5 6 7 8 9");
});

Deno.test("zenkaku to hankaku: uppercase alphabets", () => {
  const zenkaku = "Ａ Ｂ Ｃ Ｄ Ｅ Ｆ Ｇ Ｈ Ｉ Ｊ Ｋ Ｌ Ｍ Ｎ Ｏ Ｐ Ｑ Ｒ Ｓ Ｔ Ｕ Ｖ Ｗ Ｘ Ｙ Ｚ";
  const hankaku = zenkakuToHankaku(zenkaku);

  assertEquals(hankaku, "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z");
});

Deno.test("zenkaku to hankaku: lowercase alphabets", () => {
  const zenkaku = "ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ";
  const hankaku = zenkakuToHankaku(zenkaku);

  assertEquals(hankaku, "a b c d e f g h i j k l m n o p q r s t u v w x y z");
});

Deno.test("zenkaku to hankaku: symbols", () => {
  const zenkaku =
    "！ ＂ ＃ ＄ ％ ＆ ＇ （ ） ＊ ＋ ， － ． ／ ： ； ＜ ＝ ＞ ？ ＠ ［ ＼ ］ ＾ ＿ ｀ ｛ ｜ ｝ ～";
  const hankaku = zenkakuToHankaku(zenkaku);

  assertEquals(
    hankaku,
    `! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ \` { | } ~`,
  );
});

Deno.test("zenkaku to hankaku: numbers and symbols", () => {
  const zenkaku = "２００３．９ 12：35";
  const hankaku = zenkakuToHankaku(zenkaku);

  assertEquals(hankaku, "2003.9 12:35");
});

Deno.test("zenkaku to hankaku: space", () => {
  const zenkaku = "こんにちは　今日はいい天気";
  const hankaku = zenkakuToHankaku(zenkaku);

  assertEquals(hankaku, "こんにちは 今日はいい天気");
});

Deno.test("zenkaku to hankaku: alphabet text", () => {
  const zenkaku = "Ｈｅｌｌｏ，　Ｗｏｒｌｄ";
  const hankaku = zenkakuToHankaku(zenkaku);

  assertEquals(hankaku, "Hello, World");
});
