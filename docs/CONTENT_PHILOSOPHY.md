# Content Philosophy

## Core Principle

Content is variable. Templates are stable.

AI generates content. Templates control appearance.
This separation must be preserved in every phase.

## Content Ownership

JSON files own:
- Title and subtitle
- Grade level
- Subject
- Vocabulary entries (word + definition)
- Activity definitions (type, instruction, items, answers)
- Parent notes
- Footer text
- References
- Content metadata (id, template, status, dates)

Templates own:
- Layout structure
- Spacing and sizing
- Typography rules
- Color palette
- Borders and decorative elements
- Print formatting
- Section ordering

Neither crosses into the other's domain.

## Content Flow

IDEA → PLANNED → JSON CREATED → PREVIEWED → EXPORTED → POSTED → ARCHIVED

Every stage is traceable through the content JSON status field and the
archives/ folder structure.

## Content Types

worksheet
  Printable learning activity for Grades 1–6.
  One subject per worksheet. One grade target.
  May include: vocabulary section, activity section, parent notes, footer.

facebook-post
  Image post for the HFK Facebook page.
  Includes caption, image text, and hashtags.
  One subject focus. Grade range optional.

## JSON File Naming Convention

worksheets:    [subject]-[grade]-[short-title]-[id].json
               e.g. math-grade2-addition-basics-abc123.json

facebook-posts: [subject]-[short-title]-[id].json
               e.g. science-photosynthesis-intro-def456.json

IDs should be short alphanumeric slugs (8 chars).

## Content Validation Rules

- grade must be 1, 2, 3, 4, 5, or 6
- subject must be one of: math, science, reading, vocabulary, bible, values
- template must reference a known template name
- status must be: draft, ready, exported, or archived
- createdAt must be an ISO date string
- vocabulary entries must have both word and definition
- activities must have type, instruction, and items

## AI Content Rules

AI may:
- Generate worksheet content (vocabulary, activities, parent notes)
- Update JSON content fields
- Review content consistency
- Suggest improvements

AI must not:
- Modify template files to accommodate content
- Change JSON structure without documenting the schema change
- Generate or modify avatar references
- Set status to "posted" or "archived" without operator confirmation

## Schema Validation

All worksheet JSON files are validated against the WorksheetSchema
defined in src/lib/schema.ts using Zod.

### Schema Location

  src/lib/schema.ts

### Exported Schemas

  WorksheetSchema         — full Zod schema for WorksheetContent
  SubjectSchema           — z.enum of valid subjects
  GradeSchema             — z.union of literals 1–6
  ContentStatusSchema     — z.enum of valid statuses
  VocabularyEntrySchema   — word + definition object
  ActivitySchema          — type, instruction, items, optional answers
  ActivityTypeSchema      — z.enum of valid activity types

### Exported Helpers

  validateWorksheet(data: unknown): WorksheetContent
    Parses and returns a validated worksheet. Throws ZodError on failure.

  isValidWorksheet(data: unknown): boolean
    Returns true if data passes schema validation. Safe — never throws.

### Validation Rules (enforced by Zod)

  id            required, non-empty string
  title         required, non-empty string
  subtitle      optional string
  grade         one of: 1, 2, 3, 4, 5, 6
  subject       one of: math, science, reading, vocabulary, bible, values
  template      required, non-empty string
  vocabulary    optional array — each entry must have word and definition
  activities    optional array — each entry must have type, instruction,
                  items; answers is optional
  parentNotes   optional string
  footerText    optional string
  references    optional array of strings
  createdAt     required, non-empty string (ISO date format expected)
  status        one of: draft, ready, exported, archived
