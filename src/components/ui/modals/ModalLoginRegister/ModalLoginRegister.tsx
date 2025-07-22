import styles from "./ModalLoginRegister.module.css"
import { useStoreLoginRegister } from "../../../../store/useStoreLoginRegister"
import { RegisterForm } from "../../forms/RegisterForm/RegisterForm"
import { LoginForm } from "../../forms/LoginForm/LoginForm"
import { useStoreModal } from "../../../../store/useStoreModal"


export const ModalLoginRegister = () => {

  const {statusLoginRegister, setStatusLoginRegister} = useStoreLoginRegister()
  const {closeModalLoginRegister} = useStoreModal()

  const handleButtonLogin = () => {
    setStatusLoginRegister("Login")
  }

  const handleButtonRegister  = () => {
    setStatusLoginRegister("Register")
  }

  const handleCloseModal = () => {
    setStatusLoginRegister("")
    closeModalLoginRegister()
  }

  const renderPromps = () => {
      switch (statusLoginRegister){
      case "Register":
        return (
        <div className={styles.promptSide}>
                  <h3>Registro de usuario</h3>
                  <p>Rellene los espacios para registrarse</p>
        </div>
      )
      case "Login":
        return (
        <div className={styles.promptSide}>
                  <h3>Inicio de Sesion</h3>
                  <p>Ingrese sus credenciales</p>
        </div>
      )
      default:
        return (
        <div className={styles.promptSide}>
                  <h3>Bienvenido al rincón del artista</h3>
                  <p>¿Que te gustaria hacer?</p>
        </div>
      )
    
    }
  }
  //funcion para renderizar opciones de formulario
  const renderOptions = () => {
    switch (statusLoginRegister){
      case "Register":
        return <RegisterForm></RegisterForm>
      case "Login":
        return <LoginForm></LoginForm>
      default:
        return (
          <div className={styles.buttonOptions}>
                  <button onClick={handleButtonLogin}>Iniciar sesion</button>
                  <button onClick={handleButtonRegister}>Registrar Usuario</button>
          </div>
        )
    }
  }

  return (
    <>
        <div className={styles.modalPrincipalContainer}>
            <img src="/close.svg" alt="Cerrar" className={styles.closeButton} onClick={handleCloseModal}/>
            {renderPromps()}

            <div className={styles.optionsOfLogin}>
                {renderOptions()}
            </div>
        </div>
    </>
  )
}
