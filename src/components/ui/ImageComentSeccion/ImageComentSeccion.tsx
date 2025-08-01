import { useEffect, useState } from 'react'
import { useStoreImages } from '../../../store/useStoreImages'
import styles from './ImageComentSeccion.module.css'
import { ICommentDTOResponse } from '../../../types/ICommentDTOResponse'
import { getAllCommentByImageId, postCommentInImage } from '../../../cruds/crudComments'
import { CommentCard } from '../Cards/CommentCard/CommentCard'
import { ICommentPostRequest } from '../../../types/ICommentPostRequest'
import { swalError } from '../../../utils/swalError'
import { swalSucces } from '../../../utils/swalSucces'

export const ImageComentSeccion = () => {

    const {image} = useStoreImages()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [comments, setComments] = useState<ICommentDTOResponse[]>([])

    const [formValues, setFormValues] = useState({
        comment: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try{
            const commentPostRequest: ICommentPostRequest ={
                content: formValues.comment,
                imageId: image!.id
            }

            await postCommentInImage(commentPostRequest)
        }catch(err){
            swalError("Error al comentar")
        }finally{
            setIsSubmitting(false)
            swalSucces("Comentario publicado")
        }
    }

    useEffect(()=>{
        const fetchComments = async()=> {
            const fetchedComments = await getAllCommentByImageId(image!.id)
            setComments(fetchedComments)
        }
        fetchComments()
    },[])
  return (
    <>

        <form action="" onSubmit={handleSubmit} className={styles.formContainer}>

            <input className={styles.contentInput} type="text" name='comment' onChange={handleChange} value={formValues.comment} placeholder='Escribe un comentario' />

            <div className={styles.containerButtons}>

                <button type="submit" disabled={isSubmitting} className={isSubmitting ? styles.loadingButton : ""}>
                    {isSubmitting 
                    ? (<>
                        <span className={styles.spinner}></span>
                        </>)
                    : ("Publicar comentario")}
                </button>
            </div>
        </form>
        
        <div className={styles.commentSeccion}>
            {comments.map(comment => 
                (<CommentCard key={comment.id} comment={comment}></CommentCard>)
                )}
        </div>
    </>
  )
}
