import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from '../services/baseurl';
import { editProfileAPI } from '../services/allAPI';

function Profile({}) {
  const [open, setOpen] = useState(false);
  const [existingImage,setexistingImage] = useState("")
  const [isupdate,setisUpdate] =useState(false)
  const [existingUser,setexistingUser] =useState("")
  const [preview , setPreview] = useState("")

    const [userProfile,setuserProfile] = useState({
      username:"",
      email:"",
      password:"",
      github:"",
      linkedin:"",
      profile: ""
    })
    console.log(userProfile);
    
   
useEffect(()=>{
  const user = JSON.parse(sessionStorage.getItem("existingUser"))
  setuserProfile({...userProfile,username:user.username,email:user.email,password:user.password,profile:"",github:user.github,linkedin:user.linkedin})
   
setexistingImage(user.profile)
},[isupdate])

useEffect(()=>{
  if(userProfile.profile){
    setPreview(URL.createObjectURL(userProfile.profile))
  }
  else{
    setPreview("")
  }
},[userProfile.profile])
              

const handleProfileUpdate = async()=>{
  const{username,email,password,profile,github,linkedin} = userProfile
  if(!github || !linkedin){
    alert('Please fill the form completely')
  }
  else{
    const reqBody = new FormData()
    reqBody.append("username",username)
    reqBody.append("email",email)
    reqBody.append("password",password)
    reqBody.append("github",github)
    reqBody.append("linkedin",linkedin)
    preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)
    const token = sessionStorage.getItem("token")

    if(preview){
      const reqHeader ={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
    }
    const result = await editProfileAPI(reqBody,reqHeader)
    console.log(result);
    if(result.status==200){
      alert('Profile Updated')
      sessionStorage.setItem("existingUser",JSON.stringify(result.data))
      setisUpdate(true)
    }
    else{
      console.log(result.response.data);
    }
    
    }
    else{
      const reqHeader ={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
    }
    const result = await editProfileAPI(reqBody,reqHeader)
    console.log(result);
    if(result.status==200){
      alert('Profile Updated')
      sessionStorage.setItem("existingUser",JSON.stringify(result.data))
     
    }
    else{
      console.log(result.response.data);
    }
    }
  }

}




  return (
    <div className='card shadow p-5 mb-4'>
        <div className="d-flex justify-content-between">
            <h3>Profile</h3>
            <button   onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-angle-down"></i></button>
        </div>
       <Collapse 
       in={open}>
            <div className="row align-items-center text-center mt-3">
            <label htmlFor="profile" className='text-center'>
                    <input id='profile' style={{display:'none'}} type="file" onChange={(e)=>setuserProfile({...userProfile,profile:e.target.files[0]})} />
                   { existingImage==""?
                   <img width={'200px'} height={'200px'} src={preview?preview:"https://www.freeiconspng.com/uploads/female-user-icon-clip-art--30.png"} alt="no image" className='rounded-circle' />:
                    <img width={'200px'} height={'200px'} src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="no image" className='rounded-circle' />}
                </label>
              <div className='row mb-3 mt-4'>  
               <h2></h2>
              </div>
              <div className='row mb-3 mt-4'>  
                <input className='m-1' type="text" placeholder='Github' value={userProfile.github} onChange={(e)=>setuserProfile({...userProfile,github:e.target.value})}/>
              </div>
               <div className='row mb-3'> 
               <input className='m-1' type="text" placeholder='Linkedin' value={userProfile.linkedin} onChange={(e)=>setuserProfile({...userProfile,linkedin:e.target.value})}/>
               </div>
                <div className='row'>
                    <button className='btn btn-success m-1' onClick={handleProfileUpdate}>Update</button>
                    </div>
            </div>
       </Collapse>
    </div>
  )
}

export default Profile