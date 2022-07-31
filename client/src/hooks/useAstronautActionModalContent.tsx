import { ReactElement, useRef, useMemo } from "react"

import { IAstronaut, IAstronautUpdateFields } from "../api/types/IAstronauts"

import { AstronautFormContentType } from "../store/astronautsForm"

import AstronautDeleteConfirmation from "../components/AstronautDeleteConfirmation"
import AstronautForm from "../components/AstronautForm"

interface AstronautActionModalContentParams {
  item?: IAstronaut | null
  type?: AstronautFormContentType | null
  loading: boolean
  handleConfirm: (data?: IAstronautUpdateFields, id?: string) => void
  handleCancel: () => void
}

/**
 * Returns content to be rendered inside AstronautsActionModal
 * Determines which content to render based on specified parameter
 * Memorizes previously displayed content to prevent disappearing during modal closing animation
 */
export const useAstronautActionModalContent = ({
  type,
  item,
  loading,
  handleConfirm,
  handleCancel,
}: AstronautActionModalContentParams): ReactElement | null => {
  const previousContent = useRef<ReactElement | null>(null)

  const modalContent = useMemo(() => {
    let content: ReactElement | null = null
    if (type === "create") {
      content = <AstronautForm onConfirm={handleConfirm} loading={loading} />
    }

    if (type === "update") {
      content = (
        <AstronautForm
          itemToEdit={item!}
          onConfirm={handleConfirm}
          loading={loading}
        />
      )
    }

    if (type === "delete") {
      content = (
        <AstronautDeleteConfirmation
          loading={loading}
          itemToDelete={item!}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )
    }

    // Modal closed - display previous content
    if (!content) {
      return previousContent.current
    }

    previousContent.current = content
    return content
  }, [type, item, loading, handleCancel, handleConfirm])

  return modalContent
}
