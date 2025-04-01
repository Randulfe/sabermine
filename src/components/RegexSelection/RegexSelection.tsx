interface RegexSelectionProps {
  matches: string[];
}

export const RegexSelection = ({ matches }: RegexSelectionProps) => {
  return (
    <div className="border-text h-full rounded-md border">
      <div className="h-full overflow-y-auto">
        <div className="flex min-w-0 flex-wrap gap-2 p-2">
          {matches.length > 0 &&
            matches.map((match, ix) => (
              <span
                key={ix}
                className="bg-primary inline-block rounded-md px-2 py-1 break-all"
              >
                {match}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};
