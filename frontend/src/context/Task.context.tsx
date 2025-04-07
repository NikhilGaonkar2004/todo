import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { BACKEND_URI } from "../enviroment";
import { toast } from "react-toastify"; 
 

export type Task ={
    title:string
    description:string
    isComplete:boolean
    _id:string
}
interface TaskContextIf {
    addTask:(title:string,desc:string)=>void
    getAllTasks:()=>void
    tasks:Task[]
    loading: boolean
    error: string | null
    deleteTaskById: (id: string) => void
    editTaskById: (id: string) => void
}

const AuthContext = createContext<TaskContextIf>({
    addTask: () => { },
    getAllTasks: () => { },
    tasks: [],
    loading: false,
    error: null,
    deleteTaskById: () => { },
    editTaskById: () => { }
    
})


export const useTask = ()=>{
    return useContext(AuthContext)
}


export const TaskProvider = ({children}:{children:ReactNode})=>{
   
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        getAllTasks()
    },[])

    const addTask=async(title:string,desc:string)=> {
        try {
            setLoading(true)
            const response = await fetch(BACKEND_URI+"/task/add",{
                method: "POST",
                body:JSON.stringify({
                    title,
                    desc
                }),
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.json()
            if(data.msg){
                toast.success(data.msg)
                getAllTasks()
            }else{
                toast.error(data.message || "Failed to add task")
            }
        } catch (error) {
            toast.error("Something went wrong")
            setError("Failed to add task")
        } finally {
            setLoading(false)
        }
    }

    const getAllTasks = async () => {
        try {
            setLoading(true)
            const response = await fetch(BACKEND_URI+"/task/get-all", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.json()
            if(data.tasks){
                setTasks(data.tasks)
            }else{
                toast.error(data.message || "Failed to fetch tasks")
                setError(data.message || "Failed to fetch tasks")
            }
        } catch (error) {
            toast.error("Something went wrong")
            setError("Failed to fetch tasks")
        } finally {
            setLoading(false)
        }
    }

    const deleteTaskById = async (id:string) => {
        try {
            setLoading(true)
            const response = await fetch(BACKEND_URI+"/task/delete/"+id,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.json()
            if(data.msg){
                toast.success(data.msg)
                getAllTasks()
            }else{
                toast.error(data.message || "Failed to delete task")
            }
        } catch (error) {
            toast.error("Something went wrong")
            setError("Failed to delete task")
        } finally {
            setLoading(false)
        }
    }

    const editTaskById = async (id: string) => {
        try {
            setLoading(true)
            const response = await fetch(BACKEND_URI+"/task/edit/"+id,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.json()
            if(data.msg){
                toast.success(data.msg)
                getAllTasks()
            }else{
                toast.error(data.message || "Failed to update task")
            }
        } catch (error) {
            toast.error("Something went wrong")
            setError("Failed to update task")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{
            addTask,
            getAllTasks,
            tasks,
            loading,
            error,
            deleteTaskById,
            editTaskById
        }}>
            {children}
        </AuthContext.Provider>
    )
}
