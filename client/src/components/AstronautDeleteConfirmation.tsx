import { Button, Typography } from "antd"
import React, { FC } from "react"
import { useSelector } from "react-redux"
import { IAstronaut } from "../api/types/IAstronauts"
import { RootState } from "../store/ReduxProvider"

type Props = {
  itemToDelete: IAstronaut
  loading: boolean
  onConfirm: (data: undefined, id: string) => void
  onCancel: () => void
}

const AstronautDeleteConfirmation: FC<Props> = ({
  itemToDelete,
  onCancel,
  onConfirm,
  loading,
}) => {
  return (
    <>
      <Typography>
        Are you sure you want to delete astronaut{" "}
        <b>
          {itemToDelete.firstName} {itemToDelete.lastName}
        </b>
        ?
      </Typography>
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => onConfirm(undefined, itemToDelete._id)}
        loading={loading}
      >
        Yes
      </Button>
      <Button htmlType="button" onClick={onCancel}>
        No
      </Button>
    </>
  )
}

export default AstronautDeleteConfirmation
