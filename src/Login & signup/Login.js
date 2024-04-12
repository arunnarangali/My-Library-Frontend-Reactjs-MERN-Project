import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import NavBar from '../NavBar'



function Login() {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const nav=useNavigate()
    const signUp=()=>{
        nav("/signup")
    }
    const Login=async(e)=>{
        e.preventDefault()
        const api='https://my-library-backend-nodejs-mern-project.vercel.app/Login'
        const user=await axios.post(api,{Email,Password})
        if(user.data.token){
          localStorage.setItem('token',user.data.token)
          localStorage.setItem('userId',user.data.userId)
          localStorage.setItem('userName',user.data.userName)

           await swal("successfully sign in",user.data.Message,"success")
            nav('/Userhome')
        }else{
           swal("Please check...",user.data.msg,"error")
        }

       
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
      <Button variant="info" style={{color:"#ffff"}} type="submit"className='me-3' onClick={Login}>
       Login
      </Button>
      <Button variant="info" type="submit " style={{color:"#ffff"}} onClick={signUp}>
      SignUp
      </Button>
      </div>
     </Form>
     </Card>
    </div>
  )
}

export default Login
