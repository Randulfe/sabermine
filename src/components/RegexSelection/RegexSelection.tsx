interface RegexSelectionProps {
  matches: string[];
}

export const RegexSelection = ({ matches }: RegexSelectionProps) => {
  return (
    <div className="border-text flex flex-wrap gap-2 rounded-md border p-6">
      {matches.length > 0 &&
        matches.map((match, ix) => (
          <span key={ix} className="bg-primary rounded-md px-2 py-1">
            {match}
          </span>
        ))}
    </div>
  );
};
