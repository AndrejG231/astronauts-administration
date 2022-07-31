import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { useQuery } from "@apollo/client"
import { Table, Space, TableProps, Button, Alert } from "antd"

import {
  astronautsListQuery,
  IAstronautQueryResponse,
  IAstronautsQueryVariables,
} from "../api/query/astronautsList"
import { IAstronaut } from "../api/types/IAstronauts"

import { LIST_PAGE_SIZE } from "../config"

import { astronautsFormActions } from "../store/astronautsForm"

const AstronautsList: FC = () => {
  const [currentPage, setPage] = useState(1)

  const { data, loading, error } = useQuery<
    IAstronautQueryResponse,
    IAstronautsQueryVariables
  >(astronautsListQuery, {
    variables: {
      limit: LIST_PAGE_SIZE,
      offset: LIST_PAGE_SIZE * (currentPage - 1),
    },
  })

  const dispatch = useDispatch()

  const makeEditHandler = (item: IAstronaut) => () => {
    dispatch(astronautsFormActions.setItemToEdit(item))
  }

  const makeDeleteHandler = (item: IAstronaut) => () => {
    dispatch(astronautsFormActions.setItemToDelete(item))
  }

  if (loading && !data) {
    return <Alert message="Loading..." type="info" showIcon />
  }

  if (error || !data) {
    return <Alert message="Failed to load data." type="error" />
  }

  const { total, astronauts } = data.astronauts

  const pagination: TableProps<IAstronaut>["pagination"] = {
    defaultCurrent: 1,
    current: currentPage,
    total,
    pageSize: LIST_PAGE_SIZE,
    onChange: setPage,
  }

  return (
    <Table dataSource={astronauts} pagination={pagination} rowKey="_id">
      <Table.Column title="First Name" dataIndex="firstName" key="firstName" />
      <Table.Column title="Last Name" dataIndex="lastName" key="lastName" />
      <Table.Column
        title="Birth date"
        dataIndex="birthDate"
        key="birthDate"
        render={(birthDate: string) => new Date(birthDate).toLocaleDateString()}
      />
      <Table.Column
        title="Superpower"
        dataIndex="superpower"
        key="superpower"
      />
      <Table.Column
        title="Action"
        key="action"
        render={(_, record: IAstronaut) => (
          <Space size="middle">
            <Button onClick={makeEditHandler(record)}>Edit</Button>
            <Button onClick={makeDeleteHandler(record)}>Delete</Button>
          </Space>
        )}
      />
    </Table>
  )
}

export default AstronautsList
