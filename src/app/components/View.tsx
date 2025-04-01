"use client";
import { RegexSelection } from "@/components/RegexSelection";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectContent,
} from "@/components/Select";
import { useRegexStore } from "@/stores/regexStore";
import { useState } from "react";
export const View = () => {
  const { regexes } = useRegexStore();
  const [selectedRegex, setSelectedRegex] = useState<string | null>(null);
  return (
    <div className="flex h-full w-full flex-col gap-6">
      {regexes.length > 0 ? (
        <Select onValueChange={setSelectedRegex}>
          <SelectTrigger>
            <SelectValue placeholder="Select a Regex" />
          </SelectTrigger>
          <SelectContent className="max-h-92">
            <SelectGroup>
              {regexes.map((regex) => (
                <SelectItem key={regex.id} value={regex.id}>
                  {regex.value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <p>You should first create a regex to select your extractions</p>
      )}
      {selectedRegex && <RegexSelection matches={[]} />}
    </div>
  );
};
