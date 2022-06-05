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
   * 言語
   */
  language: string;

  /**
   * 検索結果の数
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
  results: OpenSearchResultItem[];
}

export interface OpenSearchResultItem {
  /**
   * 書籍名
   */
  title: OpenSearchResultTranscript;

  /**
   * 書籍の詳細リンク link, rdfs:seeAlso
   */
  link: string[];
  // TODO: このlinkはメインのリンクとseeAlsoのリンクがあるので区別がつくようにinterfaceを作ってあげる

  /**
   * 書籍情報の説明文 "dc:description": string[];
   */
  description: string;

  /**
   * 著者
   */
  author: string;

  /**
   * 出版社
   */
  publisher: string;

  /**
   * カテゴリ
   */
  category: string;

  /**
   * ジャンル (カテゴリとの違いは？)
   */
  genre?: string;

  /**
   * 分類 (NDLCなどの分類)
   */
  subjects: string[];

  //   /**
  //    * 不明。linkと同じでおそらく不要
  //    */
  //   guid: string;

  // /**
  //  * 何かの出版日 (pubDate)
  //  */
  // publicationDate: Date;

  // TODO: 発行日時について、いろいろ種類があるのでまとめてinterface書く

  /**
   * 出版日 "dc:date"?: number;
   */
  publicationDate: Date;

  /**
   * W3CDTFでの出版年 dcterms:issued
   */
  W3CDTF: number;

  /**
   * 値段
   * 円じゃない可能性？
   */
  price?: string;

  /**
   * ページ数 dc:extent
   */
  volume?: number;

  /**
   * サイズ(縦) dc:extent
   */
  size?: number;

  /**
   * 識別コード dc:identifier
   */
  identifier: OpenSearchResultIdentifier[];

  /**
   * 分類
   */
  subject: OpenSearchResultSubject[];

  /**
   * 不明
   */
  //   "dcterms:isPartOf"?: OpenSearchRSSChannelItemRdfsSeeAlso[];
}

export interface OpenSearchResultTranscript {
  /**
   * 実際の表記
   */
  original: string;

  /**
   * 読み方(カタカナ)
   */
  pronounciation: string;
}

export interface OpenSearchResultIdentifier {
  /**
   * 識別子の種類(ISBNなど)
   */
  type: string;
  /**
   * 識別コード
   */
  id: string;
}

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
 * NDLC分類コード
 */
export type NDLC = "NDLC" | "NDLC10" | "NDC9" | "NDLSH";
