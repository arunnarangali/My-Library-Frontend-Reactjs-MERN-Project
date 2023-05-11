import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

function EditClient() {
    const nav=useNavigate()
    const {id}=useParams()
    const [Client, setClient] = useState([])
    useEffect(() => {
      const api=`http://localhost:8000/findclient/${id}`
      axios.get(api).then(async(res)=>{

         await setClient(res.data.client)
      }).catch(err=>console.log(err))
    }, [id])
    

    const [Name, setName] = useState(Client.Name)
  const [Username, setUsername] = useState(Client.Username)
  const [Email, setEmail] = useState(Client.Email)
  const [SignedStatus, setSignedStatus] = useState(Client.SignedStatus)
  const [Role, setRole] = useState(Client.Role)
  const [PhoneNumber, setPhoneNumber] = useState(Client.PhoneNumber)
  const Edit=async(e)=>{
    e.preventDefault()
    const api=`http://localhost:8000/clientUpdate/${id}`
    const addclient=await axios.put(api,{Name,Username,Email,SignedStatus,Role,PhoneNumber});
    await swal("Edited",addclient.data.msg,"success");
    nav('/Clients')
   
  }
  return (
    <div>
         <div className='showclient'>
      <Sidebar />
        <div className='cbody'>
        <div className="chead">
            <div className="ch1">
              <span>Edit Client</span>
            </div>
         </div>   
        <div className="tableclientcontainer">
        <Form className="text-start addform" >
     <Form.Group className="mb-3">
        <Form.Label> Name:</Form.Label>
        <Form.Control type="text" Value={Client.Name
        } onChange={(e)=>setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" Value={Client.Username} onChange={(e)=>setUsername(e.target.value)}  />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" Value={Client.Email}  onChange={(e)=>setEmail(e.target.value)} />
      </Form.Group>
     
      <Form.Group>
      <Form.Label style={{paddingRight:'2rem'}}>SignedStatus: </Form.Label>
         <Form.Check
            inline
            label="Sign in"
            name="group1"
            type='radio'
            defaultChecked={Client.SignedStatus}
            Value="true" 
            onChange={(e)=>setSignedStatus(e.target.value)}
          />
           <Form.Check
            inline
            label="Not Sign in"
            name="group1"
            type='radio'
            defaultChecked={!Client.SignedStatus}
            Value='false'
             onChange={(e)=>setSignedStatus(e.target.value)}
            
          /> 
          </Form.Group>
          <Form.Group className="mb-3">
        <Form.Label>Role:</Form.Label>
        <Form.Select  onChange={(e)=>setRole(e.target.value)}  >
            <option value="N/A">N/A</option>
            <option  selected={Client.Role==='Super admin'} Value="Super admin">Super admin</option>
            <option selected={Client.Role==='only by admin'} Value="only by admin">only by admin</option>
         </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>PhoneNumber:</Form.Label>
        <Form.Control type="number" Value={Client.PhoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
      </Form.Group>
      <div  style={{display:'flex',justifyContent:'center',marginTop:"2rem"}}>
      <Button variant="info" type="submit" style={{color:"#ffff"}} onClick={Edit}>
         Edit Client
      </Button>
        </div>

      </Form>
        </div>
        </div>
    </div>
    </div>
  )
}

export default EditClient