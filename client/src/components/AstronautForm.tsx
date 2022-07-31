import { FC, useLayoutEffect } from "react"
import { Button, Form, Input } from "antd"

import { IAstronaut, IAstronautUpdateFields } from "../api/types/IAstronauts"

import { parseToFormDate } from "../utils/parseToFormDate"

type Props = {
  itemToEdit?: IAstronaut
  loading: boolean
  onConfirm: (data: IAstronautUpdateFields, id?: string) => void
}

const AstronautForm: FC<Props> = ({ onConfirm, itemToEdit, loading }) => {
  const [form] = Form.useForm<IAstronautUpdateFields>()

  const handleReset = () => {
    form.resetFields()
  }

  const handleSubmit = (values: IAstronautUpdateFields) => {
    onConfirm(values, itemToEdit && itemToEdit._id)
  }

  // reset form fields to initial values every time item changes
  useLayoutEffect(handleReset, [itemToEdit, form])

  const initialValues = itemToEdit && {
    ...itemToEdit,
    birthDate: parseToFormDate(itemToEdit.birthDate),
  }

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="control-hooks"
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        name="firstName"
        label="First name"
        rules={[{ required: true, min: 1 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last name"
        rules={[{ required: true, min: 1 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="birthDate"
        label="Birth date"
        rules={[{ required: true }]}
      >
        <Input type="date" />
      </Form.Item>
      <Form.Item
        name="superpower"
        label="Superpower"
        rules={[{ required: true, min: 3 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 10, span: 22 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
        <Button htmlType="button" onClick={handleReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AstronautForm
