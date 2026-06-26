interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: Array<SegmentedOption<T>>;
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
}) {
  return (
    <div className="segmented" role="group" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`segmented-option ${value === option.value ? "is-active" : ""}`}
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
