import Link from "next/link";
import { locations } from "@/config/site";

/**
 * A slim strip directly under the hero answering the two questions a cold
 * visitor has first: where is this, and is it open? The full locations grid
 * stays further down the page — this exists only to stop those two facts
 * being six sections deep.
 */
export function StatusBand() {
  const flagship = locations.find((l) => l.status === "flagship")!;
  const openCities = locations
    .filter((l) => l.status === "open")
    .map((l) => l.city);

  // "Markham, Oakville & Mississauga"
  const cityList =
    openCities.slice(0, -1).join(", ") + " & " + openCities.at(-1);

  return (
    <div className="border-y border-[var(--bg-elevated)] bg-[var(--bg-surface)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="flex flex-col gap-x-3 gap-y-1 text-sm sm:flex-row sm:items-center">
          <span className="font-bold uppercase tracking-[0.12em] text-[var(--accent-lime)]">
            {flagship.city} flagship opening soon
          </span>
          <span
            aria-hidden="true"
            className="hidden text-[var(--text-secondary)] sm:inline"
          >
            ·
          </span>
          <span className="text-[var(--text-secondary)]">
            Now training in {cityList}
          </span>
        </p>

        <Link
          href="/locations"
          className="shrink-0 text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-primary)] underline underline-offset-4 transition-colors duration-150 hover:text-[var(--accent-lime)]"
        >
          See all locations
        </Link>
      </div>
    </div>
  );
}
