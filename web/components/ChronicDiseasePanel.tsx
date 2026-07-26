"use client";

import { useMemo, useState } from "react";
import { Choropleth, type MapDatum } from "./Choropleth";
import type { IndicatorSeries, StateDatum } from "@/lib/pophive/types";

type Indicator = "diabetes" | "obesity" | "opioidOverdose";

const INDICATOR_LABEL: Record<Indicator, string> = {
  diabetes: "Diabetes",
  obesity: "Obesity",
  opioidOverdose: "Opioid overdose deaths",
};

export interface ChronicDiseasePanelProps {
  diabetes: IndicatorSeries;
  obesity: IndicatorSeries;
  opioidOverdose: IndicatorSeries;
}

function toMapData(states: StateDatum[]): Record<string, MapDatum> {
  const out: Record<string, MapDatum> = {};
  for (const s of states) {
    out[s.stateFips] = { value: s.value, asOf: s.asOf };
  }
  return out;
}

export function ChronicDiseasePanel({
  diabetes,
  obesity,
  opioidOverdose,
}: ChronicDiseasePanelProps) {
  const [indicator, setIndicator] = useState<Indicator>("diabetes");

  const series: IndicatorSeries = { diabetes, obesity, opioidOverdose }[indicator];
  const mapData = useMemo(() => toMapData(series.states), [series]);
  const unit = series.unit.includes("%") ? "%" : ` ${series.unit}`;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
          Chronic Disease &amp; Behavioral Health
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Slower-cadence indicators (monthly to annual, mostly claims-based) — a
          representative slice of the full topic list, not the complete set. This tab
          does not auto-refresh on the same schedule as the outbreak tracker.
        </p>
      </div>

      <div className="flex gap-1 rounded-lg border p-1 self-start" style={{ borderColor: "var(--color-border-default)" }}>
        {(Object.keys(INDICATOR_LABEL) as Indicator[]).map((i) => (
          <button
            key={i}
            onClick={() => setIndicator(i)}
            className="rounded-md px-3 py-1.5 text-sm font-medium"
            style={{
              background: indicator === i ? "var(--color-focus)" : "transparent",
              color: indicator === i ? "white" : "var(--color-text-secondary)",
            }}
          >
            {INDICATOR_LABEL[i]}
          </button>
        ))}
      </div>

      <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
        {series.source} &middot; {series.unit} &middot; as of {series.asOf}
      </p>

      <Choropleth view="states" data={mapData} unit={unit} />
    </div>
  );
}
