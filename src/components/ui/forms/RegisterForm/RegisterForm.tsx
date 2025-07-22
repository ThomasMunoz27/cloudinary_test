import {  useState } from "react"
import styles from "./RegisterForm.module.css"
import { formRegisterSchema } from "../../../../yupSchemas/formRegisterSchema"
import { useStoreLoginRegister } from "../../../../store/useStoreLoginRegister"
import { IRegisterRequest } from "../../../../types/IRegisterRequest"
import { register } from "../../../../cruds/crudLoginRegister"


export const RegisterForm = () => {


    const {setStatusLoginRegister} = useStoreLoginRegister()

    const[formValues, setFormValues] = useState({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
    })
    const[formErrors, setFormErrors] = useState<Record<string, string>>({})




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    const resetForm = () => {
        setFormValues({
                username: "",
                email: "",
                password: "",
                repeatPassword: ""
            })

        setFormErrors({})
    }

    const handleClose = () => {
        //reinicio de formulario
        resetForm()
        setStatusLoginRegister("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try{
            //validacion de yup
            await formRegisterSchema.validate(formValues, {abortEarly: false})

            //Put para registrar aca
            const registerRequest: IRegisterRequest={
                username: formValues.username,
                email: formValues.email,
                password: formValues.password
            }

            await register(registerRequest)
            //codigo

            //mensaje de exito
            //swalSucces("Registrado", "Su usuario ha sido registrado")


            //reinicicio de formulario
            handleClose()
        }catch(error: any){
            const errors: Record<string, string> = {}

            if(error.inner){
                error.inner.forEach((validationError:any) =>{
                    errors[validationError.path] = validationError.message;
                });
            }else{
                error.general = error.message
            }
            setFormErrors(errors)        
        }


    }

  return (
    <>
        <div>
            <form action="" onSubmit={handleSubmit}>

                <div className={styles.inputContainer}>
                    <input type="text" name="username" id="username" placeholder="Nombre de usuario"  onChange={handleChange} value={formValues.username}/>
                    {formErrors.username && <p className={styles.errorMessage}>{formErrors.username}</p>}
                </div>

                <div className={styles.inputContainer}>
                    <input type="text" name="email" id="email" placeholder="Email" onChange={handleChange} value={formValues.email}/>
                    {formErrors.email && <p className={styles.errorMessage}>{formErrors.email}</p>}
                </div>

                <div className={styles.inputContainer}>
                    <input type="password" name="password" id="password" placeholder="Contraseña" onChange={handleChange} value={formValues.password}/>
                    {formErrors.password && <p className={styles.errorMessage}>{formErrors.password}</p>}
                </div>

                <div className={styles.inputContainer}>
                    <input type="password" name="repeatPassword" id="repeatPassword" placeholder="Repita la contraseña" onChange={handleChange} value={formValues.repeatPassword}/>
                    {formErrors.repeatPassword && <p className={styles.errorMessage}>{formErrors.repeatPassword}</p>}
                </div>

                <div className={styles.containerButtons}>
                    <button onClick={handleClose}>Cancelar</button>
                    <button type="submit">Aceptar</button>
                </div>
            </form>
        </div>
    </>
  )
}
