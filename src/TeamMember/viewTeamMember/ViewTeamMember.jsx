import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import { Button, Card } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function ViewTeamMember() {
    const nav=useNavigate()
    const [show, setshow] = useState('')
    const  {id}=useParams()
    const [TeamMember, setTeamMember] = useState([])
    useEffect(() => {
      axios.get(`http://localhost:8000/findTeammember/${id}`).then(async(res)=>{
         await setTeamMember(res.data.TeamMember)
      })
    }, [])
    const back=()=>{
        nav('/sidebar/TeamMember')
    }
    
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
        TeamMember : &nbsp;&nbsp;{TeamMember.Name} &nbsp; Details</Card.Header>
      <Card.Body className='cardb'>
        <div className='formcontainer'style={{ width: '25rem',marginLeft:'auto',marginRight:'auto' }} >
        <Card border="success" style={{ width: '18rem' ,textAlign:'center',boxSizing:'border-box' }}>
        <Card.Body>
          <Card.Title>Name:</Card.Title>
          <Card.Text> {TeamMember.Name} </Card.Text>
          <Card.Title>Email:</Card.Title>
          <Card.Text> {TeamMember.Email} </Card.Text>
          <Card.Title>Date of Birth:</Card.Title>
          <Card.Text> {TeamMember.DOB} </Card.Text>
          <Card.Title>Gender:</Card.Title>
          <Card.Text> {TeamMember.Gender} </Card.Text>
          <Card.Title>Description:</Card.Title>
          <Card.Text> {TeamMember.Description} </Card.Text>
          <Card.Title>Role:</Card.Title>
          <Card.Text> {TeamMember.Role} </Card.Text>
          <Card.Title>PhoneNumber:</Card.Title>
          <Card.Text> {TeamMember.PhoneNumber} </Card.Text>


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

export default ViewTeamMember