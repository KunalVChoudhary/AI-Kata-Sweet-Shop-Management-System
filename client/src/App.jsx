import './App.css'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'


function App() {

  const {user} = useAuth()

  return (
    <>
      <Routes>
          <Route path='/register' element = { !user ? <RegisterPage purpose='Sign Up' /> : <Navigate to={'/'} /> } />

          <Route path='/login' element = { !user ? <RegisterPage purpose='Sign In' /> : <Navigate to={'/'} /> } />

          <Route path='/' element = { <HomePage /> } />

      </Routes>
    </>
  )
}

export default App
