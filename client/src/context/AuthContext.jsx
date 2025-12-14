import { createContext, useState, useEffect  } from "react";

//using reacts contextapi to maintain states across components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); 
  const [role, setRole] = useState('USER')
  const [reloader, setReloader] = useState(0)

  const checkAuth = async()=>{
    try{
      const response =  await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check`,{
      method:'GET',
      credentials:'include'
      })
      if (response.ok){
        const data = await response.json()
        setUser(data.username)
        setRole(data.role)
      }else{
        setUser(null)
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null)
      setRole('USER')
    } finally{
      setAuthLoading(false)
    }
  }

  //call check auth in useEffect and set tge user value to it 
  useEffect(()=>{
    checkAuth()
  },[])

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading, reloader, setReloader, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}
