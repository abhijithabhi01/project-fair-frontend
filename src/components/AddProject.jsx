import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../Contexts/ContextShare';


function AddProject() {
    //to use the contect we need to use UseContext hook
const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
    const[projectDetails,setProjectDetails]=useState({
        title:"",language:"",overview:"",github:"",website:"",projectImage:""
    })
    //since we are getting a object rather than the url we need to convert that into url and store that data
    const[preview,setPreview]= useState("")
    const [token, setToken] = useState("")

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setProjectDetails({
            title:"",language:"",overview:"",github:"",website:"",projectImage:""
        })

        setPreview("")
    }
    const handleShow = () => setShow(true);

    //console.log(projectDetails);

    // the value of the preview have to be changed when the file is uploaded
    useEffect(()=>{
        if(projectDetails.projectImage){
            //javaScript predefined function URL.createObjectURL() is used to convert the file into url
           setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    },[projectDetails.projectImage])
    //we can actually define more than one useeffect in the same component
    useEffect(()=>{
        //since we need the userid while storing the project in projects collection. we get that from the token .hence token is taken from the session storage.
        if(sessionStorage.getItem("token")){
            setToken(sessionStorage.getItem("token"))
        }
        else{
            setToken("")
        }
    },[])

    const handleAdd =  async(e)=>{
        e.preventDefault()
        const { title,language,overview,github,website,projectImage} = projectDetails
        if(!title || !language || !overview || !github || !website || !projectImage){
            toast.info('Please Fill the form Completely')
        }
        else{
            //creating form data.since body have to passed as formdata and header data-type as multipart/form-data
            const reqBody = new FormData()//create object for formdata since body of the request should be formData not json
            //append method is used to add data to formData
            reqBody.append("title",title)
            reqBody.append("language",language)
            reqBody.append("overview",overview)
            reqBody.append("projectImage",projectImage)
            reqBody.append("github",github)
            reqBody.append("website",website)
           

            if(token){
                //upload content
            const reqHeader ={
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}` // this is the syntax of sharing token.we cannot just share the data. it can only be shared along with bearer (single space between bearer and token)
            }
           
            const result = await addProjectAPI(reqBody,reqHeader)
            console.log(result);
            if (result.status===200) {
                console.log(result.data);
                toast.success("project Uploaded")
                //closing the modal and clearing the field
                handleClose()
                setAddProjectResponse(result.data)
                
            }
            else{
                console.log(result);
               alert(result.response.data);

            }
         }
        }
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Add project
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg' 
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-6">
                            <label>
                                <input type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                                <img className='img-fluid' src={preview?preview:"https://m.media-amazon.com/images/I/71sKzRQtXtL.png"} alt="no image" /></label>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-center align-items-center flex-column">
                            <div className='mb-3 mt-3 w-100'>
                                <input type="text" className="form-control" placeholder='project Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />

                            </div>
                            <div className='mb-3 w-100'>
                                <input type="text" className="form-control" placeholder='Language used' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />

                            </div>             
                            
                            <div className='mb-3 w-100'>
                                <input type="text" className="form-control" placeholder='Github Link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} />
                            </div>
                            <div className='mb-3 w-100'>
                                <input type="text" className="form-control" placeholder='Website Link' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />

                            </div>
                            <div className='mb-3 w-100'>
                                <textarea  type="text" className="form-control" placeholder='Project OverView' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} />

                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleAdd}>Add</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='top-center' autoClose={2000} theme='colored' />
        </>
    )
}

export default AddProject