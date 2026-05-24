'use client'

import type {
  TemplatePalette,
  TemplateSlot,
  TemplateSlotStyle,
} from '@/lib/template.types'

interface PropertyPanelProps {
  palette: TemplatePalette
  onPaletteChange: (key: keyof TemplatePalette, value: string) => void
  footerText: string
  onFooterTextChange: (value: string) => void
  avatar: string | undefined
  onAvatarChange: (filename: string | undefined) => void
  avatarOptions: string[]
  selectedSlot: TemplateSlot | null
  onSlotStyleChange: (patch: Partial<TemplateSlotStyle>) => void
  onSlotStyleClear: () => void
}

const HFK_TOKENS = [
  { name: 'white', hex: '#FFFFFF' },
  { name: 'paper', hex: '#FFFDF8' },
  { name: 'cream', hex: '#F7F2E8' },
  { name: 'cream-deep', hex: '#EFE8D8' },
  { name: 'ink', hex: '#2A1F18' },
  { name: 'ink-2', hex: '#5C4033' },
  { name: 'ink-3', hex: '#8A7264' },
  { name: 'ink-4', hex: '#B8A89A' },
  { name: 'sage', hex: '#6F8F63' },
  { name: 'sage-deep', hex: '#4F6D44' },
  { name: 'sage-tint', hex: '#DDE7D5' },
  { name: 'rose', hex: '#C77769' },
  { name: 'rose-tint', hex: '#F2DCD6' },
  { name: 'yellow', hex: '#E8C75B' },
  { name: 'yellow-tint', hex: '#F6E9B8' },
  { name: 'play-sky', hex: '#4A90D9' },
  { name: 'sky-light', hex: '#D6EAF8' },
]

const SLOT_COLOR: Record<TemplateSlot['type'], string> = {
  header: 'bg-sage-tint text-sage-deep',
  vocabulary: 'bg-yellow-tint text-ink-2',
  activity: 'bg-cream-deep text-ink-2',
  'parent-notes': 'bg-rose-tint text-rose',
  footer: 'bg-ink text-cream',
}

const PALETTE_FIELDS: Array<{
  key: keyof TemplatePalette
  label: string
}> = [
  { key: 'background', label: 'Background' },
  { key: 'surface', label: 'Surface' },
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'text', label: 'Text' },
  { key: 'textMuted', label: 'Text Muted' },
  { key: 'border', label: 'Border' },
  { key: 'highlight', label: 'Highlight' },
]

function slotLabel(type: TemplateSlot['type']) {
  if (type === 'parent-notes') return 'Parent Notes'
  return type
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="mb-3">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="w-20 shrink-0 text-[11px] text-ink-3">{label}</span>
        <span
          className="inline-block h-5 w-5 rounded-full border border-[rgba(92,64,51,0.2)]"
          style={{ background: value || 'transparent' }}
        />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="flex-1 rounded border border-[rgba(92,64,51,0.15)] bg-transparent px-1.5 py-0.5 font-mono text-[11px]"
        />
      </div>
      <div className="flex flex-wrap gap-1.5 pl-[88px]">
        {HFK_TOKENS.map((token) => (
          <button
            key={token.name}
            type="button"
            title={token.name}
            onClick={() => onChange(token.hex)}
            className={`h-5 w-5 cursor-pointer rounded-full border-2 ${
              value === token.hex
                ? 'border-ink'
                : 'border-transparent hover:border-ink-3'
            }`}
            style={{ background: token.hex }}
          />
        ))}
      </div>
    </div>
  )
}

function TextStyleField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="w-20 shrink-0 text-[11px] text-ink-3">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded border border-[rgba(92,64,51,0.15)] bg-transparent px-1.5 py-0.5 text-[12px]"
      />
    </div>
  )
}

export function PropertyPanel({
  palette,
  onPaletteChange,
  footerText,
  onFooterTextChange,
  avatar,
  onAvatarChange,
  avatarOptions,
  selectedSlot,
  onSlotStyleChange,
  onSlotStyleClear,
}: PropertyPanelProps) {
  return (
    <aside className="sticky top-6 rounded-card border border-[rgba(92,64,51,0.1)] bg-paper p-4">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
        Palette
      </p>
      {PALETTE_FIELDS.map((field) => (
        <ColorField
          key={field.key}
          label={field.label}
          value={palette[field.key]}
          onChange={(value) => onPaletteChange(field.key, value)}
        />
      ))}

      <div className="my-4 border-t border-[rgba(92,64,51,0.08)]" />

      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
        Footer
      </p>
      <input
        type="text"
        value={footerText}
        onChange={(event) => onFooterTextChange(event.target.value)}
        placeholder="Footer text (optional)"
        className="w-full rounded border border-[rgba(92,64,51,0.15)] bg-transparent px-2 py-1 text-[12px]"
      />

      <div className="my-4 border-t border-[rgba(92,64,51,0.08)]" />

      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
        Avatar
      </p>
      {avatarOptions.length === 0 ? (
        <p className="text-[12px] text-ink-4">No avatars in assets/avatars/ yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {avatarOptions.map((filename) => (
            <button
              key={filename}
              type="button"
              onClick={() => onAvatarChange(avatar === filename ? undefined : filename)}
              className={`rounded p-1 ${avatar === filename ? 'ring-2 ring-ink' : ''}`}
            >
              <img
                src={`/avatars/${filename}`}
                alt={filename}
                className="h-12 w-12 object-contain"
              />
            </button>
          ))}
        </div>
      )}

      <div className="my-4 border-t border-[rgba(92,64,51,0.08)]" />

      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
        Slot Style
      </p>
      {selectedSlot ? (
        <div>
          <span
            className={`mb-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide ${SLOT_COLOR[selectedSlot.type]}`}
          >
            {slotLabel(selectedSlot.type)} slot
          </span>
          <ColorField
            label="Background"
            value={selectedSlot.style?.background ?? ''}
            onChange={(value) => onSlotStyleChange({ background: value || undefined })}
          />
          <ColorField
            label="Color"
            value={selectedSlot.style?.color ?? ''}
            onChange={(value) => onSlotStyleChange({ color: value || undefined })}
          />
          <ColorField
            label="Border"
            value={selectedSlot.style?.borderColor ?? ''}
            onChange={(value) => onSlotStyleChange({ borderColor: value || undefined })}
          />
          <TextStyleField
            label="Border W"
            value={selectedSlot.style?.borderWidth ?? ''}
            onChange={(value) => onSlotStyleChange({ borderWidth: value || undefined })}
            placeholder="1px"
          />
          <TextStyleField
            label="Radius"
            value={selectedSlot.style?.borderRadius ?? ''}
            onChange={(value) => onSlotStyleChange({ borderRadius: value || undefined })}
            placeholder="10px"
          />
          <TextStyleField
            label="Padding"
            value={selectedSlot.style?.padding ?? ''}
            onChange={(value) => onSlotStyleChange({ padding: value || undefined })}
            placeholder="1rem"
          />
          {selectedSlot.style ? (
            <button
              type="button"
              onClick={onSlotStyleClear}
              className="mt-2 text-[12px] text-rose hover:underline"
            >
              Clear Slot Style
            </button>
          ) : null}
        </div>
      ) : (
        <p className="text-[12px] text-ink-4">Select a slot to edit its style.</p>
      )}
    </aside>
  )
}
