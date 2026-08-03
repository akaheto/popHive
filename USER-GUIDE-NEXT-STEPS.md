# User Guide Update — Next Steps

## Completed ✓

- [x] Updated user guide markdown with all current features (CDC Dashboard, signal defaults, level alerts, accessibility)
- [x] Deployed guide locally at `web/public/user-guide.md` (served as `/user-guide.md` from dashboard)
- [x] Updated dashboard link from GitHub to local file
- [x] Created sync protocol (SYNC-USER-GUIDE.md) for maintaining markdown and Word versions in sync
- [x] Pushed to GitHub and deployed to Vercel

## What Changed

### Dashboard Link
**Before:** Clicked `?` icon → opened GitHub markdown in browser  
**After:** Clicked `?` icon → opens local `/user-guide.md` from the dashboard

### Files Updated
1. **web/public/user-guide.md** — Primary source (14KB, locally served)
2. **Project Documents/surveillance-dashboard/09-user-guide.md** — Archive copy (identical to #1)
3. **web/app/page.tsx** — Link changed from GitHub to `/user-guide.md`
4. **README.md** — Updated help text to reference local guide

## To Complete: Update Word Version

The Word document needs to be regenerated from the markdown to keep both formats in sync.

### Two Options:

**Option A: Manual Copy-Paste (5 min)**
1. Open `Project Documents/surveillance-dashboard/09-user-guide.md` in a text editor
2. Copy all content
3. Open `Project Documents/surveillance-dashboard/09-user-guide.docx` in Word/Google Docs
4. Delete existing content, paste new content as plain text
5. Reformat headings, tables if needed (markdown formatting usually imports cleanly)
6. Save the Word file

**Option B: Automated Converter (2 min)**
1. Use online markdown-to-Word converter: https://markdown-to-docx.vercel.app
2. Paste the markdown content from `Project Documents/surveillance-dashboard/09-user-guide.md`
3. Download the generated .docx file
4. Replace `Project Documents/surveillance-dashboard/09-user-guide.docx`

### Verify Sync
After updating the Word file:
```bash
# Both markdown files should be identical:
diff web/public/user-guide.md "Project Documents/surveillance-dashboard/09-user-guide.md"
```

Should return no output if in sync.

## How to Keep Them in Sync Going Forward

See `SYNC-USER-GUIDE.md` for the complete sync protocol.

**Quick Rule:** Always edit the markdown first, then update the Word document to match.

## Test the Link

Once deployed to production (https://public-health-dashboard-ten.vercel.app):
1. Click the `?` icon in the dashboard header
2. Should open `/user-guide.md` in a new tab
3. Verify it displays the latest guide with CDC Dashboard section

## Files Location

| File | Purpose | Location |
|------|---------|----------|
| Markdown (primary) | Served locally from dashboard | `web/public/user-guide.md` |
| Markdown (archive) | Project record & reference | `Project Documents/surveillance-dashboard/09-user-guide.md` |
| Word document | Sharable/printable format | `Project Documents/surveillance-dashboard/09-user-guide.docx` |
| Sync protocol | How to keep both in sync | `SYNC-USER-GUIDE.md` |

## Status

- **Deployment**: Live on Vercel ✓
- **Link**: Updated in code ✓
- **Markdown**: Current with all enhancements ✓
- **Word version**: **Needs regeneration** ⚠️

**Next Action:** Regenerate Word version using one of the options above, then both formats will be complete and synchronized.
