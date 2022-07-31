import { DocumentNode, gql, useApolloClient, useMutation } from "@apollo/client"
import { Modal, notification } from "antd"
import { ReactElement, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createAstronautMutation } from "../api/mutation/createAstronaut"
import { IAstronautUpdateFields } from "../api/types/IAstronauts"
import { updateAstronautMutation } from "../api/mutation/updateAstronaut"
import { astronautsFormActions } from "../store/astronautsForm"
import { RootState } from "../store/ReduxProvider"
import AstronautDeleteConfirmation from "./AstronautDeleteConfirmation"
import AstronautForm from "./AstronautForm"
import { deleteAstronautMutation } from "../api/mutation/deleteAstronaut"

const MUTATIONS = {
  create: createAstronautMutation,
  update: updateAstronautMutation,
  delete: deleteAstronautMutation,
}

/**
 * Component displays modal with determined content based on @astronautsForm store state
 */
const AstronautsActionModal = () => {
  const [loading, setLoading] = useState(false)

  const { isCreating, itemToDelete, itemToEdit } = useSelector(
    ({
      astronautsForm: { isCreating, itemToDelete, itemToEdit },
    }: RootState) => ({ isCreating, itemToDelete, itemToEdit })
  )

  const client = useApolloClient()

  const dispatch = useDispatch()

  const handleCancel = () => {
    dispatch(astronautsFormActions.reset())
  }

  /**
   * Determine which mutation to use based on opened modal
   * Run the mutation + success callback / show error message
   */
  const handleConfirm = async (data?: IAstronautUpdateFields, id?: string) => {
    if (loading) return
    setLoading(true)

    let mutationType: keyof typeof MUTATIONS | null = null

    if (isCreating) {
      mutationType = "create"
    }

    if (itemToEdit) {
      mutationType = "update"
    }

    if (itemToDelete) {
      mutationType = "delete"
    }

    if (!mutationType) return

    const { data: responseData } = await client
      .mutate({
        mutation: MUTATIONS[mutationType],
        variables: { data, id },
      })
      .catch(/* Do not throw in case of unsuccesfull request */)

    const success = Boolean(
      responseData?.createAstronaut?.message ||
        responseData?.updateAstronaut?.message ||
        responseData?.deleteAstronaut?.message
    )

    setLoading(false)

    if (!success) {
      notification.open({
        message: `Failed to ${mutationType} astronaut.`,
        type: "error",
      })
      return
    }

    notification.open({
      message: `Successfully ${mutationType}d astronaut.`,
      type: "success",
    })
    client.resetStore()
    dispatch(astronautsFormActions.reset())
  }

  // Memorize previously displayed content to prevent form disappearing during animation
  const previousContent = useRef<ReactElement | null>(null)

  // Select specific modal content, use memorized one if no content to show
  const modalContent = useMemo(() => {
    let content: ReactElement | null = null
    if (isCreating) {
      content = <AstronautForm onConfirm={handleConfirm} loading={loading} />
    }

    if (itemToEdit) {
      content = (
        <AstronautForm
          itemToEdit={itemToEdit}
          onConfirm={handleConfirm}
          loading={loading}
        />
      )
    }

    if (itemToDelete) {
      content = (
        <AstronautDeleteConfirmation
          loading={loading}
          itemToDelete={itemToDelete}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )
    }

    // Use previously displayed content to be shown during animation
    if (!content) {
      return previousContent.current
    }

    previousContent.current = content
    return content
  }, [itemToEdit, itemToDelete, isCreating, loading])

  return (
    <Modal
      className="modal"
      visible={!!(isCreating || itemToDelete || itemToEdit)}
      footer={null}
      onCancel={() => dispatch(astronautsFormActions.reset())}
      width={"1000px"}
      centered
    >
      {modalContent}
    </Modal>
  )
}

export { AstronautsActionModal }
