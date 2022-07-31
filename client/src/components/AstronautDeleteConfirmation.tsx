import { FC } from "react"
import { Button, Typography } from "antd"

import { IAstronaut } from "../api/types/IAstronauts"

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
