import { useDispatch } from "react-redux"
import { Button } from "antd"

import { astronautsFormActions } from "../store/astronautsForm"

import AstronautsList from "../components/AstronautsList"
import { MainLayout } from "../components/MainLayout"
import { AstronautsActionModal } from "../components/AstronautsActionModal"

const Home = () => {
  const dispatch = useDispatch()

  const handleOpenCreateForm = () => {
    dispatch(astronautsFormActions.createNew())
  }

  return (
    <MainLayout>
      <Button onClick={handleOpenCreateForm}>Create new</Button>
      <AstronautsList />
      <AstronautsActionModal />
    </MainLayout>
  )
}

export { Home }
