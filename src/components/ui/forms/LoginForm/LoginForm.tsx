import { useState } from "react"
import styles from "./LoginForm.module.css"
import { formLoginSchema } from "../../../../yupSchemas/formLoginSchema"
import { ILoginRequest } from "../../../../types/ILoginRequest"
import { login } from "../../../../cruds/crudLoginRegister"
import { useStoreLoginRegister } from "../../../../store/useStoreLoginRegister"
import { useStoreModal } from "../../../../store/useStoreModal"
import { useStoreUser } from "../../../../store/useStoreUser"



export const LoginForm = () => {

    const {setStatusLoginRegister} = useStoreLoginRegister()
    const {closeModalLoginRegister} = useStoreModal()
    const {setLoguedUser, loguedUser} = useStoreUser()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formValues, setFormValues] = useState<ILoginRequest>({
      usernameOrEmail: "",
      password: ""
    })

    const [formErrors, setFormErrors] = useState<Record<string, string>>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    const handleClose = () => {
      setFormValues({
        usernameOrEmail: "",
        password: ""
      })
      setStatusLoginRegister("")
    } 

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      try{
        //validacion de yup
        await formLoginSchema.validate(formValues, {abortEarly: false})

        //put para login
        await login(formValues)

        await setLoguedUser()
        console.log(loguedUser)
        handleClose()
        closeModalLoginRegister()
      }catch (error: any){
        const errors: Record<string, string> = {}

            if(error.inner){
                error.inner.forEach((validationError:any) =>{
                    errors[validationError.path] = validationError.message;
                });
            }else{
                error.general = error.message
            }
            setFormErrors(errors)  
      }finally{
        
        setIsSubmitting(false)
      }
    }

  return (
    <>
        <div>
            <form action="" onSubmit={handleSubmit}>

                <div className={styles.inputContainer}>
                    <input type="text" name="usernameOrEmail" id="username" placeholder="Nombre de usuario"  onChange={handleChange} value={formValues.usernameOrEmail}/>
                    {formErrors.usernameOrEmail && <p className={styles.errorMessage}>{formErrors.usernameOrEmail}</p>}
                </div>

                <div className={styles.inputContainer}>
                    <input type="password" name="password" id="password" placeholder="Contraseña" onChange={handleChange} value={formValues.password}/>
                    {formErrors.password && <p className={styles.errorMessage}>{formErrors.password}</p>}
                </div>


                <div className={styles.containerButtons}>
                    <button onClick={handleClose}>Cancelar</button>
                    <button type="submit" disabled={isSubmitting} className={isSubmitting ? styles.loadingButton : ""}>
                      {isSubmitting 
                      ? (
                        <>
                          <span className={styles.spinner}></span>
                          
                        </>

                      )
                    : ("Aceptar")}
                    </button>
                </div>
            </form>
        </div>
    </>
  )
}
