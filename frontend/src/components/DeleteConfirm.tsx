export function DeleteConfirm({
  onConfirm,
  onCancel,
  confirmRef,
}: {
  onConfirm: () => void
  onCancel: () => void
  confirmRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={confirmRef}
      className="absolute right-0 top-0 z-10 bg-white rounded-md shadow-md border border-gray-200 p-3 w-56"
    >
      <p className="text-sm font-medium mb-2">Are you sure?</p>
      <div className="flex gap-2">
        <button
          className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-3 rounded"
          onClick={onConfirm}
        >
          Delete
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs py-1 px-3 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
