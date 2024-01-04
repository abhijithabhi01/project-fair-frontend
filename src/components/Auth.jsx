import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../Contexts/ContextShare';


function Auth({ register }) {
//logout context
const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)

  const navigate = useNavigate()
  //state to store data
  const [userData, setUserData] = useState({
    username:"",
    email:"",
    password:""
  })
 /*  console.log(userData) */
  const isRegisterForm = register ? true : false
  //register function
  const handleRegister= async (e)=>{
    e.preventDefault()
    const {username, email,password}= userData
    /* console.log(userData); */

    if(!username || !email || !password){
      toast.info('Pease fill the form completely')
    }else{
      const result =  await registerAPI(userData)
      console.log(result);
      if(result.status===200){
        toast.success(`${result.data.username} registed successfully`)
        setUserData({
          username:"",email:"",password:""
        })
        navigate('/login')
      }else{
        toast.error(result.response.data)
        console.log(result);
      }
    } 
  }

  //login function
  const handleLogin = async (e)=>{
    e.preventDefault()
    const {email,password}= userData
    /* console.log(userData); */

    if(!email || !password){
      toast.info('Pease fill the form completely')
    }else{
      const result =  await loginAPI(userData)
      console.log(result);
      if(result.status===200){
       /*  toast.success(`login successfully`) */
       //sessionstorage is similar to local stoarge but in session storage the data get removed when the tag is closed but in local stoarge data remain untill we manually remove it.
       sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
       sessionStorage.setItem("token",result.data.token)

        setUserData({
         email:"",password:""
        })
        setIsAuthToken(true)
        toast.success('Login Sucessful')
        //navigate
        setTimeout(() => {
            
            navigate('/')
           
        }, 2000);
      }else{
        toast.error(result.response.data)
        console.log(result);
      }
    } 
  }
  return (
    <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <div className='w-75 container'>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'blue' }}><i class="fa-solid fa-arrow-left me-3"></i>Back to Home</Link>
        <div className='card shadow p-5 bg-success mb-5'>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img
                src="http://www.tropiqana.com/fundsmanager/app-assets/img/gallery/login.png"
                alt="login"
                className="rounded-start w-100"
              />
            </div>
            <div className="col-lg-6 p-5">
              <div className='d-flex align-items-center flex-column'>
                <h1 className='fw-bolder text-light mt-2'><i class="fa-brands fa-stack-overflow me-3"></i>Project Fair</h1>
                <h5 className='fw-bolder mt-4 pb-3 text-light'>
                  {
                    isRegisterForm ? 'Sign up to your Account' : 'Sign In to your Account'
                  }
                </h5>
                <Form className='text-light w-100 mt-4'>
                  { isRegisterForm &&
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Username" value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} />
                  </Form.Group>}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter your Email Id" value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}  />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="password" placeholder="Enter your password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}  />
                  </Form.Group>

                   {
                    isRegisterForm ?
                    <div>
                      <button onClick={handleRegister} className='btn btn-warning mt-3'>Register</button>
                      <p>Already have account? Click here to <Link style={{color:'blue'}} to={'/login'}> Login</Link></p>
                    </div> :
                    <div>
                    <button onClick={handleLogin} className='btn btn-warning mt-3'>Login</button>
                    <p>New User? Click here to <Link to={'/register'} style={{color:'blue'}} > Register</Link></p>
                  </div> 
                   }
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={2000} theme='colored' />
    </div>

  )
}

export default Auth