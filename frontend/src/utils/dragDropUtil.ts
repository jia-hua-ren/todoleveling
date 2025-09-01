import {
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { SmartPointerSensor } from './SmartPointerSensor'

// Configure all necessary sensors for drag and drop
export function useDragSensors() {
  return useSensors(
    useSensor(SmartPointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
}
