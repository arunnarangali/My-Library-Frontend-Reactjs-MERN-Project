import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import { Button, Card, Form } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

function EditCustomer() {
    const nav=useNavigate()
    const [show, setshow] = useState('')
    const [Customer, setCustomer] = useState([])
    const {id}=useParams()
    useEffect(() => {
    const api=`http://localhost:8000/findCustomer/${id}`
     axios.get(api).then((res)=>{
       setCustomer(res.data.Customer)
       console.log(res.data);
     })
    }, [id])
    
    const [Name, setName] = useState(Customer.Name)
    const [Email, setEmail] = useState(Customer.Email)
    const [Addressline1, setAddressline1] = useState(Customer.Addressline1)
    const [Addressline2, setAddressline2] = useState(Customer.Addressline2)
    const [City, setCity] = useState(Customer.City)
    const [State, setState] = useState(Customer.State)
    const [PinCode, setPinCode] = useState(Customer.PinCode)
    const [Country, setCountry] = useState(Customer.Country)
    const update=async(e)=>{
        e.preventDefault()
        const api=`http://localhost:8000/updateCustomer/${id}`
        const addCustomer=await axios.put(api,{Name,Email,Addressline1,Addressline2,City,State,PinCode,Country});
        await swal("Edited",addCustomer.data.msg,"success");
        nav('/Customers')
    }
  return (
    <div>
        <div className="addbook">
        <Sidebar show1={show}/>
     
     <Card border="light"
           className="card">
         <Card.Header className='header'>
         <div className="header-toggle" onClick={()=>setshow(!show)}>
           <FaBars style={{  color: "white" ,fontSize:'1.25rem',cursor:'pointer'}} />
         </div>
           Edit Customer 
           </Card.Header>
         <Card.Body className='cardbt'>
           <div className='formcontainer'>
           <Form className="text-start addform" >
      <Form.Group className="mb-3">
         <Form.Label>Customer  Name:</Form.Label>
         <Form.Control type="text" Value={Customer.Name} onChange={(e)=>setName(e.target.value)} />
       </Form.Group>  
       <Form.Group className="mb-3">
         <Form.Label>Email:</Form.Label>
         <Form.Control type="email" Value={Customer.Email}  onChange={(e)=>setEmail(e.target.value)} />
       </Form.Group>
       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
         <Form.Label>Addressline1</Form.Label>
         <Form.Control as="textarea" rows={3} defaultValue={Customer.Addressline1} onChange={(e)=>setAddressline1(e.target.value)} />
       </Form.Group>
       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
         <Form.Label>Addressline2</Form.Label>
         <Form.Control as="textarea" rows={3} defaultValue={Customer.Addressline2} onChange={(e)=>setAddressline2(e.target.value)} />
       </Form.Group>
       <Form.Group className="mb-3">
         <Form.Label>City:</Form.Label>
         <Form.Control type="text" Value={Customer.City} onChange={(e)=>setCity(e.target.value)} />
       </Form.Group>  
       <Form.Group className="mb-3">
         <Form.Label>State</Form.Label>
         <Form.Control type="text" Value={Customer.State} onChange={(e)=>setState(e.target.value)} />
       </Form.Group> 
       <Form.Group className="mb-3">
         <Form.Label>pincode</Form.Label>
         <Form.Control type="number" Value={Customer.PinCode} onChange={(e)=>setPinCode(e.target.value)} />
       </Form.Group> 
       <Form.Group className="mb-3">
         <Form.Label>Country:</Form.Label>
         <Form.Select  onChange={(e)=>{setCountry(e.target.value)}} >
             <option value="India" selected={Customer.Country==='India'}>India</option>
             <option value="Usa" selected={Customer.Country==='Usa'} >usa</option>
             <option value="Rusia" selected={Customer.Country==='Rusia'}>Rusia</option>
          </Form.Select>
       </Form.Group>
       <div  style={{display:'flex',justifyContent:'center',marginTop:"2rem"}}>
       <Button variant="info" type="submit" style={{color:"#ffff"}} onClick={update}>
         update & add
       </Button>
         </div>
       </Form>
           </div>
          </Card.Body>
         </Card>
        </div>
    </div>
  )
}

export default EditCustomer