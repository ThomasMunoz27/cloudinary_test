import { FC, useEffect, useState } from 'react'
import styles from './UserStats.module.css'
import { IImageForUserDTO } from '../../../types/IImageForUserDto'
import { getImagesStatsByUser } from '../../../cruds/crudImage'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


interface IUserStats {
    userId: number
}

export const UserStats:FC<IUserStats> = ({userId}) => {

    const [imagesStats, setImagesStats] = useState<IImageForUserDTO[]>([])

    const data =  Object.values(
	imagesStats.reduce((acc, img) => {
		const date = new Date(img.dateUpload).toLocaleDateString()

		if (!acc[date]) {
			acc[date] = {
				name: date,
				likes: 0,
				dislikes: 0
			}
		}

		acc[date].likes += img.likes
		acc[date].dislikes += img.dislike

		return acc
	}, {} as Record<string, { name: string; likes: number; dislikes: number }>)
)
    useEffect(()=>{

        const fetchStats = async ()=> {
            const statsFetched = await getImagesStatsByUser(userId)
            setImagesStats(statsFetched)
        }

        fetchStats()
    }, [userId])

  return (
    <>
    <div className={styles.chartContainer}>
        <h3>Evolucion Likes y Dislikes</h3>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                <XAxis dataKey="name" tick={{ fill: "#555" }}/>
                <YAxis tick={{ fill: "#555" }}/>
                <Tooltip contentStyle={{
						backgroundColor: "#fff",
						borderRadius: "8px",
						boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
					}}/>
                <Legend/>
                <Line type='monotone' dataKey="likes" stroke='#82ca9d' activeDot={{r: 6}}/>
                <Line type='monotone' dataKey="dislikes" stroke='#ff6b6b' activeDot={{r: 6}}/>
            </LineChart>
        </ResponsiveContainer>
    </div>
    </>
  )
}
