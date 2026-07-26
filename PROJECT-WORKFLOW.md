# Workflow and Gates

## Gate 0 — Discovery interview

Complete `00-discovery-interview.md` through a conversation with the user.
Do not treat a blank template or an AI-generated guess as a completed
interview.

Interview sequence:

1. Understand the desired outcome and why it matters.
2. Identify users, their context, and their most important workflows.
3. Clarify success measures, priorities, constraints, and exclusions.
4. Review relevant examples, existing systems, and visual preferences.
5. Surface unresolved questions and proposed assumptions.
6. Summarize the interpreted goal in plain language.
7. Obtain user confirmation or record explicit authorization to proceed with
   identified assumptions.

Exit conditions:

- The user has confirmed the interpreted project goal.
- Primary users and workflows are understood.
- Success measures and priorities are recorded.
- Constraints and out-of-scope expectations are visible.
- Every material assumption has an owner and validation plan.
- Blocking questions are resolved.

## Gate 1 — Intake

Complete `00-brief.md`.

Exit conditions:

- The desired outcome and user value are clear.
- Constraints, dependencies, and known context are recorded.
- Blocking questions are resolved or explicitly deferred.

## Gate 2 — Scope

Complete `01-scope.md`.

Exit conditions:

- In-scope and out-of-scope work are explicit.
- Acceptance criteria are observable and testable.
- Assumptions and risks are visible.

## Gate 3 — Plan

Complete `02-plan.md`, initialize `04-status.md`, and create the first version
of `08-project-plan.md`. For user-facing products, establish the initial
`12-visual-style-guide.md` using the confirmed discovery inputs.

Exit conditions:

- Steps are discrete and ordered.
- Each step has a deliverable and verification method.
- Dependencies and rollback or recovery needs are identified.
- Work is organized into an ordered backlog and time-boxed or outcome-based
  milestones.
- Each milestone has an owner, acceptance criteria, and definition of done.
- The visual direction is specific enough that another contributor can
  reproduce it without inventing a new design language.

## Gate 4 — Execute

Implement one plan step at a time.

For every step:

1. Mark it `IN PROGRESS`.
2. Make the smallest coherent change.
3. Run the planned check.
4. Update the user guide, technical specification, and enhancement register
   when the change affects them.
5. Update the visual style guide when an approved design decision changes it.
6. Record evidence and decisions.
7. Update the milestone immediately to reflect its actual status.
8. Mark the step complete or blocked.

If scope changes, stop and update the scope and plan before continuing.

### Agile status cadence

At the start of each milestone:

- Mark it `IN PROGRESS`.
- Record the start date, owner, goal, and planned deliverables.
- Confirm dependencies and the definition of done.

When the milestone is met:

- Verify all milestone acceptance criteria.
- Link test and QA evidence.
- Update all affected living documentation.
- Record delivered backlog items and discovered follow-ups.
- Mark it `COMPLETE` only after the definition of done is satisfied.

For an incomplete milestone, use `BLOCKED` or leave it `IN PROGRESS`; never
report percentage completion without listing the remaining work.

## Gate 5 — Test

Complete `05-tests.md`.

Exit conditions:

- Every acceptance criterion maps to at least one check.
- Expected, edge, failure, and regression behavior are considered.
- Results include evidence, not unsupported claims.
- Skipped checks have a reason and risk assessment.

## Gate 6 — QA

Complete `06-qa.md`.

Exit conditions:

- Correctness, usability, maintainability, security, and documentation were
  reviewed where relevant.
- The user guide reflects the actual user experience.
- The technical specification reflects the delivered architecture and APIs.
- The enhancement register reflects delivered and newly identified items.
- The output follows the approved visual style guide across representative
  screens, states, and viewport sizes.
- Color contrast, focus, motion, touch targets, and text scaling were checked
  where relevant.
- No critical issue remains open.
- Residual risks and limitations are disclosed.

## Gate 7 — Close and Learn

Complete `07-retro.md`, update `04-status.md`, and promote reusable insights
to `LEARNINGS.md`.

Exit conditions:

- Final status is honest.
- Delivered work and evidence are summarized.
- Deviations and follow-ups have owners.
- Reusable learning is concise and evidence-based.
- The project plan contains final milestone outcomes and remaining backlog.
- Approved visual changes and exceptions are reflected in the style guide.
