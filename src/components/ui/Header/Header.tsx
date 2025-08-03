import { useNavigate } from "react-router"
import { useStoreModal } from "../../../store/useStoreModal"
import { ModalAddFile } from "../modals/modalAddFile/ModalAddFile"
import { ModalLoginRegister } from "../modals/ModalLoginRegister/ModalLoginRegister"
import styles from "./Header.module.css"
import { MenuSideBar } from "../modals/MenuSideBar/MenuSideBar"


export const Header = () => {
    
    const {openModalAddFile, openModalLoginRegister, openModalMenuSideBar, closeModalMenuSideBar} = useStoreModal()
    const {modalAddFile, modalLoginRegister, modalMenuSideBar} = useStoreModal()
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

                <img className={styles.accountIcon} src="/account_circle.svg" alt="" onClick={openModalLoginRegister}/>

                <img className={styles.accountIcon} src="/menu.svg" alt="" onClick={openModalMenuSideBar}/>

            </div>

        {modalAddFile && <div className={styles.modalBackdrop}><ModalAddFile></ModalAddFile></div>}
        {modalLoginRegister && <div className={styles.modalBackdrop}><ModalLoginRegister></ModalLoginRegister></div>}
        {modalMenuSideBar && (
            <>
                <div className={styles.modalBackdrop} onClick={closeModalMenuSideBar}>
                </div>
                    <MenuSideBar></MenuSideBar>
            </>
        )}
        </header>

  )
}
