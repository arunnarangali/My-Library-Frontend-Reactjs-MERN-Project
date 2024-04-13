import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import NavBar from '../NavBar'
import swal from 'sweetalert'


function Signup() {
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const nav=useNavigate()
    const back=()=>{
        nav("/")
    }
    const SignUp=async(e)=>{
        e.preventDefault()
       const api=`${process.env.REACT_APP_API_URL}/signUp`
      
       const user= await axios.post(api,{FirstName,LastName,Email,Password,ConfirmPassword})
       await console.log(user.data);
         if( user.data.token ){
          localStorage.setItem('token',user.data.token)
          localStorage.setItem('userId',user.data.userId)
          localStorage.setItem('userName',user.data.userName)
            await  swal("Users signin",user.data.msg,"success") 
            await nav('/Userhome')
         }
         else
        swal("Please check..",user.data.msg,"error")
    }

  return (
    <div className='signup'>
      <NavBar />
     <Card   style={{width:'30rem' ,marginLeft:"auto",marginRight:"auto",marginTop:"3rem",padding:"2rem",border:" 7px solid #ffff"
    }}>
     <Form className="text-start" >
     <Form.Group className="mb-3">
        <Form.Label>FirstName</Form.Label>
        <Form.Control type="text" placeholder="Enter your FirstName" onChange={(e)=>setFirstName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>LastName</Form.Label>
        <Form.Control type="text" placeholder="Enter your LastName" onChange={(e)=>setLastName(e.target.value)} />
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"onChange={(e)=>setEmail(e.target.value)} />
        <Form.Text className="text-muted" >
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)}/>
        <Form.Text className="text-muted" >
        password needs to be at least 8 characters long.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>ConfirmPassword</Form.Label>
        <Form.Control type="password" placeholder=" Re Enter Password" onChange={(e)=>setConfirmPassword(e.target.value)} />
      </Form.Group>
      <div  style={{display:'flex',justifyContent:'center',marginTop:"2rem"}}>
      <Button variant="info" type="submit"className='me-2' style={{color:"#ffff"}} onClick={SignUp}>
      Create account
      </Button>
      <Button variant="info" type="submit" style={{color:"#ffff"}} onClick={back}>
        {`<<Back`}
      </Button>
      </div>
    </Form>
      </Card>

    </div>
  )
}

export default Signup