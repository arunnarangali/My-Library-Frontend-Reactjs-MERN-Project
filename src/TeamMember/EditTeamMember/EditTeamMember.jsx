import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import { Button, Card, Form } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'

function EditTeamMember() {
    const nav=useNavigate()
    const [show,setshow] = useState('')
    const [TeamMember, setTeamMember] = useState([])
    const {id}=useParams()
    useEffect(() => {
       axios.get(`http://localhost:8000/findTeammember/${id}`).then(async(res)=>{
            setTeamMember(res.data.TeamMember)
       })
    }, [id])
    
    const [Name,setName] = useState(TeamMember.Name)
    const [Email,setEmail] = useState(TeamMember.Email)
    const [DOB,setDOB] = useState(TeamMember.DOB)
    const [Gender,setGender] = useState(TeamMember.Gender)
    const [Description,setDescription] = useState(TeamMember.Description)
    const [Role,setRole] = useState(TeamMember.Role)
    const [PhoneNumber,setPhoneNumber] = useState(TeamMember.PhoneNumber)
    const Edit=async(e)=>{
        e.preventDefault()
        const api=`http://localhost:8000/updateTeammember/${id}`
        const addTeamMember=await axios.put(api,{Name,Email,DOB,Gender,Description,Role,PhoneNumber})
        await swal( addTeamMember.data.msg,"Edited","success");        
         nav('/sidebar/TeamMember')
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
    Add TeamMember
  </Card.Header>
  <Card.Body className="cardbt">
    <div className="formcontainer">
      <Form className="text-start addform" >
        <Form.Group className="mb-3">
          <Form.Label> Name:</Form.Label>
          <Form.Control type="text" Value={TeamMember.Name} onChange={(e)=>setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" Value={TeamMember.Email} onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control type="date" Value={TeamMember.DOB} onChange={(e)=>setDOB(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gender:</Form.Label>
          <Form.Select   onChange={(e)=>setGender(e.target.value)}>
            <option selected={TeamMember.Gender==='Male'} value="Male">male</option>
            <option selected={TeamMember.Gender==='female'} value="female">female</option>
            <option selected={TeamMember.Gender==='Other'} value="Other">other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Description:</Form.Label>
          <Form.Control as="textarea" rows={3} defaultValue={TeamMember.Description} onChange={(e)=>setDescription(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Role:</Form.Label>
          <Form.Select  onChange={(e)=>setRole(e.target.value)}>
            <option value="N/A"> N/A</option>
            <option selected={TeamMember.Role==='Applications engineer'}
              value="Applications engineer
"
            >
              Applications engineer
            </option>
            <option selected={TeamMember.Role==='Computer programmer'} value="Computer programmer">
              Computer programmer
            </option>
            <option selected={TeamMember.Role==='Computer scientist'} value="Computer scientist">
              Computer scientist
            </option>
            <option selected={TeamMember.Role==='Data analyst'} value="Data analyst">Data analyst</option>
            <option selected={TeamMember.Role==='Project manager'} value="Project manager">Project manager</option>
            <option selected={TeamMember.Role==='IT consultant'} value="IT consultant">IT consultant</option>
            <option selected={TeamMember.Role==='Software developer'} value="Software developer">
              Software developer
            </option>
            <option selected={TeamMember.Role==='Technical support specialist'} value="Technical support specialist">
              Technical support specialist
            </option>
            <option selected={TeamMember.Role==='User experience designer'} value="User experience designer">
              User experience designer
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
<Form.Label>PhoneNumber:</Form.Label>
<Form.Control Value={TeamMember.PhoneNumber} type="number" onChange={(e)=>setPhoneNumber(e.target.value)} />
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
            Edit member
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

export default EditTeamMember