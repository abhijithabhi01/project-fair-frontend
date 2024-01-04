import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../Contexts/ContextShare';

function Header({dashboard}) {
  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const Navigate = useNavigate()
  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    Navigate('/')
    setIsAuthToken(false)
  }

  return (
    <Navbar expand="lg" className="" style={{backgroundColor:'#26272b'}}>
      <Container className=' justify-content-between'> 
              <Navbar.Brand href="/" className='text-light'><i class="fa-brands fa-stack-overflow fa-lg text-light"></i>Project Fair</Navbar.Brand>

{
  dashboard &&
  <button onClick={handleLogout} className='btn btn-danger'>Logout<i class="fa-solid fa-power-off"></i></button>
}
      </Container>
    </Navbar>
     )
}

export default Header