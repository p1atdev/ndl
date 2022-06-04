import { xml } from "../deps.ts";

export const parseXML = <T>(xmlString: string): T => {
  const doc = xml.parse(xmlString);

  return JSON.parse(JSON.stringify(doc));
};
