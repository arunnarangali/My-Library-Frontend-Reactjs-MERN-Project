import React, { useState } from 'react'
import Sidebar from '../../Sidebar'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import swal from 'sweetalert'

function AddClient() {
  const [Name, setName] = useState('')
  const [Username, setUsername] = useState('')
  const [Email, setEmail] = useState('')
  const [SignedStatus, setSignedStatus] = useState('')
  const [Role, setRole] = useState('')
  const [PhoneNumber, setPhoneNumber] = useState('')
  const add=async(e)=>{
    e.preventDefault()
    const api='http://localhost:8000/addClient'
    const addClient=await axios.post(api,{Name,Username,Email,SignedStatus,Role,PhoneNumber})
    await console.log(addClient.data.Client);
    if(addClient.data.msg){
      swal("Please check",addClient.data.msg,"error")
  }
  else{
     await swal(addClient.data.addmsg,"Book is add to list","success");
      window.location.reload()
  }

  }

  return (
    <div className='showclient'>
      <Sidebar />
        <div className='cbody'>
        <div className="chead">
            <div className="ch1">
              <span>Add  Client Details</span>
            </div>
            </div>
        <div className="tableclientcontainer">
        <Form className="text-start addform" >
     <Form.Group className="mb-3">
        <Form.Label> Name:</Form.Label>
        <Form.Control type="text" onChange={(e)=>setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text"  onChange={(e)=>setUsername(e.target.value)}  />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email"   onChange={(e)=>setEmail(e.target.value)} />
      </Form.Group>
     
      <Form.Group>
      <Form.Label style={{paddingRight:'2rem'}}>SignedStatus: </Form.Label>
      <Form.Check
            inline
            label="Sign in"
            name="group1"
            type='radio'
            value="true" 
            onChange={(e)=>setSignedStatus(e.target.value)}
          />
           <Form.Check
            inline
            label="Not Sign in"
            name="group1"
            type='radio'
            value="false"
             onChange={(e)=>setSignedStatus(e.target.value)}
            
          />
          </Form.Group>
          <Form.Group className="mb-3">
        <Form.Label>Role:</Form.Label>
        <Form.Select  onChange={(e)=>setRole(e.target.value)}  >
            <option value="N/A">N/A</option>
            <option value="Super admin">Super admin</option>
            <option value="Only by admin">only by admin</option>
         </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>PhoneNumber:</Form.Label>
        <Form.Control type="number"  onChange={(e)=>setPhoneNumber(e.target.value)} />
      </Form.Group>
      <div  style={{display:'flex',justifyContent:'center',marginTop:"2rem"}}>
      <Button variant="info" type="submit" style={{color:"#ffff"}} onClick={add}>
        add Client
      </Button>
        </div>

      </Form>
        </div>
        </div>
    </div>
  )
}

export default AddClient