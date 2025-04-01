import { Check, Edit, Trash, X } from "lucide-react";
import { Button } from "../Button/Button";
import { useState } from "react";
import { Input } from "../Input/Input";
import { useMatches } from "@/app/hooks/useMatches";
import { RegexSelection } from "../RegexSelection";

interface RegexItemProps {
  text?: string;
  regex?: string;
  isEdit?: boolean;
  onSave?: (regex: string) => void;
  onDelete?: () => void;
  onDismiss?: () => void;
}

const MIN_LENGTH = 1;
const MAX_LENGTH = 500;
const CATASTROPHIC_BACKTRACKING_REGEX = /\((?:[^\)]*[+*{])[^\)]*\)[+*{]/;

// Heuristic for potential catastrophic backtracking
const hasCatastrophicBacktracking = (pattern: string): boolean => {
  return CATASTROPHIC_BACKTRACKING_REGEX.test(pattern);
};

export const RegexItem = ({
  text = "",
  regex,
  isEdit = false,
  onSave,
  onDismiss,
  onDelete,
}: RegexItemProps) => {
  const [value, setValue] = useState(regex ?? "");
  const [savedValue, setSavedValue] = useState(regex ?? "");
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(isEdit);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (newValue === savedValue) return;
    if (newValue.length < MIN_LENGTH) {
      setError(`Regex cannot be empty`);
      return;
    }
    if (newValue.length > MAX_LENGTH) {
      setError(`Regex cannot be longer than ${MAX_LENGTH} characters`);
      return;
    }
    try {
      new RegExp(newValue);
      setError(null);
      if (hasCatastrophicBacktracking(newValue)) {
        setWarning(
          "Warning: This regex might lead to catastrophic backtracking.",
        );
      } else {
        setWarning(null);
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Invalid regex");
    }
  };

  const handleSave = () => {
    if (error) return;
    if (value.length === 0) return;
    onSave?.(value);
    if (!regex) setSavedValue(value);
    setIsEditing(false);
  };

  const handleEnterSave = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
  };

  const handleCancel = () => {
    onDismiss?.();
    setError(null);
    setValue(regex ?? savedValue);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const matches = useMatches({
    regex: !error ? value : "",
    text: !error ? text : "",
  });

  return (
    <div className="flex h-full w-full flex-row items-center gap-2 sm:gap-4">
      {isEditing ? (
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <Input
              value={value}
              minLength={MIN_LENGTH}
              maxLength={MAX_LENGTH}
              onChange={handleChange}
              onKeyDown={handleEnterSave}
              aria-invalid={
                Boolean(error) || value.length === 0 || value === savedValue
              }
            />
            <div className="flex flex-row gap-2">
              <Button
                aria-label="Save"
                disabled={
                  Boolean(error) || value.length === 0 || value === savedValue
                }
                size="sm"
                onClick={handleSave}
              >
                <Check />
              </Button>
              <Button
                aria-label="Cancel"
                variant="outline"
                size="sm"
                onClick={handleCancel}
              >
                <X />
              </Button>
            </div>
          </div>
          {error && <p className="text-sm text-red-800">{error}</p>}
          {warning && <p className="text-sm text-yellow-800">{warning}</p>}
          <div className="h-24 pt-2">
            <RegexSelection matches={matches} />
          </div>
        </div>
      ) : (
        <>
          <p className="text-md w-full truncate pl-3">{regex ?? savedValue}</p>
          <div className="flex flex-row gap-2">
            <Button
              aria-label="Edit"
              variant="secondary"
              size="sm"
              onClick={handleEdit}
            >
              <Edit />
            </Button>
            {onDelete && (
              <Button
                aria-label="Delete"
                variant="destructive"
                size="sm"
                onClick={onDelete}
              >
                <Trash />
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
