import {
  Identifier,
  NDLC,
  OpenSearchResult,
  OpenSearchResultIdentifier,
  OpenSearchResultItem,
  OpenSearchResultLink,
  OpenSearchResultSubject,
  OpenSearchRSSChannelItem,
  OpenSearchRSSResponse,
} from "../../types/mod.ts";
import { parseCrazyDate, zenkakuToHankaku } from "../mod.ts";

export const getOpenSearchResult = (
  res: OpenSearchRSSResponse,
): OpenSearchResult => {
  const resultItems = Array.isArray(res.rss.channel.item)
    ? res.rss.channel.item.map((i) => resItemToResultItem(i))
    : [resItemToResultItem(res.rss.channel.item)];

  const result: OpenSearchResult = {
    title: res.rss.channel.title,
    link: res.rss.channel.link,
    description: res.rss.channel.description,
    language: res.rss.channel.language,
    count: res.rss.channel["openSearch:totalResults"],
    startIndex: res.rss.channel["openSearch:startIndex"],
    items: resultItems,
  };
  return result;
};

const resItemToResultItem = (
  resItem: OpenSearchRSSChannelItem,
): OpenSearchResultItem => {
  const seeAlso: OpenSearchResultLink[] = resItem["rdfs:seeAlso"]
    ? Array.isArray(resItem["rdfs:seeAlso"])
      ? (resItem["rdfs:seeAlso"].map((item): OpenSearchResultLink => {
        return {
          type: "seeAlso",
          url: item["@rdf:resource"],
        };
      }))
      : [
        {
          type: "seeAlso",
          url: resItem["rdfs:seeAlso"]["@rdf:resource"],
        },
      ]
    : [];

  const identifier: OpenSearchResultIdentifier[] = resItem["dc:identifier"]
    ? Array.isArray(resItem["dc:identifier"])
      ? resItem["dc:identifier"].map((item): OpenSearchResultIdentifier => {
        return {
          type: item["@xsi:type"].replace(/dcndl:/, "") as Identifier,
          id: String(item["#text"]),
        };
      })
      : [
        {
          type: resItem["dc:identifier"]["@xsi:type"].replace(
            /dcndl:/,
            "",
          ) as Identifier,
          id: String(resItem["dc:identifier"]["#text"]),
        },
      ]
    : [];

  console.log(resItem["dc:subject"]);

  const subject: OpenSearchResultSubject[] = resItem["dc:subject"]
    ? Array.isArray(resItem["dc:subject"])
      ? resItem["dc:subject"].map(
        (item): OpenSearchResultSubject => {
          return typeof item === "string"
            ? {
              policy: "UNKWON",
              code: item,
            }
            : {
              policy: item["@xsi:type"].replace(/dcndl:/, "") as NDLC,
              code: item["#text"],
            };
        },
      )
      : typeof resItem["dc:subject"] === "string"
      ? [{
        policy: "UNKWON",
        code: resItem["dc:subject"],
      }]
      : [{
        policy: resItem["dc:subject"]["@xsi:type"].replace(
          /dcndl:/,
          "",
        ) as NDLC,
        code: resItem["dc:subject"]["#text"],
      }]
    : [];

  //   console.log(resItem["dc:date"]?.toString());

  const item: OpenSearchResultItem = {
    title: {
      value: resItem.title,
      pronounciation: resItem["dcndl:titleTranscription"],
    },
    links: [
      {
        type: "main",
        url: resItem.link,
      },
      ...seeAlso,
    ],
    originalLanguage: resItem["dcndl:originalLanguage"],
    descriptions: Array.isArray(resItem["dc:description"])
      ? resItem["dc:description"].map((item) => zenkakuToHankaku(String(item)))
      : [zenkakuToHankaku(String(resItem["dc:description"]))],
    author: resItem.author,
    publisher: resItem["dc:publisher"],
    informationCreator: resItem["dc:creator"],
    category: resItem.category,
    thumbnail: resItem["foaf:thumbnail"],
    genre: resItem["dcndl:genre"],

    date: {
      something: parseCrazyDate(resItem["dc:date"]),
      issued: resItem["dcterms:issued"]
        ? parseCrazyDate(resItem["dcterms:issued"]["#text"])
        : undefined,

      modified: resItem["dcterms:modified"]
        ? parseCrazyDate(resItem["dcterms:modified"]["#text"])
        : undefined,
      copyrighted: resItem["dcterms:copyrighted"]
        ? parseCrazyDate(resItem["dcterms:copyrighted"]["#text"])
        : undefined,
      submitted: resItem["dcterms:submitted"]
        ? parseCrazyDate(resItem["dcterms:submitted"]["#text"])
        : undefined,
      captured: resItem["dcterms:captured"]
        ? parseCrazyDate(resItem["dcterms:captured"]["#text"])
        : undefined,
      created: resItem["dcterms:created"]
        ? parseCrazyDate(resItem["dcterms:created"]["#text"])
        : undefined,
    },

    price: resItem["dcndl:price"]
      ? zenkakuToHankaku(String(resItem["dcndl:price"]))
      : undefined,
    volume: resItem["dcndl:volume"],
    extent: resItem["dc:extent"]
      ? Array.isArray(resItem["dc:extent"])
        ? resItem["dc:extent"].map((extent) => {
          return zenkakuToHankaku(String(extent));
        })
        : resItem["dc:extent"].split(";").map((item) =>
          zenkakuToHankaku(item.trim())
        )
      : [],

    // pages:
    //   Number(resItem["dc:extent"]?.split(" ")[0].trim().replace("p", "")) ??
    //     undefined,
    // size: resItem["dc:extent"]?.split(" ")[1] ?? undefined,

    identifier: identifier,
    subject: subject,
  };

  return item;
};
