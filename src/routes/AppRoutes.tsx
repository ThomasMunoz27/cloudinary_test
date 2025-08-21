import { Route, Routes } from "react-router"
import { MainScreen } from "../components/screens/MainScreen/MainScreen"
import { ImageScreen } from "../components/screens/ImageScreen/ImageScreen"
import { ListCategories } from "../components/ui/ListCategories/ListCategories"
import { UserScreen } from "../components/screens/UserScreen/UserScreen"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MainScreen></MainScreen>} />
        <Route path="/image" element={<ImageScreen/>} />
        <Route path="/categories" element={<ListCategories/>}></Route>
        <Route path="/user/profile" element={<UserScreen isOwnProfile={true}></UserScreen>}></Route>
        <Route path="/profile/:id" element={<UserScreen isOwnProfile={false}></UserScreen>}></Route>

    </Routes>
  )
}
