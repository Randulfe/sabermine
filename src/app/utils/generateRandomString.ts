import { loremIpsum } from "lorem-ipsum";

export const generateRandomString = (): string => {
  return loremIpsum({
    count: Math.floor(Math.random() * 5) + 2,
    units: "paragraphs",
    sentenceLowerBound: 2,
    sentenceUpperBound: 9,
    paragraphLowerBound: 1,
    paragraphUpperBound: 6,
  });
};
