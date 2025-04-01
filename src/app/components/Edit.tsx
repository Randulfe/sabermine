"use client";
import { useState } from "react";
import { Button } from "@/components/Button";
import { RegexItem } from "@/components/RegexItem";
import { useRegexStore } from "@/stores/regexStore";
import { useContentStore } from "@/stores/content";

export const Edit = () => {
  const [isAdd, setIsAdd] = useState(false);
  const { text } = useContentStore();
  const { regexes, isLoading, addRegex, setRegex, removeRegex } =
    useRegexStore();

  const handleRegexEdit = (id: string, value: string) => {
    setRegex({ id, value });
  };

  const handleAddRegex = (value: string) => {
    addRegex(value);
    setIsAdd(false);
  };

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <div className="flex w-full flex-col gap-3 px-2">
        <Button
          className="w-full"
          variant="outline"
          size="lg"
          onClick={!isLoading ? () => setIsAdd(true) : undefined}
          disabled={isLoading}
        >
          Add Regex
        </Button>
        {isAdd && (
          <div className="w-full">
            <RegexItem
              text={text}
              isEdit={true}
              onSave={!isLoading ? handleAddRegex : undefined}
              onDismiss={() => setIsAdd(false)}
            />
          </div>
        )}
      </div>
      {regexes.length > 0 && !isLoading && (
        <div className="flex w-full flex-1 flex-col">
          <div className="relative flex-1">
            <div className="from-secondary/10 via-secondary/10 pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b to-transparent" />
            <div className="from-secondary/10 via-secondary/10 pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-t to-transparent" />
            <div className="absolute inset-0 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex flex-col gap-5 px-2 pt-2">
                {regexes?.map((regex) => (
                  <RegexItem
                    key={regex.id}
                    text={text}
                    regex={regex.value}
                    isEdit={false}
                    onSave={(value) => handleRegexEdit(regex.id, value)}
                    onDelete={() => removeRegex(regex.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
