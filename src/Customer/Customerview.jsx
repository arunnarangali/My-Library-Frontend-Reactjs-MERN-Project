import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Button, Card } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function Customerview() {
    const nav=useNavigate()
    const {id}=useParams()
    const [show, setshow] = useState('')
    const [Customer, setCustomer] = useState('')
    useEffect(() => {
      const api=`http://localhost:8000/findCustomer/${id}`
      axios.get(api).then(async(res)=>{
        await setCustomer(res.data.Customer)
      })
    }, [])
    
    const back=()=>{
        nav('/Customers')
    }
  return (
    <div>
      <div className='addbook'>
        <Sidebar show1={show} />
        <Card  border="light"
        className="card">
      <Card.Header className='header'>
      <div className="header-toggle" onClick={()=>setshow(!show)}>
          <FaBars style={{  color: "white" ,fontSize:'1.25rem',cursor:'pointer'}} />
        </div>
        Book name: &nbsp;&nbsp;{} &nbsp; Details</Card.Header>
      <Card.Body className='cardb'>
        <div className='formcontainer'style={{ width: '25rem',marginLeft:'auto',marginRight:'auto' }} >
        <Card border="success" style={{ width: '18rem' ,textAlign:'center',boxSizing:'border-box' }}>
        <Card.Body>
          <Card.Text>
          <div
                      style={{
                        
                        justifyContent: "space-around",
                        fontSize:'20px',
                        width: '500px',
                        
                      }}
                    >
            <div style={{ textAlign: "right", color: "#4E6468",  display: "flex",
                        flexWrap: "wrap",gap:"10px" }} >
              <p style={{width:'25%',boxSizing:'border-box'}}>Name :</p>
              <p style={{width:'25%',boxSizing:'border-box'}}>{Customer.Name}</p>
              <p style={{width:'25%',boxSizing:'border-box'}}>Email :</p>
              <p style={{width:'25%',boxSizing:'border-box'}}>{Customer.Email}</p>
              <p style={{width:'25%',boxSizing:'border-box'}}>Address 1 :</p>
              <p style={{width:'25%',boxSizing:'border-box'}}>{Customer.Addressline1}</p>
              {/* <p>Address 2 :</p>
              <p>{Customer.Addressline2}</p>
              <p>city :</p>
              <p>{Customer.City}</p>
              <p>State :</p>
              <p>{Customer.State} </p>
              <p>Pincode :</p>
              <p>{Customer.PinCode}</p>

              <p>Country :</p>
              <p>{Customer.Country} </p> */}
            </div>
            {/* <div style={{ textAlign: "left", color: "#fff" }}>
                <p>{Customer.Name}</p>
                <p>{Customer.Email}</p>
                <p>{Customer.Addressline1}</p>
                <p>{Customer.Addressline2}</p>
                <p>{Customer.City}</p> <br></br>
                <p>{Customer.State} </p>
                <p>{`${Customer.PinCode}`? "oo " :"None"}</p>
                <p>{Customer.Country} </p>

            </div> */}
            
        </div>
        </Card.Text>

            <Button variant="info" type="submit" style={{color:"#ffff"}} onClick={back}>
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

export default Customerview