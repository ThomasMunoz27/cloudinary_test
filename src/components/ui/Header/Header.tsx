import { useNavigate } from "react-router"
import { useStoreModal } from "../../../store/useStoreModal"
import { ModalAddFile } from "../modals/modalAddFile/ModalAddFile"
import { ModalLoginRegister } from "../modals/ModalLoginRegister/ModalLoginRegister"
import styles from "./Header.module.css"


export const Header = () => {
    
    const {openModalAddFile, openModalLoginRegister} = useStoreModal()
    const {modalAddFile, modalLoginRegister} = useStoreModal()
    const navigate = useNavigate()

    const handleClick = () => {
        openModalAddFile()
    }

    const handleNavigate = () =>{
        navigate("/")
    }
    
  
    return (

        <header className={styles.header}>
            <div className={styles.leftSide}>
                <h2 className={styles.logo} onClick={handleNavigate}>Cloudinary Test</h2>
            </div>

            <div className={styles.rightSide}>
                <button className={styles.addImageButton} onClick={handleClick}>Añadir Imagen</button>

                <img className={styles.accountIcon} src="public\account_circle.svg" alt="" onClick={openModalLoginRegister}/>

            </div>

        {modalAddFile && <div className={styles.modalBackdrop}><ModalAddFile></ModalAddFile></div>}
        {modalLoginRegister && <div className={styles.modalBackdrop}><ModalLoginRegister></ModalLoginRegister></div>}
        </header>

  )
}
