import { useEffect, useState } from 'react'
import styles from './ListUsers.module.css'
import { IUserDTOResponse } from '../../../types/IUserDTOResponse'
import { getAllUsersDto } from '../../../cruds/crudUser'
import { UserCard } from '../Cards/UserCard/UserCard'

export const ListUsers = () => {

    const [allUsers, setAllUsers] = useState<IUserDTOResponse[]>([])

    const [search, setSearch] = useState("")
    const [searchSugestions, setSearchSugestions] = useState<IUserDTOResponse[]>([])


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        setSearch(value)

        if(value.trim().length > 0){
            const filteredUsers = allUsers.filter(user =>
                user.username.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 15)
            setSearchSugestions(filteredUsers)
        }else{
            setSearchSugestions([])
        }
    }


    useEffect(()=> {

        const fetchUsers = async ()=>{
            const usersFetched = await getAllUsersDto()
            setAllUsers(usersFetched)
        }

        fetchUsers()

    },[])
  return (
    <>
        <div>
            <div className={styles.searchBarContainer}>
                <input className={styles.searchBar} type="text" placeholder='Busque un usuario' id="" value={search} onChange={handleSearch}/>
            </div>

            <div className={styles.resultsContainer}>
                {searchSugestions.map(user => (
                    <UserCard key={user.id} user={user}></UserCard>
                ))}
            </div>
        </div>
    </>
  )
}
