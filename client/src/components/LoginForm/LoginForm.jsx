import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserLogin from '../../hooks/useUserLogin';
import styles from './LoginForm.module.scss'

function LoginForm({purpose}){

    //state for form data
    const [loginData, setLoginData] = useState({
        email:'',
        username:'',
        password:''
    })

    const navigate = useNavigate()

    const { loginUser, loading, user} = useUserLogin()

    //handles change in form data
    const handleChange = (e) => {
        setLoginData((prev)=> ({...prev, [e.target.name]:e.target.value}))
    }

    //handles form submission
    const handleSubmission = async (e) =>{
        e.preventDefault()
        loginUser(purpose,loginData)
    }

  return (
    <div className='container-fluid'>
        <div className='row align-items-center disable'>

            {/* app image: image will be removed if screen size is small  */}
            <div className='col-sm-6 d-none d-sm-block'>
                <img className={styles.loginImage}  src="./vite.svg" alt="logo" />
            </div>
            
            {/* Actual Form Container */}
            <div className='col-sm-6 col-12'>
                <form onSubmit={handleSubmission} className="mx-md-4 my-5 d-flex flex-column justify-content-center">
                    {/* Email */}
                    <div className="d-flex row align-items-center m-0 mb-4">
                        <div className="col-12 p-0">
                            <div className="form-floating ps-2">
                                <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="name@example.com"
                                name="email"
                                value={loginData.email}
                                required
                                onChange={handleChange}
                                />
                                <label htmlFor="email">Email address</label>
                            </div>
                        </div>
                    </div>
                    {/* Username (only if Sign Up) */}
                    {purpose === 'Sign Up' && (
                        <div className="d-flex row align-items-center m-0 mb-4">
                            <div className="col-12 p-0">
                                <div className="form-floating ps-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="username"
                                    name="username"
                                    value={loginData.username}
                                    required
                                    onChange={handleChange}
                                />
                                <label htmlFor="username">Username</label>
                            </div>
                        </div>
                        </div>
                    )}
                    {/* Password */}
                    <div className="d-flex row align-items-center m-0 mb-4">
                        <div className="col-12 p-0">
                            <div className="form-floating ps-2">
                                <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                name="password"
                                value={loginData.password}
                                required
                                onChange={handleChange}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    {/* Submit Buttons */}
                    <div className="d-flex justify-content-center mt-2 mb-4 ">
                        <button type="submit" className="btn btn-outline-primary border-2 text-white px-4 pt-2">
                        {purpose}
                        </button>
                    </div>
                    <div className="d-flex justify-content-center">
                        {purpose === 'Sign Up'
                        ? (<p>Create an account? <span className="text-primary text-decoration-underline" onClick={()=>{navigate('/login')}} role="button">Sign in</span></p>)
                        : (<p>Already have an Account? <span className="text-primary text-decoration-underline" onClick={()=>{navigate('/register')}} role="button">Sign up</span></p>)
                        }
                    </div>
                </form>
            </div>

        </div>

        {/* To show loading state if request takes time */}
        {
        loading  &&
        <div className={`${styles['loadingBackground']} d-flex gap-2 justify-content-center align-items-center`}>
            <div className="spinner-grow text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        }
    </div>
  )
}


export default LoginForm