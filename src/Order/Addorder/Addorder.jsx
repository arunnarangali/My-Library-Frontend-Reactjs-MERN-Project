import React, { useState } from 'react'
import Sidebar from '../../Sidebar'
import { Button, Card, Form } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import axios from 'axios'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

function Addorder() {
  const nav=useNavigate()
  const [show,setshow] = useState('')
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [OrderId, setOrderId] = useState('')
  const [ProductNumber, setProductNumber] = useState('')
  const [Date, setDate] = useState('')
  const add=async(e)=>{
    e.preventDefault()
    const api=`${process.env.REACT_APP_API_URL}/addorder`
    await axios.post(api,{FirstName,LastName,OrderId,ProductNumber,Date}).then(async(res)=>{
      console.log(res.data);
      await swal(res.data.msg,"New Order is added","success")
       nav('/Order')
    }).catch((err)=>{
      swal(err.response.data.msg,"Please check","error")
    })
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
    Add ORDER
  </Card.Header>
  <Card.Body className="cardbt">
    <div className="formcontainer">
      <Form className="text-start addform" >
        <Form.Group className="mb-3">
          <Form.Label> First Name:</Form.Label>
          <Form.Control type="text" onChange={(e)=>setFirstName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> last Name:</Form.Label>
          <Form.Control type="text"  onChange={(e)=>setLastName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>orderId:</Form.Label>
        <Form.Control type="number" onChange={(e)=>setOrderId(e.target.value)} />
      </Form.Group> 
      <Form.Group className="mb-3">
        <Form.Label>ProductNumber:</Form.Label>
        <Form.Control type="number" onChange={(e)=>setProductNumber(e.target.value)}  />
      </Form.Group> 

       
        <Form.Group className="mb-3">
          <Form.Label>Date:</Form.Label>
          <Form.Control type="date" onChange={(e)=>setDate(e.target.value)} />
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
            onClick={add}
          >
            add order
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

export default Addorder