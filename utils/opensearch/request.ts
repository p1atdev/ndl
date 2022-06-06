import {
  MediaTypeText,
  mediaTypeText,
  OpenSearchRequestQueries,
  OpenSearchRSSResponse,
} from "../../types/mod.ts";
import { parseXML } from "../../utils/mod.ts";

const endpoint = "https://iss.ndl.go.jp/api/opensearch";

export const createOpenSearchRequest = (
  queries: OpenSearchRequestQueries,
): Request => {
  const url = new URL(endpoint);

  const params = new URLSearchParams();

  Object.keys(queries)
    .forEach((key) => {
      const value = Object.getOwnPropertyDescriptor(queries, key)?.value;

      if (value) {
        switch (key) {
          case "title":
          case "creator":
          case "publisher":
          case "digitized_publisher": {
            if (Array.isArray(value)) {
              params.append(key, value.join(" "));
            } else {
              params.append(key, value);
            }
            break;
          }
          case "from":
          case "until": {
            if (value instanceof Date) {
              // format is yyyy-MM-dd
              params.append(key, value.toISOString().slice(0, 10));
            } else {
              params.append(key, value);
            }
            break;
          }
          case "mediatype": {
            if (Array.isArray(value)) {
              value.forEach((v) => {
                params.append(
                  key,
                  v in mediaTypeText ? mediaTypeText[v as MediaTypeText] : v,
                );
                console.log(params);
              });
            } else {
              params.append(
                key,
                value in mediaTypeText
                  ? mediaTypeText[value as MediaTypeText]
                  : value,
              );
            }
            break;
          }
          default: {
            if (Array.isArray(value)) {
              params.append(key, value.join(","));
            } else {
              params.append(key, value);
            }
            break;
          }
        }
      }
    });

  url.search = params.toString();

  const request = new Request(url.toString());

  return request;
};

export const sendOpenSearchRequest = async (
  request: Request,
): Promise<OpenSearchRSSResponse> => {
  const xml = await fetch(request).then((res) => res.text());

  const json = parseXML<OpenSearchRSSResponse>(xml);

  return JSON.parse(JSON.stringify(json));
};
