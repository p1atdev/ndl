// see: https://www.ndl.go.jp/jp/dlib/standards/meta/2020/12/terms-list.pdf

/**
 * NDLC分類コード
 */
export type NDLC =
  | "BSH"
  | "GHQSCAP"
  | "LibType"
  | "NDLC"
  | "MCJ"
  | "NDC"
  | "NDC8"
  | "NDC9"
  | "NDC10"
  | "NDLC10"
  | "NDLSH"
  | "NDLGFT"
  | "NDLNA"
  | "NDLType"
  | "NIISubject"
  | "NIIType"
  | "USCAR"
  | "UNKWON";

/**
 * 識別コード
 */
export type Identifier = "ISBN" | "NDLBibID" | "JPNO" | "RIS502" | "UNKWON";

export interface OpenSearchRSSResponse {
  xml: XML;
  rss: OpenSearchRSS;
}

export interface OpenSearchRSS {
  "@version": number;
  "@xmlns:dc": string;
  "@xmlns:openSearch": string;
  "@xmlns:dcndl": string;
  "@xmlns:dcmitype": string;
  "@xmlns:dcterms": string;
  "@xmlns:xsi": string;
  "@xmlns:rdfs": string;
  "@xmlns:rdf": string;
  channel: OpenSearchRSSChannel;
}

export interface OpenSearchRSSChannel {
  title: string;
  link: string;
  description: string;
  language: string;
  "openSearch:totalResults": number;
  "openSearch:startIndex": number;
  "openSearch:itemsPerPage": number;
  item: OpenSearchRSSChannelItem | OpenSearchRSSChannelItem[];
}

export interface OpenSearchRSSChannelItem {
  title: string;
  link: string;
  description: string;
  author: string;
  category: string;
  guid: OpenSearchRSSChannelItemGUID;
  pubDate: string;
  "dc:title": string;
  "dcndl:titleTranscription": string;
  "dc:publisher"?: string;
  "dc:date"?: string;
  "dcterms:issued"?: OpenSearchRSSChannelXSIItem;
  "dcterms:modified"?: OpenSearchRSSChannelXSIItem;
  "dcterms:copyrighted"?: OpenSearchRSSChannelXSIItem;
  "dcterms:submitted"?: OpenSearchRSSChannelXSIItem;
  "dcterms:captured"?: OpenSearchRSSChannelXSIItem;
  "dcterms:created"?: OpenSearchRSSChannelXSIItem;
  "dcndl:price"?: string | number;
  "dcndl:genre"?: string;
  "dcndl:volume"?: string;
  "dcndl:originalLanguage"?: string;
  "dc:extent"?: string | string[];
  "dc:identifier"?:
    | OpenSearchRSSChannelIdentifier[]
    | OpenSearchRSSChannelIdentifier;
  "dc:subject"?:
    | OpenSearchRSSChannelSubject
    | string
    | (OpenSearchRSSChannelSubject | string)[];
  "dc:description": string | string[];
  "rdfs:seeAlso"?: OpenSearchRSSChannelRDFItem | OpenSearchRSSChannelRDFItem[];
  "dc:creator"?: string;
  "dcterms:isPartOf"?: OpenSearchRSSChannelRDFItem[];
  "foaf:thumbnail"?: string;
}

export interface OpenSearchRSSChannelIdentifier {
  "@xsi:type": Identifier;
  "#text": number | string;
}

export interface OpenSearchRSSChannelSubject {
  "@xsi:type": NDLC;
  "#text": string;
}

export interface OpenSearchRSSChannelXSIItem {
  "@xsi:type": string;
  "#text": number | string;
}

export interface OpenSearchRSSChannelRDFItem {
  "@rdf:resource": string;
  "#text": null;
}

export interface OpenSearchRSSChannelItemGUID {
  "@isPermaLink": boolean;
  "#text": string;
}

export interface XML {
  "@version": number;
  "@encoding": string;
}
