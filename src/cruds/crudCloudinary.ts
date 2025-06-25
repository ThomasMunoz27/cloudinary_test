import axios from "axios"

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/ddn19kh9n/image/upload`

export const uploadImage = async (image :File) => {
    try{
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'cloudinary_test')
        formData.append('folder', 'fondos')
        const response = await axios.post(CLOUDINARY_URL, formData)
        return response.data
    }catch (err){
        console.log("Error al cargar imagen")
        return 
    }
}