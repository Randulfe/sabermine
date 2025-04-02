import { useEffect, useMemo, useState } from "react";
import { Button } from "../Button";
import { Check } from "lucide-react";

interface RegexSelectionProps {
  matches: string[];
  approvedMatches?: Set<string>;
  onSave?: (
    approvedMatches: Set<string>,
    disapprovedMatches: Set<string>,
  ) => void;
}

const addToSet = (set: Set<string>, match: string) => {
  const newSet = new Set(set);
  newSet.add(match);
  return newSet;
};

const removeFromSet = (set: Set<string>, match: string) => {
  const newSet = new Set(set);
  newSet.delete(match);
  return newSet;
};

export const RegexSelection = ({
  matches,
  approvedMatches,
  onSave,
}: RegexSelectionProps) => {
  const [isDirty, setIsDirty] = useState(
    approvedMatches && approvedMatches.size === 0,
  );
  const [newApprovedMatches, setNewApprovedMatches] = useState(
    new Set(approvedMatches) ?? new Set<string>(),
  );
  const [disapprovedMatches, setDisapprovedMatches] = useState(
    new Set<string>(),
  );

  const uniqueMatches = useMemo(() => {
    return Array.from(new Set(matches));
  }, [matches]);

  useEffect(() => {
    setNewApprovedMatches(new Set(approvedMatches));
  }, [approvedMatches]);

  const handleSelect = (match: string) => {
    if (!newApprovedMatches || !approvedMatches || !onSave) return;
    if (newApprovedMatches.has(match)) {
      setNewApprovedMatches((prevSet) => removeFromSet(prevSet, match));
      setDisapprovedMatches((prevSet) => addToSet(prevSet, match));
    } else {
      setNewApprovedMatches((prevSet) => addToSet(prevSet, match));
      setDisapprovedMatches((prevSet) => removeFromSet(prevSet, match));
    }
    setIsDirty(true);
  };

  const handleSave = () => {
    if (!isDirty || !onSave) return;
    onSave(newApprovedMatches, disapprovedMatches);
    setIsDirty(false);
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="border-text min-h-0 flex-1 rounded-md border">
        <div className="h-full overflow-y-auto">
          <div className="flex min-w-0 flex-wrap gap-2 p-2">
            {uniqueMatches.length > 0 &&
              uniqueMatches.map((match, ix) => (
                <span
                  key={ix}
                  className={`inline-block rounded-md px-2 py-1 break-all ${newApprovedMatches.has(match) ? "bg-primary" : "bg-background ring-accent ring-1 ring-inset"} ${onSave ? "cursor-pointer" : ""}`}
                  onClick={() => handleSelect(match)}
                >
                  {match}
                </span>
              ))}
          </div>
        </div>
      </div>
      {approvedMatches && onSave && (
        <div className="flex h-10 items-center self-end">
          {isDirty ? (
            <Button
              type="submit"
              variant="outline"
              onClick={handleSave}
              disabled={!isDirty}
            >
              Approve Selection <Check />
            </Button>
          ) : (
            <div className="flex flex-row items-center gap-1 py-2">
              Approved <Check />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
