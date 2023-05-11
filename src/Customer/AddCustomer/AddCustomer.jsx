import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import Sidebar from '../../Sidebar'
import { FaBars } from 'react-icons/fa'
import axios from 'axios'
import swal from 'sweetalert'

function AddCustomer() {
  const [show, setshow] = useState('')
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Addressline1, setAddressline1] = useState('')
  const [Addressline2, setAddressline2] = useState('')
  const [City, setCity] = useState('')
  const [State, setState] = useState('')
  const [PinCode, setPinCode] = useState('')
  const [Country, setCountry] = useState('')

  const add=async(e)=>{
    e.preventDefault()
    const api='http://localhost:8000/addCustomer'
    const addcustomer=await axios.post(api,{Name,Email,Addressline1,Addressline2,City,State,PinCode,Country})
    await console.log(addcustomer.data.Customer);
    if(addcustomer.data.msg){
      swal("Please check",addcustomer.data.msg,"error")
    }
    else{
      await swal("New Customer is added",addcustomer.data.addmsg,"success");
       window.location.reload()
    }
  }

  return (
    
 <div className='addbook'>
    <Sidebar show1={show}/>
     
    <Card border="light"
          className="card">
        <Card.Header className='header'>
        <div className="header-toggle" onClick={()=>setshow(!show)}>
          <FaBars style={{  color: "white" ,fontSize:'1.25rem',cursor:'pointer'}} />
        </div>
          Add Customer
          </Card.Header>
        <Card.Body className='cardbt'>
          <div className='formcontainer'>
          <Form className="text-start addform" >
     <Form.Group className="mb-3">
        <Form.Label>Customer  Name:</Form.Label>
        <Form.Control type="text" onChange={(e)=>setName(e.target.value)} />
      </Form.Group>  
      <Form.Group className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email"   onChange={(e)=>setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Addressline1</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={(e)=>setAddressline1(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Addressline2</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={(e)=>setAddressline2(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>City:</Form.Label>
        <Form.Control type="text" onChange={(e)=>setCity(e.target.value)} />
      </Form.Group>  
      <Form.Group className="mb-3">
        <Form.Label>State</Form.Label>
        <Form.Control type="text" onChange={(e)=>setState(e.target.value)} />
      </Form.Group> 
      <Form.Group className="mb-3">
        <Form.Label>pincode</Form.Label>
        <Form.Control type="number" onChange={(e)=>setPinCode(e.target.value)} />
      </Form.Group> 
      <Form.Group className="mb-3">
        <Form.Label>Country:</Form.Label>
        <Form.Select  onChange={(e)=>{setCountry(e.target.value)}} >
            <option value="N/A">India</option>
            <option value="Usa">usa</option>
            <option value="Rusia">Rusia</option>
         </Form.Select>
      </Form.Group>
      <div  style={{display:'flex',justifyContent:'center',marginTop:"2rem"}}>
      <Button variant="info" type="submit" style={{color:"#ffff"}} onClick={add}>
        add
      </Button>
        </div>
      </Form>
          </div>
         </Card.Body>
        </Card>
 </div>
  )
}

export default AddCustomer