import React, { useState } from 'react';
import { swalError } from '../../../../utils/swalError';
import styles from './ModalChangePhotoProfile.module.css'
import { useStoreModal } from '../../../../store/useStoreModal';
import { putPhotoProfileImage } from '../../../../cruds/crudUser';
import { swalSucces } from '../../../../utils/swalSucces';

export const ModalChangePhotoProfile = () => {

    const {closeModalChangePhotoProfile} = useStoreModal()

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)


    const MAX_FILE_SIZE = 10 * 1024 * 1024 
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];


    const handleCloseModal = () => {
        setSelectedFile(null)
        setIsSubmitting(false)
        setPreview(null)
        closeModalChangePhotoProfile()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = (e.target as HTMLInputElement).files?.[0]

        //valida el tamaño de la imagen
        if(file){
            if (file.size > MAX_FILE_SIZE) {
                swalError("Archivo demasiado grande", "El tamaño máximo permitido es de 10MB")
                e.target.value = ""
                return
        }

        //valida tipo de archivo
        if(!ALLOWED_TYPES.includes(file.type)){
            swalError("Tipo de archivo no permitido", "Solo se permiten imagenes JPG, PNG o WEBP")
            return;
        }

        setSelectedFile(file)

        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreview(fileReader.result as string)
        }
        fileReader.readAsDataURL(file)


        }
    }


    const handleSumbit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        if(!selectedFile){
            swalError("No se seleccionó un archivo", "Seleccione una imagen de foto perfil")
            setIsSubmitting(false)
            return
        }

        const formData = new FormData();
        formData.append("file", selectedFile)

        try{
            await putPhotoProfileImage(formData)
            swalSucces("Imagen subida", "Foto de perfil cambiada con exito!")
            
        }catch (err){
            console.log("error en el formulario de perfil")

            swalError("Error al subir la imagen")
        }finally{
            setIsSubmitting(false)

        }
    }

  return (
    <>
        <div className={styles.modalPhotoProfileContainer}>
        {/*si se subió un archivo no muestra instrucción*/}
        {!preview && <h4>Subir un archivo</h4>}


        <form action="" className={styles.formContainer} onSubmit={handleSumbit}>
            <div className={styles.containerImage}>

                {preview && <img className={styles.image} src={preview} alt="Vista previa"/>}

                <label htmlFor="fileInput" className={styles.customUploadButton}>
                📁 Subir archivo
                </label>
                <input type="file" className={styles.hiddenInput} onChange={handleChange} name="" id="fileInput" />

            </div>


            <div className={styles.containerButtons}>

            <button onClick={handleCloseModal}>Cancelar</button>
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
