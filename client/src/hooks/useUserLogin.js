import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

//custom hook/function to handle users login/register requests
export default function useUserLogin(){
    const [loading, setLoading] = useState(false)
    const {user, setUser, role, setRole} = useAuth()
    const navigate = useNavigate();

    const loginUser = async (purpose,loginData)=>{
        setLoading(true)
        try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/${(purpose === 'Sign Up')? 'register' : 'login'}`,{
            method : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData),
            credentials: 'include'
        })
        const data = await response.json()
        if (response.ok){
            toast.success(data.message)
            setUser(data.username)
            setRole(data.role)
            setTimeout(()=> navigate('/'),2000)
        } else if (response.status===400){
            toast.error(data.message)
        } else {
            toast.error(data.message)
        }}
        catch(error){
            toast.error('Error! Try Again')
        }
        finally{
            setLoading(false)
        }
    }

    return { loginUser, loading, user, role };

}