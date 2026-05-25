// WorksheetCanvas — fixed print canvas wrapper
// 816 × 1056px (US Letter portrait at 96dpi)
// Swap children for extracted prototype structure after HTML handoff.

interface WorksheetCanvasProps {
  children: React.ReactNode
}

export function WorksheetCanvas({ children }: WorksheetCanvasProps) {
  return (
    <div
      style={{
        width: 816,
        height: 1056,
        position: 'relative',
        backgroundColor: '#fff',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  )
}
