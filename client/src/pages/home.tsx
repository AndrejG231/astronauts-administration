import React from "react"
import { Button } from "antd"
import AstronautsList from "../components/AstronautsList"
import { MainLayout } from "../components/MainLayout"
import { AstronautsActionModal } from "../components/AstronautsActionModal"
import { useDispatch } from "react-redux"
import { astronautsFormActions } from "../store/astronautsForm"

const Home = () => {
  const dispatch = useDispatch()

  const handleOpenCreateForm = () => {
    dispatch(astronautsFormActions.setIsCreating(true))
  }

  return (
    <MainLayout>
      <Button onClick={handleOpenCreateForm}>Create new</Button>
      <AstronautsList />
    </MainLayout>
  )
}

export { Home }
