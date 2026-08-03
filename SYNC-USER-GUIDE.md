# User Guide Synchronization Protocol

## Overview

The user guide is maintained in two formats that must stay synchronized:

1. **Markdown version** (primary source):
   - `web/public/user-guide.md` — Served locally from dashboard
   - `Project Documents/surveillance-dashboard/09-user-guide.md` — Reference copy for project records

2. **Word version** (distributed format):
   - `Project Documents/surveillance-dashboard/09-user-guide.docx` — Sharable document format

## Sync Rules

**Always edit the Markdown file first** (`web/public/user-guide.md` or `Project Documents/surveillance-dashboard/09-user-guide.md`).

After any edit:
1. Both markdown files must reflect the same content
2. Update the Word document (.docx) to match
3. Commit both to git with a single commit message

## When to Update

Update the user guide whenever:
- New features are added (add to Purpose section and Core Workflows)
- Existing workflows change (update the affected workflow section)
- Links or URLs change (update Prerequisites and Installation sections)
- Version is released (add entry to Version History table)
- Limitations or warnings change (update Limitations and Safe Use section)

## How to Keep Files in Sync

### Automatic Sync (Recommended)

After editing the markdown file, update the Word document:

1. Open `Project Documents/surveillance-dashboard/09-user-guide.docx` in Word or Google Docs
2. Select all content (`Cmd+A` on Mac)
3. Delete existing content
4. Paste the markdown content:
   - Copy the markdown file (`web/public/user-guide.md` or the Project Documents version)
   - In Word, use "Paste Special" → "Paste as plain text" to preserve formatting
5. Reformat as needed (headings, tables, lists should auto-format from markdown)
6. Save the Word document

### Manual Sync (Alternative)

Use a markdown-to-Word converter:
- Copy the markdown content
- Paste into an online markdown editor (e.g., https://markdown-to-docx.vercel.app)
- Download the .docx file
- Replace the old Word document

### Check Both Versions

Before committing, verify:
```bash
# Ensure both markdown files are identical
diff web/public/user-guide.md "Project Documents/surveillance-dashboard/09-user-guide.md"

# Should return no output if files are identical
```

## File Locations

- **Primary Source**: `/web/public/user-guide.md` (served as `/user-guide.md` from dashboard)
- **Project Archive**: `Project Documents/surveillance-dashboard/09-user-guide.md` (backup/reference)
- **Word Format**: `Project Documents/surveillance-dashboard/09-user-guide.docx` (distribution copy)

## Dashboard Link

The dashboard header links to the markdown version:
```
<a href="/user-guide.md" target="_blank">?</a>
```

This serves the file from `web/public/user-guide.md` as a static file.

## Git Commit Message Template

```
docs: update user guide

- Added [new feature/section]
- Updated [changed section]
- Version: [version number if applicable]

Files changed:
- web/public/user-guide.md
- Project Documents/surveillance-dashboard/09-user-guide.md
- Project Documents/surveillance-dashboard/09-user-guide.docx
```

## Last Updated

- **Date**: 2026-08-03
- **Editor**: Claude Code
- **Changes**: Added CDC Dashboard section, signal defaults, level alerts, and accessibility updates
