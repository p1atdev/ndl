// see: https://www.ndl.go.jp/jp/dlib/standards/meta/2020/12/terms-list.pdf

import { Identifier, NDLC } from "./mod.ts";
import { DateTime } from "../../deps.ts";

export interface OpenSearchResult {
  /**
   * 検索結果のタイトル
   * @example こころ 夏目漱石 - 国立国会図書館サーチ OpenSearch
   */
  title: string;

  /**
   * リクエストのURL
   */
  link: string;

  /**
   * 検索に指定した条件
   */
  description: string;

  /**
   * 情報資源の記述言語
   */
  language: string;

  /**
   * 検索条件に当てはまる書籍の個数(検索結果の個数ではない)
   */
  count: number;

  /**
   * 始まりのインデックス
   */
  startIndex: number;

  //   /**
  //    * 不明
  //    */
  //   itemPerPage: number;

  /**
   * 検索結果
   */
  items: OpenSearchResultItem[];
}

export interface OpenSearchResultItem {
  /**
   * 書籍名
   */
  title: OpenSearchResultTranscript;

  /**
   * 書籍の詳細リンク link, rdfs:seeAlso
   */
  links: OpenSearchResultLink[];

  /**
   * 原文の言語
   */
  originalLanguage?: string;

  /**
   * 書籍情報の説明文 "dc:description": string[];
   */
  descriptions: string[];

  /**
   * 著者
   */
  author: string;

  /**
   * 出版社
   */
  publisher?: string;

  /**
   * 当該情報資源の作成者
   */
  informationCreator?: string;

  /**
   * カテゴリ
   */
  category: string;

  /**
   * サムネイル画像
   */
  thumbnail?: string;

  /**
   * ジャンル・形式用語
   */
  genre?: string;

  /**
   * 日付情報
   */
  date: OpenSearchResultDate;

  /**
   * 値段
   * 円じゃない可能性？
   */
  price?: string;

  /**
   * 何巻目か volume
   */
  volume?: string;

  /**
   * サイズ情報など
   */
  extent?: string[];

  // /**
  //  * ページ数 dc:extent
  //  */
  // pages?: number;

  // /**
  //  * サイズ(縦) dc:extent
  //  */
  // size?: string;

  /**
   * 識別コード dc:identifier
   */
  identifier: OpenSearchResultIdentifier[];

  /**
   * 分類
   */
  subject: OpenSearchResultSubject[];

  // /**
  //  * 参照先の情報資源の一部分である
  //  */
  // isPartOf?: string[];
}

/**
 * 実際の表記と読み方
 */
export interface OpenSearchResultTranscript {
  /**
   * 実際の表記
   */
  value: string;

  /**
   * 読み方(カタカナ)
   */
  pronounciation: string;
}

/**
 * リンク
 */
export interface OpenSearchResultLink {
  /**
   * リンクの種類
   */
  type: "main" | "seeAlso";

  /**
   * URL
   */
  url: string;
}

/**
 * 識別子
 */
export interface OpenSearchResultIdentifier {
  /**
   * 識別子の種類(ISBNなど)
   */
  type: Identifier;
  /**
   * 識別コード
   */
  id: string;
}

/**
 * 分類
 */
export interface OpenSearchResultSubject {
  /**
   * 分類コード
   */
  policy: NDLC;

  /**
   * 分類
   */
  code: string;
}

/**
 * 日付、出版日、公開日、発行日
 */
export interface OpenSearchResultDate {
  /**
   * 何かの日付(何！？)
   */
  something?: DateTime;

  /**
   * 出版年月日
   */
  issued?: DateTime;

  /**
   * 更新日
   */
  modified?: DateTime;

  /**
   * 著作権が発効した日
   */
  copyrighted?: DateTime;

  /**
   * 論文や記事などの提出日
   */
  submitted?: DateTime;

  /**
   * 当該情報資源を採取・保存した日
   */
  captured?: DateTime;

  /**
   * 作成日(何の！？)
   */
  created?: DateTime;
}
