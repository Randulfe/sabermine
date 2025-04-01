"use client";
import { Button } from "@/components/Button";
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
import { Check } from "lucide-react";
import { useMemo } from "react";
import { useMatches } from "../hooks/useMatches";

export const View = () => {
  const { regexes, selectedId, isLoading, setSelectedRegex, setRegex } =
    useRegexStore();
  const { text } = useContentStore();

  const selectedRegex = useMemo(() => {
    return regexes?.find((regex) => regex.id === selectedId);
  }, [selectedId, regexes]);

  const matches = useMatches({
    regex: selectedRegex?.value || "",
    text,
  });

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
      {selectedRegex && (
        <div className="flex h-92 flex-col gap-3">
          <RegexSelection matches={matches} />
          {selectedRegex.isApproved ? (
            <div className="flex flex-row items-center gap-1 self-end">
              <p className="text-emerald-800">Approved</p>
              <Check className="text-emerald-800" />
            </div>
          ) : (
            <Button
              variant="outline"
              className="self-end"
              onClick={() =>
                setRegex({ id: selectedRegex.id, isApproved: true })
              }
            >
              Approve <Check />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
