import React, { useEffect, useState,useContext } from 'react'
import AddProject from './AddProject'
import { deleteProjectAPI, userProjectAPI } from '../services/allAPI'
import EditProject from './EditProject';
import { addProjectResponseContext, editProjectResponseContext } from '../Contexts/ContextShare';


function Myprojects() {
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
  const [userProjects,setUserProjects]=useState([])

  const getUserProject = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await userProjectAPI(reqHeader)
     // console.log(result);
      if(result.status===200){
          setUserProjects(result.data)
      }else{
        console.log(result);
      }
    }
     
  }
  //console.log(userProjects);
  useEffect(()=>{
    getUserProject() 
  },[addProjectResponse,editProjectResponse])


  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader ={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
  } 
     const result = await deleteProjectAPI(id,reqHeader)
     if(result.status===200){
      //call getUserProject
      getUserProject()
     }
     else{
      alert(result.response.data)
     }
  }

  return (
    <div className='card shadow p-3 ms-3 me-3 mb-5'>
        
        <div className='d-flex'>
           <h3 className='text-success ms-3'> My projects</h3>
           <div className="ms-auto">
            <AddProject/>
           </div>

        </div>
        <div className="mt-4 ">
            {/* collection of user project */}
            {userProjects?.length>0?
            userProjects.map((item)=>( <div className="border d-flex align-items-center rounded m-2 p-2 border border-primary">
            <h5>{item.title}</h5>
            <div className="icon ms-auto">
            
                <EditProject project ={item}/>
                <a href={item.github} target='_blank' className="btn"><i class="fa-brands fa-github text-success"></i></a>

                <button onClick={(e)=>handleDelete(item._id)} className="btn"><i class="fa-solid fa-trash text-danger"></i></button>

            </div>
        </div>))
           :
            <p className='text-danger fw-bolder fs-3'>No project uploaded yet !!</p>}
        </div>
        
    </div>
  )
}

export default Myprojects