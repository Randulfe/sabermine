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
import { useContentStore } from "@/stores/content";
import { useRegexStore } from "@/stores/regexStore";
import { useMemo } from "react";
import { useMatches } from "../hooks/useMatches";

export const View = () => {
  const {
    regexes,
    selectedId,
    isLoading,
    setSelectedRegex,
    setApprovedMatches,
  } = useRegexStore();
  const { text } = useContentStore();

  const selectedRegex = useMemo(() => {
    return regexes?.find((regex) => regex.id === selectedId);
  }, [selectedId, regexes]);

  const matches = useMatches({
    regex: selectedRegex?.value || "",
    text,
  });

  const handleApproval = (
    approvedMatches: Set<string>,
    disapprovedMatches: Set<string>,
  ) => {
    if (!selectedId) return;
    setApprovedMatches({ id: selectedId, approvedMatches, disapprovedMatches });
  };

  return (
    <div className="flex h-full w-full flex-col gap-6">
      {regexes.length > 0 && !isLoading ? (
        <Select value={selectedRegex?.id} onValueChange={setSelectedRegex}>
          <SelectTrigger>
            <SelectValue placeholder="Select a Regex to approve" />
          </SelectTrigger>
          <SelectContent className="bg-background max-h-92">
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
      {selectedRegex && !isLoading && (
        <div className="flex flex-col gap-3">
          <RegexSelection
            matches={matches}
            approvedMatches={selectedRegex.approvedMatches}
            onSave={handleApproval}
          />
        </div>
      )}
    </div>
  );
};
