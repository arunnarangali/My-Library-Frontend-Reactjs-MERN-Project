import React, { useState } from 'react'
import NavBar from '../NavBar'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

function AdminLogin() {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const nav=useNavigate()
    const login=async(e)=>{
        e.preventDefault()
        console.log(`${process.env.REACT_APP_API_URL}/adminLogin`);
        await axios.post(`${process.env.REACT_APP_API_URL}/adminLogin`,{Email,Password}).then(async(res)=>{
            await swal("successfully sign in",res.data.Message,"success")
            nav('/sidebar')
        }).catch((err)=>{
            
            swal(err.response.data.msg,"Please check","error")
        })
    }
  return (
    <div>
         <NavBar />
        <Card   style={{width:'30rem' ,marginLeft:"auto",marginRight:"auto",marginTop:"10rem",padding:"2rem" ,backgroundColor:'##FFFFFF',
        border:" 7px solid #ffff",
    }}>
     <Form className="text-start" >
     <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"onChange={(e)=>setEmail(e.target.value)} />
        <Form.Text className="text-muted" >
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label> 
        <Form.Control type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} />
        <Form.Text className="text-muted" >
          Password must be 8 character.
        </Form.Text>
      </Form.Group>
      <div  style={{display:'flex',justifyContent:'center',marginTop:"2rem"}}>
      <Button variant="info" style={{color:"#ffff"}} type="submit"className='me-3' onClick={login}>
       Login
      </Button>
      </div>
     </Form>
     </Card>
    </div>
  )
}

export default AdminLogin
