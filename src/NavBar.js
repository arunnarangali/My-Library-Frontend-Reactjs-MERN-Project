import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './App.css';
import { FcLibrary } from 'react-icons/fc';


function NavBar() {
    const nav=useNavigate()
    const Signup=()=>{
        nav("/signup")
    }
    const login=()=>{
        nav("/login")
    }

  return (

    <div>
        
        <Navbar  variant="dark" bg='dark'>
      <Container >
        <Navbar.Brand href="#home"className='mr-3' onClick={()=>nav('/')} > <FcLibrary style={{fontSize:"2rem"}}/> My Libary</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Nav className=" d-flex">
        <Nav.Link className='me-3' onClick={Signup}>Signup</Nav.Link>
        <Nav.Link className='me-3'  onClick={login}>Login</Nav.Link>
        <Nav.Link  className='me-3' onClick={()=>nav('/adminlogin')}>Admin login</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  

    </div>
  )
}
export default NavBar