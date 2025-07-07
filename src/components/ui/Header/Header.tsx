import { useState } from "react"
import { useStoreModal } from "../../../store/useStoreModal"
import styles from "./Header.module.css"
import { IUser } from "../../../types/IUser"
import { getAllImages } from "../../../cruds/crudImage"
import { IImage } from "../../../types/IImage"

export const Header = () => {
    
    const {openModalAddFile} = useStoreModal()
    const [users, setUsers]=  useState<IImage[]>([])

    const handleClick = () => {
        openModalAddFile()
    }

    const handleFetchUsers = async () =>{
        setUsers(await getAllImages())

        console.log(users)
    }
  
    return (

        <header className={styles.header}>
            <div>
                <h2>Cloudinary Test</h2>
            </div>

            <button className={styles.addImageButton} onClick={handleClick}>Añadir Imagen</button>

            <button onClick={handleFetchUsers}>Traer usuarios</button>
        </header>

  )
}
