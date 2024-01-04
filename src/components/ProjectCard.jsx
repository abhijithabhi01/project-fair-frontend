import React from 'react'
import Card from 'react-bootstrap/Card'
import demoimage from '../Assests/designer.svg.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';


function ProjectCard({project}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
 <>
      <Card className='shadow mb-5 btn ' onClick={handleShow}>
        <Card.Img variant="top" height={'250px'} alt='ERROR 404' src={project?`${BASE_URL}/uploads/${project.projectImage}`:demoimage}/>
        <Card.Body>
          <Card.Title className='text-danger'>{project.title}</Card.Title> 
        </Card.Body>
      </Card>
  
      <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size='lg'
        >
          <Modal.Header closeButton>
            <Modal.Title>Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col  md={6}>
                 <img src={project?`${BASE_URL}/uploads/${project.projectImage}`:demoimage} alt="no image"  style={{height:'200px'}} className='img-fluid'/>
              </Col>
              <Col md={6}>
                  <h2 className='text-info fw-1'>{project.title}</h2>
                  <p>{project.overview}</p>
                  <p>Language Used : <span className='fw-bolder'>{project.language}</span></p>
              </Col>
            </Row>
            <div className='mt-3'>
               <a href={project.github} target='-blank' className='btn me-5'><i class="fa-brands fa-github fa-2x"></i></a>
               <a href={project.website} target='-blank'  className='btn me-5'><i class="fa-solid fa-link fa-2x"></i></a>
            </div>
          </Modal.Body>
         
        </Modal>
  
      </>
  )
}

export default ProjectCard