import { FC, useEffect, useState } from 'react'
import { useStoreImages } from '../../../store/useStoreImages'
import styles from './Pagination.module.css'
import { useStoreListCategories } from '../../../store/useStoreListCategories'
import { useStoreUser } from '../../../store/useStoreUser'
import { IPage } from '../../../types/IPage'
import { IImage } from '../../../types/IImage'

interface IPagination {
    whereFrom: string
}

export const Pagination:FC<IPagination> = ({whereFrom}) => {

    const { fetchImagesStore, fetchImagesUserStore} = useStoreImages()
    const {activeCategory} = useStoreListCategories()
    const {loguedUser, activeUser} = useStoreUser()

    const [actualPage, setActualPage] = useState(0)
    const [imagesToUse, setImagesToUse] = useState<IPage<IImage>>({
                        content: [],
                        totalPages: 0,
                        totalElements: 0,
                        size: 10,
                        number: 0
                    })
    
    


    const getPagedImages = async () => {
        if(whereFrom === "Main"){
        const data = await fetchImagesStore(actualPage, 2, activeCategory?.id)
        setImagesToUse(data)
    } else {
        const userId = activeUser ? activeUser.id : loguedUser!.id
        const data = await fetchImagesUserStore(userId, actualPage, 6)
        setImagesToUse(data)
    }
    }

    useEffect(()=> {
        getPagedImages()
    }, [actualPage, activeUser, whereFrom])

    useEffect(()=> {
        setActualPage(0)
    },[activeUser, whereFrom])
  return (
    <>
        <div className={styles.pagination}>
            <button disabled={actualPage===0} className={styles.paginationButton} onClick={()=> setActualPage(actualPage - 1)}><img src="/chevron_left.svg" alt="" /></button>

            {Array.from({length: imagesToUse.totalPages}, (_,i) => i)
                .filter((page) =>
                    page === 0 ||
                    page === imagesToUse.totalPages - 1 ||
                    Math.abs(page - actualPage) <= 2
                )
                .reduce((acc: (number | string)[], page, index, array)=>{
                    if(index > 0 && page - (array[index - 1] as number) > 1 ){
                        acc.push("...")
                    }
                    acc.push(page)

                    return acc
                },[])
                .map((page, i) =>
                    page === "..." ? (
                        <span key={i} className={styles.paginationEllipsis}>...</span>
                    ) :
                    (
                        <button className={`${styles.paginationButton} ${actualPage === i ? styles.active : ""}`} key={i} onClick={() => setActualPage((page as number))}>
                            {(page as number) + 1}
                        </button>
                    )
                )
            }
            
            <button disabled={actualPage+1===imagesToUse.totalPages} className={styles.paginationButton} onClick={()=> setActualPage(actualPage + 1)}><img src="/chevron_right.svg" alt="" />
            </button>
        </div>
    </>
  )
}
