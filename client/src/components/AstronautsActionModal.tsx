import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useApolloClient } from "@apollo/client"
import { Modal, notification } from "antd"

import { createAstronautMutation } from "../api/mutation/createAstronaut"
import { updateAstronautMutation } from "../api/mutation/updateAstronaut"
import { deleteAstronautMutation } from "../api/mutation/deleteAstronaut"
import { IAstronautUpdateFields } from "../api/types/IAstronauts"

import { astronautsFormActions } from "../store/astronautsForm"
import { RootState } from "../store/ReduxProvider"

import { useAstronautActionModalContent } from "../hooks/useAstronautActionModalContent"

const MUTATIONS = {
  create: createAstronautMutation,
  update: updateAstronautMutation,
  delete: deleteAstronautMutation,
}

/**
 * Component displays modal with determined content based on @astronautsForm store state
 */
const AstronautsActionModal = () => {
  const client = useApolloClient()
  const dispatch = useDispatch()

  // Manage loading state
  const [loading, setLoading] = useState(false)

  const { actionType, item } = useSelector(
    ({ astronautsForm: { formContent } }: RootState) => ({
      item: formContent?.item,
      actionType: formContent?.type,
    })
  )

  // Remove currently selected item from form store
  const handleCancel = () => {
    dispatch(astronautsFormActions.reset())
  }

  // Determine which mutation to use based on opened modal
  // Run the mutation + success callback / show error message
  const handleConfirm = async (data?: IAstronautUpdateFields, id?: string) => {
    if (loading) return
    setLoading(true)

    if (!actionType) return

    const { data: responseData } = await client
      .mutate({
        mutation: MUTATIONS[actionType],
        variables: { data, id },
      })
      .catch(/* Do not throw in case of unsuccesfull request */)

    // Retrieve message from response of possilbe mutations
    const success = Boolean(
      responseData?.createAstronaut?.message ||
        responseData?.updateAstronaut?.message ||
        responseData?.deleteAstronaut?.message
    )

    setLoading(false)

    // Error - show toast
    if (!success) {
      notification.open({
        message: `Failed to ${actionType} astronaut.`,
        type: "error",
      })
      return
    }

    // Success - show toast, refetch data, close modal
    notification.open({
      message: `Successfully ${actionType}d astronaut.`,
      type: "success",
    })
    client.resetStore()
    dispatch(astronautsFormActions.reset())
  }

  // Get specific modal content to be displayed
  const modalContent = useAstronautActionModalContent({
    handleCancel,
    handleConfirm,
    loading,
    item,
    type: actionType,
  })

  return (
    <Modal
      className="modal"
      visible={Boolean(actionType)}
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
