"use client";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/TextArea";
import { useContentStore } from "@/stores/content";
import { RefreshCcw } from "lucide-react";

export const Content = () => {
  const { text, isLoading, generateRandomText, setText } = useContentStore();

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-auto p-12">
      <Textarea
        value={isLoading ? "" : text}
        className="max-h-1/2 min-h-1/2"
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        className="self-end"
        aria-label="Generate new text"
        variant="outline"
        onClick={generateRandomText}
      >
        <RefreshCcw />
      </Button>
    </div>
  );
};
