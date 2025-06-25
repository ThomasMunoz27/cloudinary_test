import { Route, Routes } from "react-router"
import { MainScreen } from "../screens/MainScreen/MainScreen"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MainScreen></MainScreen>} />
    </Routes>
  )
}
