import { useEffect, useState } from 'react'
import { useStoreLoginRegister } from '../../../../store/useStoreLoginRegister'
import { useStoreModal } from '../../../../store/useStoreModal'
import { swalSucces } from '../../../../utils/swalSucces'
import styles from './MenuSideBar.module.css'
import { useNavigate } from 'react-router'

export const MenuSideBar = () => {

    const [visible, setVisible] = useState(false)

    const navigate = useNavigate()
    const {openModalLoginRegister, closeModalMenuSideBar} = useStoreModal()
    const {setStatusLoginRegister} = useStoreLoginRegister()

    const handleOpenLogin = () =>{
        setStatusLoginRegister("Login")
        openModalLoginRegister()
        closeModalMenuSideBar()
    }

    const handleOpenRegister = () =>{
        setStatusLoginRegister("Register")
        openModalLoginRegister()
        closeModalMenuSideBar()
    }

    const closeSession = () => {
        localStorage.clear()
        swalSucces("Sesion cerrada")
    }

    useEffect(() => {
		// Espera un frame para permitir que la transición funcione
		const timeout = setTimeout(() => setVisible(true), 10)
		return () => clearTimeout(timeout)
	}, [])
  return (
    <>
        <div className={`${styles.sideBar} ${visible ? styles.active : ''}`}>
            <div className={styles.optionInMenu} onClick={handleOpenLogin}>
                <p>Iniciar Sesión</p>
            </div>
            <div className={styles.optionInMenu} onClick={handleOpenRegister}>
                <p>Registrar Usuario</p>
            </div>
            <div className={styles.optionInMenu} onClick={() => navigate("/categories")}>
                <p>Categorias</p>
            </div>
            <div className={styles.optionInMenu} onClick={closeSession}>
                <p>Cerrar sesión</p>
            </div>
        </div>
    </>
  )
}
