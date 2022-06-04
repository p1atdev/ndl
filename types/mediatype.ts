export type MediaTypeNum =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

export type MediaTypeText =
  | "book"
  | "journal"
  | "newspaper"
  | "children"
  | "reference"
  | "digital"
  | "other"
  | "handicapped"
  | "legislation";

export const mediaTypeText: {
  [key in MediaTypeText]: MediaTypeNum;
} = {
  book: "1",
  journal: "2",
  newspaper: "3",
  children: "4",
  reference: "5",
  digital: "6",
  other: "7",
  handicapped: "8",
  legislation: "9",
};

export const mediaTypeNum: {
  [key in MediaTypeNum]: MediaTypeText;
} = {
  1: "book",
  2: "journal",
  3: "newspaper",
  4: "children",
  5: "reference",
  6: "digital",
  7: "other",
  8: "handicapped",
  9: "legislation",
};
