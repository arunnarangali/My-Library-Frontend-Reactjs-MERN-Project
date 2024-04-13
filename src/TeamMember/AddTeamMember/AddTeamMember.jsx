import React, {  useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import Sidebar from '../../Sidebar'
import { FaBars } from 'react-icons/fa'
import axios from 'axios'
import swal from 'sweetalert'

function AddTeamMember() {
    const [show,setshow] = useState('')
    const [Name,setName] = useState('')
    const [Email,setEmail] = useState('')
    const [DOB,setDOB] = useState('')
    const [Gender,setGender] = useState('')
    const [Description,setDescription] = useState('')
    const [Role,setRole] = useState('')
    const [PhoneNumber,setPhoneNumber] = useState('')
    

  const addteam=async(e)=>{
    e.preventDefault()
    const api=`${process.env.REACT_APP_API_URL}/addTeammember`
    const addTeamMember=await axios.post(api,{Name,Email,DOB,Gender,Description,Role,PhoneNumber}).then(async(res)=>{
       await swal(res.data.msg,"New Member is added","success")
       window.location.reload()

    }).catch((err) =>{ swal(err.response.data.msg,"Please check","error")
    
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
            Add TeamMember
          </Card.Header>
          <Card.Body className="cardbt">
            <div className="formcontainer">
              <Form className="text-start addform" >
                <Form.Group className="mb-3">
                  <Form.Label> Name:</Form.Label>
                  <Form.Control type="text" onChange={(e)=>setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth:</Form.Label>
                  <Form.Control type="date" onChange={(e)=>setDOB(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Gender:</Form.Label>
                  <Form.Select onChange={(e)=>setGender(e.target.value)}>
                    <option value="Male">male</option>
                    <option value="female">female</option>
                    <option value="Other">other</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description:</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={(e)=>setDescription(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Role:</Form.Label>
                  <Form.Select onChange={(e)=>setRole(e.target.value)}>
                    <option value="N/A"> N/A</option>
                    <option
                      value="Applications engineer
"
                    >
                      Applications engineer
                    </option>
                    <option value="Computer programmer">
                      Computer programmer
                    </option>
                    <option value="Computer scientist">
                      Computer scientist
                    </option>
                    <option value="Data analyst">Data analyst</option>
                    <option value="Project manager">Project manager</option>
                    <option value="IT consultant">IT consultant</option>
                    <option value="Software developer">
                      Software developer
                    </option>
                    <option value="Technical support specialist">
                      Technical support specialist
                    </option>
                    <option value="User experience designer">
                      User experience designer
                    </option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
        <Form.Label>PhoneNumber:</Form.Label>
        <Form.Control type="number" onChange={(e)=>setPhoneNumber(e.target.value)} />
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
                    onClick={addteam}
                  >
                    add member
                  </Button>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default AddTeamMember