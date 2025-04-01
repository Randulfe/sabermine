"use client";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/TextArea";
import { useContentStore } from "@/stores/content";
import { RefreshCcw } from "lucide-react";

export const Content = () => {
  const { text, isLoading, generateRandomText, setText } = useContentStore();

  return (
    <div className="flex w-full flex-col items-center p-4 md:p-12 lg:py-20">
      <div className="flex w-full max-w-[1500px] flex-1 flex-col gap-3 overflow-auto">
        <Textarea
          value={isLoading ? "" : text}
          className="max-h-1/2 min-h-1/2 text-sm md:text-xl"
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          className="self-end"
          aria-label="Generate new text"
          variant="outline"
          onClick={isLoading ? undefined : generateRandomText}
          disabled={isLoading}
        >
          <RefreshCcw />
        </Button>
      </div>
    </div>
  );
};
