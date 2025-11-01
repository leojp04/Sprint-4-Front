import { useEffect, useState } from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (value: string) => void
  initialValue?: string
  title?: string
  confirmLabel?: string
  cancelLabel?: string
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  initialValue = '',
  title = 'Remarcar consulta',
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
}: ModalProps) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (isOpen) setValue(initialValue)
  }, [initialValue, isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold text-[#111827]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-[#a1203a] hover:underline focus:outline-none focus:ring-2 focus:ring-[#a1203a] focus:ring-offset-2 rounded-md px-2 py-1"
            aria-label="Fechar modal"
          >
            Fechar
          </button>
        </div>

        <label htmlFor="remarcar-data" className="mt-6 block text-sm font-medium text-[#111827]">
          Nova data e horario
        </label>
        <input
          id="remarcar-data"
          type="datetime-local"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#a1203a]"
        />

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-[#111827] transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#a1203a] focus:ring-offset-2"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => onConfirm(value)}
            className="rounded-lg bg-[#a1203a] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#a1203a] focus:ring-offset-2"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

