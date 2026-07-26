# Claude Code Project Workflow — Drop-In Setup

## Install

Copy these three files into the root of a new or existing Claude Code project:

```text
CLAUDE.md
PROJECT-WORKFLOW.md
PROJECT-TEMPLATES.md
```

Do not create any folders or copy individual templates.

If the project already has a `CLAUDE.md`, merge the drop-in `CLAUDE.md` with
the existing file so existing project-specific instructions are preserved.

Start Claude Code in the project root and say:

> Read the project instructions and start the discovery interview for a new
> project. Create and maintain all required files under Project Documents.

## What Claude creates

After the discovery interview establishes the project goal and a short task
ID, Claude creates:

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

Claude creates the folder and documents, conducts the interview, requests
confirmation of the interpreted goal, and maintains the documents throughout
the project. Application code remains in the appropriate source folders.

