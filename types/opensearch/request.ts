import { MediaTypeNum, MediaTypeText } from "../mod.ts";

export type OpenSearchRequestQueries = {
  /**
   * データプロバイダ ID
   * @一致条件 完全一致
   */
  dpid?: string | string[];

  /**
   * データプロバイダグループ ID
   * @一致条件 完全一致
   */
  dpgroupid?: string;

  /**
   * すべての項目を対象に検索
   * @一致条件 部分一致
   */
  any?: string | string[];

  /**
   * タイトル
   * @一致条件 部分一致
   */
  title?: string | string[];

  /**
   * 作成者
   * @一致条件 部分一致
   */
  creator?: string | string[];

  /**
   * 出版社
   * @一致条件 部分一致
   */
  publisher?: string | string[];

  /**
   * デジタル化した製作者
   * @一致条件 部分一致
   */
  digitized_publisher?: string | string[];

  /**
   * NDC (分類)
   * @一致条件 前方一致
   */
  ndc?: string;

  /**
   * 開始出版年月日
   * @形式 YYYY、YYYY-MM、YYYY-MM-DD
   */
  from?: string | Date;

  /**
   * 終了出版年月日
   * @形式 YYYY、YYYY-MM、YYYY-MM-DD
   */
  until?: string | Date;

  /**
   * 出力レコード上限値（省略時は 200 とする）
   */
  cnt?: number;

  /**
   * レコード取得開始位置（省略時は 1 とする）
   */
  idx?: number;

  /**
   * ISBN 10 桁または 13 桁で入力した場合は、10 桁、13 桁の両方に変換して完全一致検索を行う。それ以外の桁で入力した場合は前方一致検索を行う。
   * @一致条件 完全一致 または 前方一致
   */
  isbn?: string;

  /**
   * 資料種別 国立国会図書館サーチの詳細検索の資料種別に対応
   */
  mediatype?: MediaTypeText | MediaTypeText[] | MediaTypeNum | MediaTypeNum[];
};

export type OpenSearchRequestQueryKey = keyof OpenSearchRequestQueries;
