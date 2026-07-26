# Project Operating Contract

Use `PROJECT-WORKFLOW.md` for every non-trivial task. Use
`PROJECT-TEMPLATES.md` as the specification for documents you create.

## First-run bootstrap

When these files are present in a project root but `Project Documents/` is
absent:

1. Read this file, `PROJECT-WORKFLOW.md`, and `PROJECT-TEMPLATES.md`.
2. Inspect the existing project read-only for context.
3. Start the discovery interview with the user.
4. After agreeing on a short task ID, create
   `Project Documents/<task-id>/`.
5. Create every required document in that folder using the corresponding
   section of `PROJECT-TEMPLATES.md`.
6. Populate documents progressively; do not invent interview answers.
7. Keep the three root instruction files in place for future workstreams.

The user should not need to create `Project Documents/`, copy templates, run a
setup command, or reorganize the project manually.

## Non-negotiable rules

1. Do not scope, plan, or implement a non-trivial project until the discovery
   interview is complete and the user's goal has been confirmed.
2. Separate facts, assumptions, decisions, and open questions.
3. Define acceptance criteria before making changes.
4. Keep changes limited to the agreed scope.
5. Verify every acceptance criterion with evidence.
6. Never claim completion while required checks fail or remain unrun.
7. Record material decisions and deviations as they occur.
8. End each task with a retrospective and reusable lessons.
9. Do not place secrets, credentials, or personal data in workflow files.
10. Maintain the project plan, user guide, technical specification, and future
    enhancements register throughout the build.
11. Update milestone status immediately when a milestone starts, becomes
    blocked, is ready for review, or satisfies its definition of done.
12. Maintain the approved visual style guide and treat it as the source of
    truth for all user-facing design work.

## Project-document workspace

For each task, create:

```text
Project Documents/<task-id>/
  00-discovery-interview.md
  00-brief.md
  01-scope.md
  02-plan.md
  03-decisions.md
  04-status.md
  05-tests.md
  06-qa.md
  07-retro.md
  08-project-plan.md
  09-user-guide.md
  10-technical-specification.md
  11-future-enhancements.md
  12-visual-style-guide.md
```

Create the matching files from `PROJECT-TEMPLATES.md`. Use a short, lowercase
task ID such as `add-password-reset`.

`Project Documents/` is reserved for project-management and product
documentation created from this workflow. Keep application source code in the
appropriate source folders, not inside `Project Documents/`.

## Status language

Use only:

- `NOT STARTED`
- `IN PROGRESS`
- `BLOCKED`
- `READY FOR QA`
- `COMPLETE`

`COMPLETE` means all acceptance criteria are satisfied, required tests pass,
QA is complete, and remaining risks are documented.

## Required living documentation

Every build must contain and maintain:

- `00-discovery-interview.md`: the user's goals, users, context, constraints,
  priorities, examples, unknowns, and confirmation of the interpreted brief.
- `08-project-plan.md`: agile milestones, backlog, status, ownership, risks,
  dependencies, and definitions of done.
- `09-user-guide.md`: audience-appropriate instructions for installing,
  configuring, using, troubleshooting, and safely operating the output.
- `10-technical-specification.md`: architecture, components, code, APIs, data,
  folder structure, dependencies, security, deployment, and operational notes.
- `11-future-enhancements.md`: prioritized opportunities, expected value,
  effort, dependencies, and disposition.
- `12-visual-style-guide.md`: approved design principles, tokens, typography,
  color, spacing, components, interaction states, accessibility, responsive
  behavior, and visual examples.

Documentation is part of the deliverable. Whenever behavior, architecture,
configuration, interfaces, or scope changes, update the affected documents in
the same work step.

When an enhancement is implemented, link it to the applicable milestone or
task, mark it delivered, and move any newly discovered opportunities into the
enhancement register.

## Discovery interview rules

- Ask focused questions in small groups and adapt follow-ups to prior answers.
- Distinguish confirmed requirements from assumptions and suggestions.
- Ask about desired outcomes before proposing features or implementation.
- Clarify users, workflows, success measures, constraints, priorities,
  exclusions, risks, examples, and decision-makers.
- Do not ask the user for information that can be safely discovered from the
  project itself.
- If the user cannot answer a non-blocking question, record a proposed
  assumption, its risk, and how it will be validated.
- Summarize the interpreted goal and request confirmation before Gate 1.
- Reopen discovery when new information materially changes the goal.

## Visual continuity rules

- The approved `12-visual-style-guide.md` overrides model preferences and
  ad-hoc visual choices.
- A model may improve the guide only through a recorded, reviewed design
  decision; it must not silently replace established patterns.
- Reuse approved design tokens and components before creating new variants.
- Record intentional exceptions, their rationale, and their affected screens.
- Update the guide and representative examples in the same milestone as an
  approved visual change.
- Verify visual consistency, responsiveness, and accessibility during QA.
