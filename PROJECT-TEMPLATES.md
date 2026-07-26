<!-- Source template: claude-workflow/templates/00-brief.md -->
# Task Brief

- Task ID:
- Owner:
- Requester:
- Created:
- Status: `NOT STARTED`
- Confirmed discovery interview:

## Desired outcome

What should be true when this work succeeds?

This must match the confirmed goal in `00-discovery-interview.md`.

## User or business value

Why does this matter?

## Context

Relevant background, existing behavior, and references.

## Constraints

- Time:
- Technical:
- Policy or compliance:
- Compatibility:

## Inputs and dependencies

| Item | Source or owner | Available? | Notes |
|---|---|---:|---|
| | | | |

## Open questions

| Question | Owner | Blocking? | Resolution |
|---|---|---:|---|
| | | | |

---

<!-- Source template: claude-workflow/templates/00-discovery-interview.md -->
# Discovery Interview

This document must reflect a real exchange with the user. Record concise
answers, follow-up questions, and confirmation. Do not convert guesses into
requirements.

## Interview record

- Project:
- Interviewer:
- Participants and roles:
- Date:
- Status: `NOT STARTED`

## 1. Goal and motivation

- What should this project accomplish?
- What problem or opportunity prompted it?
- Why does it matter now?
- What would happen if nothing changed?

### Notes

- 

## 2. Users and context

- Who are the primary and secondary users?
- What are they trying to accomplish?
- Where, when, and on what devices will they use the output?
- What knowledge, permissions, or accessibility needs do they have?

### Notes

- 

## 3. Workflows and outcomes

- What are the most important user journeys?
- What inputs are available and what outputs are expected?
- What does a successful first release enable?
- What outcomes would make the project unsuccessful?

### Notes

- 

## 4. Priorities and scope boundaries

- What is essential, desirable, and optional?
- What must not be changed or included?
- Which tradeoffs favor speed, quality, cost, flexibility, or simplicity?
- Is there a deadline or milestone that drives the work?

### Notes

- 

## 5. Environment and constraints

- What existing tools, systems, data, APIs, or processes are involved?
- What technical, legal, security, privacy, brand, or budget constraints apply?
- Who makes decisions and who approves the result?
- What dependencies or known risks exist?

### Notes

- 

## 6. Visual direction

- What should the product feel like to users?
- Are there existing brand standards or products to align with?
- Which examples should influence the design, and what specifically works?
- Which visual or interaction patterns should be avoided?
- What accessibility and device requirements are mandatory?

### Notes

- 

## 7. Success and validation

- How will success be measured?
- Which acceptance signals matter most?
- Who will test or review the result?
- What evidence is required before release?

### Notes

- 

## Facts, assumptions, and unknowns

| ID | Type | Statement | Source or owner | Risk | Validation |
|---|---|---|---|---|---|
| F-001 | `FACT` | | | | |
| A-001 | `ASSUMPTION` | | | | |
| Q-001 | `OPEN QUESTION` | | | | |

## Interpreted project brief

### Goal

In plain language, describe what will be achieved and for whom.

### First-release outcome

- 

### Priorities

1. 

### Constraints and exclusions

- 

### Proposed assumptions requiring acceptance

- 

## User confirmation

- Confirmation status: `PENDING | CONFIRMED | CONFIRMED WITH CHANGES`
- Confirmed by:
- Date:
- Changes requested:
- Evidence or reference:

Discovery is complete only when the interpreted brief is confirmed and all
blocking questions are resolved.


---

<!-- Source template: claude-workflow/templates/01-scope.md -->
# Scope

## In scope

- 

## Out of scope

- 

## Deliverables

- 

## Acceptance criteria

Use observable outcomes.

- [ ] AC-1:
- [ ] AC-2:

## Assumptions

| Assumption | Confidence | Validation method | Result |
|---|---|---|---|
| | | | |

Carry forward every unresolved assumption from `00-discovery-interview.md`.
Do not introduce a new material assumption without recording its source, risk,
and validation method.

## Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| | | | | |

## Scope approval

- Approved by:
- Date:
- Notes:

---

<!-- Source template: claude-workflow/templates/02-plan.md -->
# Execution Plan

## Approach

Summarize the intended solution and key tradeoffs.

## Steps

| # | Step | Deliverable | Verification | Depends on | Status |
|---:|---|---|---|---|---|
| 1 | | | | | `NOT STARTED` |

## Change surface

Files, systems, users, or processes that may be affected.

## Recovery plan

How can the change be safely reversed or corrected?

## Plan review

- Reviewed by:
- Date:
- Concerns:


---

<!-- Source template: claude-workflow/templates/03-decisions.md -->
# Decision Log

Record choices that affect scope, architecture, behavior, risk, or schedule.

## Decision template

### D-001 — Decision title

- Date:
- Status: `PROPOSED | ACCEPTED | REVERSED`
- Context:
- Options considered:
- Decision:
- Rationale:
- Consequences:
- Approved by:

## Deviations

| Date | Planned | Actual | Reason | Impact | Approved by |
|---|---|---|---|---|---|
| | | | | | |


---

<!-- Source template: claude-workflow/templates/04-status.md -->
# Status and Accountability

- Overall status: `NOT STARTED`
- Owner:
- Last updated:
- Current gate:

## Progress

- Completed:
- In progress:
- Next:

## Current milestone

- Milestone:
- Goal:
- Owner:
- Started:
- Target:
- Definition of done:
- Status:
- Evidence:

## Blockers

| Blocker | Since | Owner | Required action | Target date |
|---|---|---|---|---|
| | | | | |

## Commitments

| Commitment | Owner | Due | Status | Evidence |
|---|---|---|---|---|
| | | | | |

## Completion summary

- Delivered:
- Not delivered:
- Remaining risks:
- Follow-up owner:

---

<!-- Source template: claude-workflow/templates/05-tests.md -->
# Test Plan and Results

## Acceptance-criteria coverage

| Criterion | Test or check | Expected result | Actual result | Evidence | Status |
|---|---|---|---|---|---|
| AC-1 | | | | | `NOT RUN` |

## Test categories

- [ ] Expected path
- [ ] Edge cases
- [ ] Failure handling
- [ ] Regression behavior
- [ ] Security and privacy, if relevant
- [ ] Performance and accessibility, if relevant

## Automated checks

| Check | Result | Evidence |
|---|---|---|
| | | |

## Manual checks

| Scenario | Steps | Result | Evidence |
|---|---|---|---|
| | | | |

## Skipped or failed checks

| Check | Reason | Risk | Owner and follow-up |
|---|---|---|---|
| | | | |


---

<!-- Source template: claude-workflow/templates/06-qa.md -->
# Quality Review

## Review checklist

- [ ] Behavior matches the acceptance criteria.
- [ ] Scope was not expanded without approval.
- [ ] Errors and edge cases are handled.
- [ ] Changes are understandable and maintainable.
- [ ] Security and privacy risks were considered.
- [ ] User-facing behavior and accessibility were reviewed.
- [ ] Documentation matches the delivered behavior.
- [ ] The output follows the approved visual style guide.
- [ ] Representative responsive and interaction states were reviewed.
- [ ] Visual exceptions are documented and approved.
- [ ] Tests are meaningful and results are recorded.
- [ ] Temporary artifacts and debug output were removed.
- [ ] Remaining limitations are disclosed.

## Findings

| ID | Severity | Finding | Required action | Owner | Status |
|---|---|---|---|---|---|
| QA-1 | | | | | |

Severity: `CRITICAL | HIGH | MEDIUM | LOW`

## Evidence reviewed

- 

## QA decision

- Decision: `PASS | PASS WITH RISKS | FAIL`
- Reviewer:
- Date:
- Residual risks:

---

<!-- Source template: claude-workflow/templates/07-retro.md -->
# Retrospective

## Outcome

- Final status:
- Acceptance criteria met:
- Evidence:

## What went well

- 

## What did not go well

- 

## Surprises and root causes

- 

## Process improvements

| Improvement | Owner | Due | Success measure |
|---|---|---|---|
| | | | |

## Reusable learning candidates

| Learning | Evidence | Promote to `LEARNINGS.md`? |
|---|---|---:|
| | | |

## Follow-ups

| Action | Owner | Due | Tracking location |
|---|---|---|---|
| | | | |


---

<!-- Source template: claude-workflow/templates/08-project-plan.md -->
# Agile Project Plan

This is a living document. Update it whenever a milestone starts, changes
status, becomes blocked, or satisfies its definition of done.

## Project overview

- Project:
- Product owner:
- Delivery owner:
- Started:
- Target outcome:
- Overall status: `NOT STARTED`
- Last updated:

## Product goal

Describe the user or business outcome this project will produce.

## Delivery approach

- Cadence: `MILESTONE | SPRINT`
- Review frequency:
- Prioritization method:
- Release strategy:

## Definition of ready

A backlog item is ready when:

- [ ] User value is clear.
- [ ] Scope and acceptance criteria are defined.
- [ ] Dependencies and risks are understood.
- [ ] The item can be verified.

## Project definition of done

- [ ] Acceptance criteria are satisfied.
- [ ] Required tests pass and evidence is recorded.
- [ ] QA is complete.
- [ ] User guide is current.
- [ ] Technical specification is current.
- [ ] Enhancement register is current.
- [ ] Visual style guide and representative examples are current.
- [ ] Risks, limitations, and follow-ups have owners.

## Milestone roadmap

| ID | Milestone | Goal | Owner | Target | Status | Started | Completed |
|---|---|---|---|---|---|---|---|
| M1 | | | | | `NOT STARTED` | | |

## Milestone details

### M1 — Milestone name

- Goal:
- Owner:
- Dependencies:
- Planned deliverables:
- Acceptance criteria:
  - [ ]
- Definition of done:
  - [ ] Acceptance criteria verified.
  - [ ] Test and QA evidence linked.
  - [ ] Living documentation updated.
  - [ ] Visual standards and approved exceptions updated.
- Status: `NOT STARTED`
- Start note:
- Completion note:
- Evidence:

## Prioritized backlog

| ID | User story or task | Value | Priority | Milestone | Owner | Status | Evidence |
|---|---|---|---|---|---|---|---|
| B-001 | As a ..., I want ..., so that ... | | | | | `NOT STARTED` | |

## Risks, issues, and dependencies

| ID | Type | Description | Impact | Owner | Mitigation or action | Status |
|---|---|---|---|---|---|---|
| R-001 | `RISK` | | | | | `OPEN` |

## Change log

| Date | Change | Reason | Impact | Updated by |
|---|---|---|---|---|
| | | | | |

---

<!-- Source template: claude-workflow/templates/09-user-guide.md -->
# User Guide

Keep these instructions aligned with the delivered behavior. Write for the
actual user, avoiding implementation detail unless it helps them succeed.

## Purpose

What the output does and the problem it solves.

## Intended audience

- Primary users:
- Expected knowledge:

## Prerequisites

- 

## Installation or access

1. 

## Configuration

| Setting | Purpose | Required? | Default | Example |
|---|---|---:|---|---|
| | | | | |

Do not include real secrets or credentials.

## Quick start

1. 
2. 
3. 

## Core workflows

### Workflow name

- Goal:
- Before you begin:
- Steps:
  1.
- Expected result:

## Inputs and outputs

| Item | Format | Description | Example |
|---|---|---|---|
| | | | |

## Common problems

| Symptom | Likely cause | Resolution |
|---|---|---|
| | | |

## Limitations and safe use

- 

## Getting help

- Support owner or channel:
- Information to include:

## Version history

| Date | Version or milestone | User-facing change |
|---|---|---|
| | | |

## Documentation QA

- [ ] Instructions were tested against the delivered output.
- [ ] Names, labels, screenshots, and workflows match the approved visual
      style guide and current product.
- [ ] Accessibility instructions and keyboard behavior are documented where
      relevant.

---

<!-- Source template: claude-workflow/templates/10-technical-specification.md -->
# Technical Specification

This is the technical source of truth for the delivered build. Update it in
the same milestone as any architectural, interface, data, configuration, or
deployment change.

## System purpose and scope

- Purpose:
- In scope:
- Out of scope:

## Architecture overview

Describe the system boundaries, major components, and how data or control
moves between them. Add a diagram when it improves understanding.

## Components

| Component | Responsibility | Technology | Inputs | Outputs | Owner |
|---|---|---|---|---|---|
| | | | | | |

## Folder structure

```text
project/
  path/    # responsibility
```

## Code organization

| Module or package | Responsibility | Key interfaces | Dependencies |
|---|---|---|---|
| | | | |

## APIs and integrations

| API or service | Direction | Purpose | Authentication | Contract or version | Failure handling |
|---|---|---|---|---|---|
| | | | | | |

For each owned endpoint, document:

- Method and path:
- Purpose:
- Request:
- Response:
- Validation:
- Error behavior:
- Authorization:
- Rate or usage limits:

## Data model and storage

| Entity or store | Purpose | Key fields | Retention | Sensitivity |
|---|---|---|---|---|
| | | | | |

## Configuration

| Variable or setting | Purpose | Required? | Default | Secret? |
|---|---|---:|---|---:|
| | | | | |

Never record actual secret values.

## Dependencies

| Dependency | Version | Purpose | Update or compatibility notes |
|---|---|---|---|
| | | | |

## Security and privacy

- Trust boundaries:
- Authentication and authorization:
- Sensitive data handling:
- Validation and sanitization:
- Logging and audit:
- Known risks:

## Error handling and observability

- Error strategy:
- Logging:
- Metrics:
- Alerts:
- Health checks:

## Build, test, and deployment

- Local setup:
- Build:
- Automated tests:
- Manual verification:
- Deployment:
- Rollback:

## Performance, reliability, and accessibility

- Expected load:
- Performance requirements:
- Availability or recovery expectations:
- Accessibility requirements:

## Technical limitations and debt

| Item | Impact | Workaround | Tracking reference |
|---|---|---|---|
| | | | |

## Specification change log

| Date | Milestone | Technical change | Related decision |
|---|---|---|---|
| | | | |


---

<!-- Source template: claude-workflow/templates/11-future-enhancements.md -->
# Future Enhancements

Use this register for ideas that are valuable but outside the current
committed scope. Reassess it during planning and after every milestone.

## Status values

- `CANDIDATE`
- `DISCOVERY`
- `PLANNED`
- `IN PROGRESS`
- `DELIVERED`
- `DEFERRED`
- `REJECTED`

## Enhancement register

| ID | Enhancement | User value | Priority | Effort | Dependencies | Source | Status | Target |
|---|---|---|---|---|---|---|---|---|
| E-001 | | | | | | | `CANDIDATE` | |

## Enhancement details

### E-001 — Enhancement title

- Problem or opportunity:
- Proposed outcome:
- Users affected:
- Expected value:
- Rough effort:
- Dependencies:
- Risks:
- Success measure:
- Decision and rationale:
- Related milestone or task:
- Status: `CANDIDATE`

## Delivered enhancements

When an enhancement is implemented:

1. Mark it `IN PROGRESS` when work starts.
2. Link it to the milestone and backlog item.
3. Mark it `DELIVERED` only after its acceptance criteria and definition of
   done are met.
4. Record the delivered version or date and evidence.
5. Add any newly discovered opportunities to the active register.

| ID | Delivered | Milestone | Evidence | Follow-up opportunities |
|---|---|---|---|---|
| | | | | |

## Review log

| Date | Reviewed by | Added | Reprioritized | Delivered or closed |
|---|---|---|---|---|
| | | | | |


---

<!-- Source template: claude-workflow/templates/12-visual-style-guide.md -->
# Visual Style Guide

This is the source of truth for the product's visual and interaction design.
Later contributors and models must extend these standards instead of replacing
them with personal preferences.

## Governance

- Design owner:
- Approved by:
- Initial approval date:
- Last updated:
- Applies to:
- Reference implementation or screens:

Changes require a recorded decision, rationale, affected surfaces, and review.

## Product personality

### Experience principles

Define three to five qualities that should guide design decisions.

1. 

### Desired user impression

- The product should feel:
- The product should not feel:

### Reference direction

| Reference | What to adopt | What not to copy |
|---|---|---|
| | | |

## Brand foundations

### Logo and identity

- Approved assets:
- Minimum size:
- Clear space:
- Prohibited treatments:

### Color tokens

Use semantic names so themes can change without rewriting components.

| Token | Value | Usage | Contrast requirement |
|---|---|---|---|
| `color-bg-page` | | Page background | |
| `color-bg-surface` | | Cards and panels | |
| `color-text-primary` | | Primary text | |
| `color-text-muted` | | Secondary text | |
| `color-action-primary` | | Primary actions | |
| `color-border-default` | | Dividers and controls | |
| `color-state-success` | | Success state | |
| `color-state-warning` | | Warning state | |
| `color-state-danger` | | Error or danger state | |
| `color-focus` | | Keyboard focus | |

Document light, dark, high-contrast, and data-visualization palettes when
applicable.

### Typography

| Token or role | Typeface | Weight | Size | Line height | Usage |
|---|---|---:|---:|---:|---|
| Display | | | | | |
| Heading 1 | | | | | |
| Heading 2 | | | | | |
| Body | | | | | |
| Small | | | | | |
| Code or data | | | | | |

- Fallback stack:
- Minimum readable size:
- Line-length guidance:

### Spacing and sizing

- Base spacing unit:
- Spacing scale:
- Content maximum width:
- Control heights:
- Touch-target minimum:

### Shape, borders, elevation, and imagery

- Corner-radius tokens:
- Border tokens:
- Shadow or elevation tokens:
- Icon style:
- Illustration or photography style:
- Image aspect ratios and treatments:

## Layout and responsiveness

| Breakpoint or mode | Width | Columns | Gutter | Key behavior |
|---|---:|---:|---:|---|
| Small | | | | |
| Medium | | | | |
| Large | | | | |

- Grid:
- Density:
- Navigation behavior:
- Content hierarchy:
- Empty-space guidance:
- Overflow and long-content behavior:

## Component standards

For each component, define anatomy, variants, states, behavior, content rules,
and accessibility requirements.

| Component | Approved variants | Required states | Do | Avoid |
|---|---|---|---|---|
| Button | | Default, hover, focus, active, disabled, loading | | |
| Input | | Empty, filled, focus, disabled, error | | |
| Card | | Default, interactive, selected | | |
| Navigation | | Default, current, collapsed | | |
| Dialog | | Open, busy, error | | |
| Table or list | | Loading, empty, populated, error | | |

## Interaction and motion

- Interaction feedback:
- Transition durations:
- Easing:
- Loading behavior:
- Reduced-motion behavior:
- Drag, swipe, hover, and keyboard equivalents:

## Content and data display

- Voice and tone:
- Capitalization:
- Button labels:
- Error-message pattern:
- Date, time, number, and currency formats:
- Chart type and color rules:
- Empty states:

## Accessibility standards

- Target standard:
- Color contrast:
- Keyboard navigation:
- Focus visibility:
- Screen-reader names and landmarks:
- Text resizing and zoom:
- Motion and flashing:
- Alternative text:
- Error identification:

## Representative screen specifications

| Screen or workflow | Reference | Key rules demonstrated | Approval status |
|---|---|---|---|
| | | | |

Include or link approved examples for primary, empty, loading, error, success,
disabled, and narrow-screen states.

## Design QA checklist

- [ ] Approved tokens are used; no unexplained one-off values exist.
- [ ] Components match approved variants and state behavior.
- [ ] Visual hierarchy is consistent.
- [ ] Responsive behavior matches the documented rules.
- [ ] Keyboard focus and interaction states are visible.
- [ ] Contrast and text scaling meet the stated standard.
- [ ] Loading, empty, error, and success states are designed.
- [ ] Content follows voice, labeling, and formatting rules.
- [ ] Intentional exceptions are documented and approved.

## Exceptions

| ID | Surface | Exception | Rationale | Approved by | Review date |
|---|---|---|---|---|---|
| V-001 | | | | | |

## Change log

| Date | Milestone | Change | Rationale | Approved by |
|---|---|---|---|---|
| | | | | |

