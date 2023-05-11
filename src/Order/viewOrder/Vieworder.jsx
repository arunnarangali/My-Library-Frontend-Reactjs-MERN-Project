import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../Sidebar'
import { FaBars } from 'react-icons/fa'
import axios from 'axios'

function Vieworder() {
    const nav=useNavigate()
    const [show, setshow] = useState('')
    const {id}=useParams()
    const [Order, setOrder] = useState([])
    useEffect(() => {
      axios.get(`http://localhost:8000/findorder/${id}`).then(async(res)=>{
        await setOrder(res.data.order)
      })
    }, [])
    

  return (
    <div>
        <div className="addbook">
            
            <Sidebar show1={show} />
            <Card  border="light"
            className="card">
          <Card.Header className='header'>
          <div className="header-toggle" onClick={()=>setshow(!show)}>
              <FaBars style={{  color: "white" ,fontSize:'1.25rem',cursor:'pointer'}} />
            </div>
           ORDER NAME : &nbsp;&nbsp;{Order.FirstName} &nbsp; Details</Card.Header>
          <Card.Body className='cardb'>
            <div className='formcontainer'style={{ width: '25rem',marginLeft:'auto',marginRight:'auto' }} >
            <Card border="success" style={{ width: '18rem' ,textAlign:'center',boxSizing:'border-box' }}>
            <Card.Body>
              <Card.Title> First Name:</Card.Title>
              <Card.Text> {Order.FirstName} </Card.Text>
              <Card.Title>Last Name :</Card.Title>
              <Card.Text> {Order.LastName} </Card.Text>
              <Card.Title>Order Id:</Card.Title>
              <Card.Text> {Order.OrderId} </Card.Text>
              <Card.Title>Product Number :</Card.Title>
              <Card.Text> {Order.ProductNumber} </Card.Text>
              <Card.Title>Date:</Card.Title>
              <Card.Text> {Order.Date} </Card.Text>
                <Button variant="info" type="submit" style={{color:"#ffff"}} onClick={()=>nav('/Order')}>
          back
        </Button>
            </Card.Body>
          </Card>
          <br />
            </div>
          </Card.Body>
        </Card>
    
            </div>
    </div>
  )
}

export default Vieworder