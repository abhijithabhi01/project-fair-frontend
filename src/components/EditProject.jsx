import React, { useContext, useEffect }  from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../services/baseurl';
import { editProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../Contexts/ContextShare';


function EditProject({project}) {
    //context api
    const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
    //to hold project details
    const[projectDetails,setProjectDetails]=useState({
        id:project._id,
        title:project.title,
        language:project.language,
        overview:project.overview,
        github:project.github,
        website:project.website,
        projectImage:""
    })

    const [preview,setPreview] = useState("")

    const [show, setShow] = useState(false);

    useEffect(()=>{
        if(projectDetails.projectImage){
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    },[projectDetails.projectImage])

 //  console.log(project);
    const handleClose1 =()=>{
        
        setProjectDetails({
            id:project._id,
            title:project.title,
            language:project.language,
            overview:project.overview,
            github:project.github,
            website:project.website,
            projectImage:"" 
        })
        setPreview("")
        handleClose()
    }
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);



    const handleUpdate = async()=>{
      
      //image field will be always filled so check the other values
      const {id,title,language,overview,github,website,projectImage} = projectDetails
      if(!title || !language || !overview || !github || !website ){
        toast.info('Please fill the form completely')
      }
      else{
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        preview? reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
     
      const token = sessionStorage.getItem("token")
      if(preview){
        const reqHeader ={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
        }
        //api call
        const result = await editProjectAPI(id,reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
            toast.success('Project Updated')
            handleClose()
            //pass the response to myProject component
            setEditProjectResponse()
        }
        else{
            console.log(result);
            alert(result.response.data)
        }
      }
      else{
        const reqHeader ={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        } 
        //api call 
        const result = await editProjectAPI(id,reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
            toast.success('Project Updated')
            handleClose()
            //pass the response to myProject component
            setEditProjectResponse()
        }
        else{
            console.log(result);
            alert(result.response.data)
        }
      }

    }
    }
  return (
    <><ToastContainer position='top-center' autoClose={2000} theme='colored' />
         <button onClick={handleShow} className="btn"><i class="fa-solid fa-pen-to-square text-info"></i></button>

         <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg' 
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-6">
                            <label>
                                <input type="file" style={{display:'none'}} onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                                <img className='img-fluid' src={preview?preview:`${BASE_URL}/uploads/${project.projectImage}`} alt="no image" /></label>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-center align-items-center flex-column">
                            <div className='mb-3 mt-3 w-100'>
                                <input type="text" className="form-control" placeholder='project Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}  />

                            </div>
                            <div className='mb-3 w-100'>
                                <input type="text" className="form-control" placeholder='Language used'value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />

                            </div>             
                            
                            <div className='mb-3 w-100'>
                                <input type="text" className="form-control" placeholder='Github Link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}  />
                            </div>
                            <div className='mb-3 w-100'>
                                <input type="text" className="form-control" placeholder='Website Link'  value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />

                            </div>
                            <div className='mb-3 w-100'>
                                <textarea  type="text" className="form-control" placeholder='Project OverView' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} />

                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose1}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleUpdate}>update</Button>
                </Modal.Footer>
            </Modal>
          
    </>
  )
}

export default EditProject