import { useEffect, useState } from "react"
import { reactToImage } from "../../../cruds/crudReaction"
import { useStoreImages } from "../../../store/useStoreImages"
import { IReactionType } from "../../../types/Enums/IReactionType"
import styles from "./ShowImage.module.css"
import { IReactionDTOResponse } from "../../../types/IReactionDTOResponse"
import { swalError } from "../../../utils/swalError"
import { useStoreUser } from "../../../store/useStoreUser"
import { useNavigate } from "react-router"

export const ShowImage = () => {

    const {image, setImage} = useStoreImages()
    const {setActiveUser} = useStoreUser()
    const navigate = useNavigate()

    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)
    const [likeClicked, setLikeClicked] = useState(false)
    const [dislikeClicked, setDislikeClicked] = useState(false)

    const [userReaction, setUserReaction] = useState<IReactionType | null>(null)


    const handleLike = async () => {
        
        const idImage = image?.id
        if(idImage){

            try{
                const reaction:IReactionDTOResponse = await reactToImage(idImage, IReactionType.LIKE)
                setUserReaction(reaction.reactionType)

                //setear los likes y dislikes en la store en caso de recargar
                setImage({
                    ...image,
                    likes: reaction.likes,
                    dislike: reaction.dislikes
                })

                setLikes(reaction.likes)
                setDislikes(reaction.dislikes)
                setLikeClicked(true)
                setTimeout(() => setLikeClicked(false), 300);
            }catch (e){
                swalError("Error al dar like", "Verifique estar logueado")
                console.error(e);
                
            }
        }
    }

    const handleDislike = async () => {
        
        const idImage = image?.id
        if(idImage){
            try{
                const reaction:IReactionDTOResponse = await reactToImage(idImage, IReactionType.DISLIKE)
                setUserReaction(reaction.reactionType)
                setLikes(reaction.likes)
                setDislikes(reaction.dislikes)
                setDislikeClicked(true)
                setTimeout(() => setDislikeClicked(false), 300);
            }catch (e){
                swalError("Error al dar dislike", "Verifique estar logueado")
                console.error(e);
                
            }
        }
    }

    const handleNavigateUser = () => {
        setActiveUser(image!.userId.id)
        navigate(`/profile/${image!.userId.id}`)
    }

    useEffect(() => {
        console.log("lol")
        if (!image) return;

        const fetchInitialData = async () => {
            setLikes(image.likes);
            setDislikes(image.dislike);

            
        };

        fetchInitialData();
    }, [image])

  return (
    <>

        <div className={styles.principalContainer}>
            <h2 className={styles.title}>Vista de la imagen</h2>

            <div className={styles.imageWrapper}>
                <h3>{image?.name}</h3>
                <img className={styles.showedImage} src={image?.link} alt={image?.name} />
                <div className={styles.reactionsContainer}>
                    
                        <p onClick={handleLike} className={styles.reactionClicker}>
                            <img src="public\thumb_up.svg" alt="like" 
                            className={`${styles.reactionIcon} ${likeClicked ? styles.clicked : ""} ${userReaction === IReactionType.LIKE ? styles.activeLike : ""}`}/> 
                            <span>{likes}</span>
                            
                        </p>
                        <p onClick={handleDislike} className={styles.reactionClicker}>
                            <img src="public\thumb_down.svg" alt="dislike"  
                            className={`${styles.reactionIcon} ${dislikeClicked ? styles.clicked : ""} ${userReaction === IReactionType.DISLIKE ? styles.activeDislike : ""}`}/> 
                            <span>{dislikes}</span>
                            
                        </p>
                    
                </div>

                <div className={styles.imageDescription}>
                    <p>{image?.description}</p>
                </div>
                <div className={styles.authorSeccion}>
                    <p>Imagen subida por: <span className={styles.userName} onClick={handleNavigateUser}>{image?.userId.username}</span></p>
                </div>
            </div>
        </div>
    </>
  )
}
