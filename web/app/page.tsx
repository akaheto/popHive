import { Dashboard, type DashboardProps } from "@/components/Dashboard";
import overviewJson from "@/data/generated/overview.json";
import statesJson from "@/data/generated/states.json";
import countiesJson from "@/data/generated/counties.json";
import vaccinationJson from "@/data/generated/vaccination.json";
import chronicJson from "@/data/generated/chronic.json";

const overview = overviewJson as DashboardProps["overview"];
const states = statesJson as unknown as DashboardProps["states"];
const counties = countiesJson as unknown as DashboardProps["counties"];
const vaccination = vaccinationJson as unknown as DashboardProps["vaccination"];
const chronic = chronicJson as unknown as DashboardProps["chronic"];

export default function Home() {
  return (
    <div className="min-h-full" style={{ background: "var(--color-bg-page)" }}>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
            Public Health Surveillance Dashboard
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            Current US disease activity, sourced from PopHIVE (Yale School of Public
            Health). Personal reference — not a clinical or outbreak-classification tool.
          </p>
        </header>
        <Dashboard
          overview={overview}
          states={states}
          counties={counties}
          vaccination={vaccination}
          chronic={chronic}
        />
      </main>
    </div>
  );
}
