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
