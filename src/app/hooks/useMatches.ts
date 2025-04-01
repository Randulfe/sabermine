"use client";
import { useMemo } from "react";

const MAX_MATCHES = 1000;

interface UseMatchesProps {
  regex: string;
  text: string;
}

export const useMatches = ({ regex: inputRegex, text }: UseMatchesProps) => {
  const matches = useMemo(() => {
    if (!inputRegex || !text) return [];
    try {
      const regex = new RegExp(inputRegex, "g");
      const results: string[] = [];
      for (const match of text.matchAll(regex)) {
        results.push(match[0]);
        if (results.length > MAX_MATCHES) break;
      }

      return results;
    } catch {
      return [];
    }
  }, [inputRegex, text]);

  return matches;
};
