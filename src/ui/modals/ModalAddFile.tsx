import { useState } from "react"
import { uploadImage } from "../../cruds/crudCloudinary"
import styles from "./ModalAddFile.module.css"
import { useStoreModal } from "../../store/useStoreModal"

export const ModalAddFile = () => {
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const {closeModalAddFile} = useStoreModal()


  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if(!file){
      return
    }

    setSelectedFile(file)
    const fileReader = new FileReader()
    fileReader.onload = () =>{
      setPreview(fileReader.result as string)
    }
    fileReader.readAsDataURL(file)
  }

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try{
      if(selectedFile){
        await uploadImage(selectedFile)
      }
    }catch (err){
      console.log("error en el formulario")
    }
  }

  return (
    <>
    <div className={styles.modalContainer}>

        <div>Soy el modalAddFile</div>

        <p>Suba un archivo</p>
        <form action="" onSubmit={handleSumbit}>

          <div className={styles.containerImage}>
            {preview && <img className={styles.image} src={preview} alt="Vista previa"/>}

            <input type="file" onChange={handleChange} name="" id="" />

          </div>
          <div className={styles.containerButtons}>

            <button onClick={closeModalAddFile}>Cancelar</button>
            <button type="submit">Aceptar</button>

          </div>
        </form>
    </div>


    </>
  )
}
