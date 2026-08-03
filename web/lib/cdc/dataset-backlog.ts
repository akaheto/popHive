// Dataset Backlog - Additional CDC datasets to integrate
// Add datasets here as you discover them; they'll be prioritized for Phase 2+

export interface BacklogDataset {
  id: string;
  name: string;
  category: string;
  endpoint: string;
  priority: "high" | "medium" | "low";
  notes: string;
  addedAt: string;
  updateFrequency?: "daily" | "weekly" | "monthly" | "annual";
  typicalLag?: string;
}

// Integrated datasets (now in Tier 1)
const INTEGRATED = [
  // 2026-08-03: Promoted to Tier 1 - covid-test-positivity
  // 2026-08-03: Promoted to Tier 1 - syndromic-surveillance-conditions
  // 2026-08-02: Already in Tier 1 as nndss-weekly
];

export const DATASET_BACKLOG: BacklogDataset[] = [
  // High-priority datasets waiting for integration
];

export function addToBacklog(dataset: BacklogDataset): void {
  DATASET_BACKLOG.push(dataset);
}

export function getBacklogByCategory(category: string): BacklogDataset[] {
  return DATASET_BACKLOG.filter((d) => d.category === category);
}

export function getBacklogByPriority(priority: "high" | "medium" | "low"): BacklogDataset[] {
  return DATASET_BACKLOG.filter((d) => d.priority === priority);
}
