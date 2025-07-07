import { useState } from "react"
import styles from "./ModalAddFile.module.css"
import { useStoreModal } from "../../../../store/useStoreModal"
import { postImageCloudinary } from "../../../../cruds/crudImage"
import { ModalSelectCategories } from "../modalSelectCategories/ModalSelectCategories"

export const ModalAddFile = () => {
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    userId: 1,
    categories: []

  })

  const {closeModalAddFile, openModalSelectCategories, modalSelectCategories} = useStoreModal()


  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.type === "file") {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (file) {
			setSelectedFile(file);
			const fileReader = new FileReader();
			fileReader.onload = () => {
				setPreview(fileReader.result as string);
			};
			fileReader.readAsDataURL(file);
		}
	} else {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	}

    

  }

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if(!selectedFile){
      console.log("no se seleccionó un archivo")
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile)
    formData.append("name", formValues.name)
    formData.append("description", formValues.description)
    formData.append("userId", formValues.userId.toString())


    try{
        await postImageCloudinary(formData)
    }catch (err){
      console.log("error en el formulario")
    }
  }

  return (
    <>
    <div className={styles.modalContainer}>

        <div>Soy el modalAddFile</div>

        {/*si se subió un archivo no muestra instrucción*/}
        {!preview && <p>Suba un archivo</p>}
        <form className={styles.formContainer} action="" onSubmit={handleSumbit}>

          <div className={styles.containerImage}>
            {preview && <img className={styles.image} src={preview} alt="Vista previa"/>}

          <input type="file" onChange={handleChange} name="" id="" />

          </div>

          <input className={styles.inputForUser} placeholder="Nombre de la imagen" onChange={handleChange} type="text" name="name" id="" value={formValues.name}/>

          <textarea className={styles.textAreaForUser} name="description" id="" placeholder="Descripcion para la imagen" value={formValues.description} onChange={handleChange}></textarea>

          <button type="button" onClick={()=> openModalSelectCategories()}>Seleccione categorias</button>

          <div className={styles.containerButtons}>

            <button onClick={closeModalAddFile}>Cancelar</button>
            <button type="submit">Aceptar</button>

          </div>
        </form>

        {/*Sub modal*/}
        {modalSelectCategories && <div className={styles.modalBackdrop}><ModalSelectCategories></ModalSelectCategories></div>}

    </div>


    </>
  )
}
