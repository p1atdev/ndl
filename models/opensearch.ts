import {
  createOpenSearchRequest,
  getOpenSearchResult,
  sendOpenSearchRequest,
} from "../utils/mod.ts";
import { OpenSearchRequestQueries, OpenSearchResult } from "../types/mod.ts";

export const OpenSearch = () => {
  /**
   * OpenSearch検索
   * @param query {OpenSearchRequestQueries} 検索クエリ
   * @returns
   */
  const search = async (
    query: string | OpenSearchRequestQueries,
  ): Promise<OpenSearchResult> => {
    if (typeof query === "string") {
      const req = createOpenSearchRequest({ any: query });
      const res = await sendOpenSearchRequest(req);
      const result = getOpenSearchResult(res);
      return result;
    } else {
      const req = createOpenSearchRequest(query);
      const res = await sendOpenSearchRequest(req);
      const result = getOpenSearchResult(res);
      return result;
    }
  };

  return {
    search,
  };
};
