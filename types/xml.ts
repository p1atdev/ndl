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
  "dc:date"?: number;
  "dcterms:issued": OpenSearchRSSChannelItemDctermsIssued;
  "dcndl:price"?: string;
  "dc:extent"?: string;
  "dc:identifier":
    | OpenSearchRSSChannelItemDcIdentifierElement[]
    | OpenSearchRSSChannelItemDctermsIssued;
  "dc:subject": OpenSearchRSSChannelItemDcSubject;
  "dc:description": string[];
  "rdfs:seeAlso": OpenSearchRSSChannelItemRdfsSeeAlso;
  "dc:creator"?: string;
  "dcterms:isPartOf"?: OpenSearchRSSChannelItemRdfsSeeAlso[];
}

export interface OpenSearchRSSChannelItemDcIdentifierElement {
  "@xsi:type": string;
  "#text": number | string;
}

export interface OpenSearchRSSChannelItemDctermsIssued {
  "@xsi:type": string;
  "#text": number;
}

export interface OpenSearchRSSChannelItemDcSubject {
  "@xsi:type": string;
  "#text": string;
}

export interface OpenSearchRSSChannelItemRdfsSeeAlso {
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
