type ExpBarProps = {
  exp: number // Value between 0-100
  level?: number
  showLabel?: boolean
}

export default function ExpBar({
  exp,
  level = 1,
  showLabel = true,
}: ExpBarProps) {
  // Ensure exp is between 0-100
  const boundedExp = Math.max(0, Math.min(100, exp))

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">
            Level {level}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {boundedExp}%
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${boundedExp}%` }}
        ></div>
      </div>
    </div>
  )
}
