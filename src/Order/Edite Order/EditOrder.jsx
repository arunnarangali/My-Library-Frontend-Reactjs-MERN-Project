import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import { Button, Card, Form } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import { Await, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'


function EditOrder() {
    const nav=useNavigate()
    const [show,setshow] = useState('')
    const {id}=useParams()
    const [Order, setOrder] = useState('')
    useEffect(() => {
        axios.get(`http://localhost:8000/findorder/${id}`).then((res)=>setOrder(res.data.order))
      
    }, [id])
    
    const [FirstName, setFirstName] = useState(Order.FirstName)
  const [LastName, setLastName] = useState(Order.LastName)
  const [OrderId, setOrderId] = useState(Order.OrderId)
  const [ProductNumber, setProductNumber] = useState(Order.ProductNumber)
  const [Date, setDate] = useState(Order.Date)
    const Edit=async(e)=>{
        e.preventDefault()
        const api=`http://localhost:8000/updateorder/${id}`
        const addorder=await axios.put(api,{FirstName,LastName,OrderId,ProductNumber,Date})
        await swal( addorder.data.msg,"Edited","success"); 
        nav('/Order')
    }

  return (
    <div>
         <div className="addbook">
        <Sidebar show1={show} />

<Card border="light" className="card">
  <Card.Header className="header">
    <div className="header-toggle" onClick={() => setshow(!show)}>
      <FaBars
        style={{
          color: "white",
          fontSize: "1.25rem",
          cursor: "pointer",
        }}
      />
    </div>
   Edite ORDER
  </Card.Header>
  <Card.Body className="cardbt">
    <div className="formcontainer">
      <Form className="text-start addform" >
        <Form.Group className="mb-3">
          <Form.Label> First Name:</Form.Label>
          <Form.Control type="text"defaultValue={Order.FirstName} onChange={(e)=>setFirstName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> last Name:</Form.Label>
          <Form.Control type="text" defaultValue={Order.LastName} onChange={(e)=>setLastName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>orderId:</Form.Label>
        <Form.Control type="number" defaultValue={Order.OrderId} onChange={(e)=>setOrderId(e.target.value)
        } />
      </Form.Group> 
      <Form.Group className="mb-3">
        <Form.Label>ProductNumber:</Form.Label>
        <Form.Control type="number" defaultValue={Order.ProductNumber} onChange={(e)=>setProductNumber(e.target.value)}   />
      </Form.Group> 

       
        <Form.Group className="mb-3">
          <Form.Label>Date:</Form.Label>
          <Form.Control type="date" defaultValue={Order.Date} onChange={(e)=>setDate(e.target.value)}/>
        </Form.Group>
         

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Button
            variant="info"
            type="submit"
            style={{ color: "#ffff" }}
            onClick={Edit}
          >
           edit order
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

export default EditOrder