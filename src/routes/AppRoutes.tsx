import { Route, Routes } from "react-router"
import { MainScreen } from "../components/screens/MainScreen/MainScreen"
import { ImageScreen } from "../components/screens/ImageScreen/ImageScreen"
import { ListCategories } from "../components/ui/ListCategories/ListCategories"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MainScreen></MainScreen>} />
        <Route path="/image" element={<ImageScreen/>} />
        <Route path="/categories" element={<ListCategories/>}></Route>

    </Routes>
  )
}
