import type { ReactNode } from "react";

interface TimelineProps<T> {
  items: T[];
  getKey: (item: T) => string;
  getYear: (item: T) => string;
  renderItem: (item: T) => ReactNode;
}

interface YearGroup<T> {
  year: string;
  items: T[];
}

function groupByYear<T>(items: T[], getYear: (item: T) => string): YearGroup<T>[] {
  const groups: YearGroup<T>[] = [];

  for (const item of items) {
    const year = getYear(item);
    const last = groups[groups.length - 1];

    if (last && last.year === year) {
      last.items.push(item);
    } else {
      groups.push({ year, items: [item] });
    }
  }

  return groups;
}

/**
 * Year-driven vertical timeline. The year is the primary marker;
 * month and other details stay as subtle supporting metadata on the cards.
 */
export default function Timeline<T>({ items, getKey, getYear, renderItem }: TimelineProps<T>) {
  const groups = groupByYear(items, getYear);

  return (
    <ol className="relative">
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-line sm:left-[0.9375rem]"
      />

      {groups.map((group) => (
        <li key={group.year} className="relative pb-10 last:pb-0">
          <div className="flex items-center gap-3 pl-0">
            <span
              aria-hidden="true"
              className="relative z-10 flex h-[1.375rem] w-[1.375rem] shrink-0 items-center justify-center rounded-full border-2 border-accent bg-cream sm:h-[1.875rem] sm:w-[1.875rem]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-deep" />
            </span>

            <h3 className="font-mono text-lg font-semibold tracking-tight text-ink sm:text-xl">
              {group.year}
            </h3>
          </div>

          <div className="mt-4 space-y-5 pl-[2.1rem] sm:pl-[2.9rem]">
            {group.items.map((item) => (
              <div key={getKey(item)}>{renderItem(item)}</div>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
