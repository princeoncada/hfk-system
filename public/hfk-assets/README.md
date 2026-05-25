# HFK Asset Library

## Folder Structure

- characters/ — PNG character illustrations (Anton, Anna, Grant, placeholder-child)
- icons/ — SVG icons for worksheet activities (dog, log, mop, pencil, etc.)
- doodles/ — SVG decorative elements (stars, leaves, hearts, sun, swirl)
- components/ — SVG structural elements (ribbons, badges, borders)

## Replacing Placeholder Assets

Each placeholder SVG is named to match the final asset filename.
Replace any placeholder by dropping a new file with the same name into the same folder.
No code changes required — the template references assets by filename.

## Asset Generation Prompts (ChatGPT / DALL-E)

Icons and doodles:
"Create ONLY a black-and-white [subject] doodle for a children's worksheet.
Transparent background. Thick clean outline. No text. Centered. Printable coloring-page style."

Character illustrations:
"Create ONLY a black-and-white child character [description].
Transparent background. Children's workbook cartoon style. No text. No background."

## Adding New Worksheet Templates

1. Create a new route: src/app/template-lab/[worksheet-name]/page.tsx
2. Reuse WorksheetCanvas and any existing hfk-template components
3. Add new activity-specific components to src/components/hfk-template/
4. Add any new required assets to the appropriate hfk-assets/ subfolder

## Locked vs Editable

Locked (do not modify without a template system decision):
- WorksheetCanvas dimensions (816×1056px)
- CSS design tokens (canvas size, border radius, font scale)
- Component interface contracts

Editable per worksheet:
- Content text (titles, instructions, word lists)
- Activity type and order
- Which assets are used
