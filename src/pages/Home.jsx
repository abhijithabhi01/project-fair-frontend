import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import titleImage from '../Assests/designer.svg.png'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPI'


function Home() {
  const [islogin , setIsLogin]=useState(false)

  const [homeProjects,setHomeProject]=useState([])
 
  const getHomeFunction = async ()=>{
    const result = await homeProjectAPI()
    if(result.status ===200){
      setHomeProject(result.data)
    }
    else{
      console.log(result);
      console.log(result.response.data);
    }
  }
// console.log(homeProjects);

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
        setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }

    //api call for homeProject
    getHomeFunction()
  },[])
 
  return (
   <>
        <div style={{width:'100%', height:'100vh'}} className='bg-dark' >
            <div className='container-fluid rounded'>
                <Row className='align-items-center p-5'>
                    <Col sm={12} md={6}>
                    <h1 style={{fontSize:'50px'}} className='fw-bolder text-light mb-5'> <i class="fa-brands fa-stack-overflow"></i>Project Fair</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit incidunt amet doloribus minus soluta itaque </p>
                    {islogin?
                      <Link to={'/dashboard'} className='btn btn-warning rounded'>Manage your project</Link>:
                    <Link to={'/login'} className='btn btn-warning rounded'>Get started</Link>}

                    </Col>
                    <Col sm={12} md={6}>
                    <img src={titleImage} alt="" style={{marginTop:'100px'}} className='w-75' />
                    </Col>
                </Row>
            </div>
    
        </div>

        <div className='all-project mt-5 mb-5 bg-dark'>
            <h1 className='text-center text-light'>Explore Our Project</h1>
           <marquee scrollAmount={25} className=" mt-5">
                <div className='d-flex'>
                   {homeProjects?.length>0?
                   homeProjects.map((item)=>(<div className='ms-5' style={{width:'500px'}}>
                   <ProjectCard project={item} />
                 </div>))
                    :null
                    }
                    
                </div>
           </marquee>
           <div className='text-center mt-5'>
            <Link to={'/project'} className='text-light'>View more project</Link>
           </div>
        </div>


   </>
  )
}

export default Home