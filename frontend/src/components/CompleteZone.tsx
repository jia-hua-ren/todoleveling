import { useDroppable } from '@dnd-kit/core'
import { CircleCheckBig } from 'lucide-react'

type CompleteZoneProps = {
  isDragging: boolean
}

export default function CompleteZone({ isDragging }: CompleteZoneProps) {
  const { setNodeRef, isOver } = useDroppable({ id: 'complete-zone' })

  return (
    <div
      ref={setNodeRef}
      className="flex items-center justify-center w-24 h-24 rounded-full border-2 transition-colors"
      style={{
        transform: isDragging ? 'translateY(0)' : 'translateY(-120%)',
        opacity: isDragging ? 1 : 0,
        pointerEvents: isDragging ? 'auto' : 'none',
        backgroundColor: isOver ? 'rgba(34,197,94,0.2)' : 'transparent',
        borderColor: isOver ? '#22c55e' : '#4ade80',
        transition:
          'transform 0.3s ease, opacity 0.3s ease, background-color 0.2s ease, border-color 0.2s ease',
      }}
    >
      <CircleCheckBig
        className={`w-16 h-16 ${isOver ? 'text-green-600' : 'text-green-400'}`}
      />
    </div>
  )
}
