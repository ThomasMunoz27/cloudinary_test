import { useState } from "react"
import styles from "./ModalAddFile.module.css"
import { useStoreModal } from "../../../../store/useStoreModal"
import { postImageCloudinary } from "../../../../cruds/crudImage"
import { ModalSelectCategories } from "../modalSelectCategories/ModalSelectCategories"
import { useStoreCategory } from "../../../../store/useStoreCategory"
import { swalError } from "../../../../utils/swalError"
import { swalSucces } from "../../../../utils/swalSucces"

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
  const {categoriesIdSelected, setCaregoriesIdSelected} = useStoreCategory()

  const MAX_FILE_SIZE = 10 * 1024 * 1024 
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const handleCloseModal= () => {
    setCaregoriesIdSelected([])
    closeModalAddFile()
  }


  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.type === "file") {

		const file = (e.target as HTMLInputElement).files?.[0];
		if (file) {

      //valida el tamaño de la imagen
      if(file.size > MAX_FILE_SIZE){
        swalError("Archivo demasiado grande", "El tamaño máximo permitido es de 10MB")
        e.target.value = ""
        return
      }

      //valida tipo de archivo
      if (!ALLOWED_TYPES.includes(file.type)) {
        swalError("Tipo de archivo no permitido", "Solo se permiten imagenes JPG, PNG o WEBP")
        return;
      }
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
    console.log("enviando formulario")
    
    if(!selectedFile){
      swalError("No se seleccionó un archivo", "Seleccione una imagen para subir")
      console.log("No se seleccionó un archivo")
      return;
    }
    if(categoriesIdSelected.length === 0){
      swalError("No se seleccionaron categorias", "Seleccione por lo menos una categoria para la imagen.")
      console.log("No se seleccionaron categorias")
      return
    }

    const formData = new FormData();
    formData.append("file", selectedFile)
    formData.append("name", formValues.name)
    formData.append("description", formValues.description)
    formData.append("userId", formValues.userId.toString())
    categoriesIdSelected.forEach((idCategory) => {
      formData.append("categoryId", idCategory.toString())
    })


    try{
        await postImageCloudinary(formData)
    }catch (err){
      console.log("error en el formulario")
    }finally{
      closeModalAddFile()
      swalSucces("Imagen subida", "Imagen compartida con exito!")
    }
  }

  return (
    <>
    <div className={styles.modalContainer}>


        {/*si se subió un archivo no muestra instrucción*/}
        {!preview && <h4>Subir un archivo</h4>}
        <form className={styles.formContainer} action="" onSubmit={handleSumbit}>

          <div className={styles.containerImage}>
            {preview && <img className={styles.image} src={preview} alt="Vista previa"/>}

          <label htmlFor="fileInput" className={styles.customUploadButton}>
	        📁 Subir archivo
          </label>
          <input type="file" className={styles.hiddenInput} onChange={handleChange} name="" id="fileInput" />

          </div>

          <input className={styles.inputForUser} placeholder="Nombre de la imagen" onChange={handleChange} type="text" name="name" id="" value={formValues.name}/>

          <textarea className={styles.textAreaForUser} name="description" id="" placeholder="Descripcion para la imagen" value={formValues.description} onChange={handleChange}></textarea>

          <button className={styles.selectCategoryButton} type="button" onClick={()=> openModalSelectCategories()}>Seleccione categorias</button>

          <div className={styles.containerButtons}>

            <button onClick={handleCloseModal}>Cancelar</button>
            <button type="submit">Aceptar</button>

          </div>
        </form>

        {/*Sub modal*/}
        {modalSelectCategories && <div className={styles.modalBackdrop}><ModalSelectCategories></ModalSelectCategories></div>}

    </div>


    </>
  )
}
