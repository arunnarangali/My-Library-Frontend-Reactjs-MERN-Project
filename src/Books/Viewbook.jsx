import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar'
import './addbook.css';
import { FaBars} from "react-icons/fa";


function Viewbook() {
     const nav=useNavigate()
     const [show, setshow] = useState('')
    const {id}=useParams()
    const [book, setBook] = useState([])
    useEffect(() => {
      const api=`http://localhost:8000/find/${id}`
      axios.get(api).then(async(res)=>{
        await setBook(res.data.finduser)
        console.log(res.data.finduser);
      }).catch(err=>console.log(err))
    }, [id])
    const back=()=>{
        nav('/Books')
    }

  return (
    <div className='addbook'>
        <Sidebar show1={show} />
        
        <Card  border="light"
        className="card">
      <Card.Header className='header'>
      <div className="header-toggle" onClick={()=>setshow(!show)}>
          <FaBars style={{  color: "Black" ,fontSize:'1.25rem',cursor:'pointer'}} />
        </div>
        Book name: &nbsp;&nbsp;{book.Name} &nbsp; Details</Card.Header>
      <Card.Body className='cardb'>
        <div className='formcontainer'style={{ width: '25rem',marginLeft:'auto',marginRight:'auto' }} >
        <Card border="success" style={{ width: '18rem' ,textAlign:'center' }}>
        <Card.Body>
          <Card.Text>
          <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                        fontSize:'20px'
                      }}
                    >
            <div style={{ textAlign: "right", color: "#4E6468" }} >
              <p>Name :</p>
              <p>Author :</p>
              <p>Publication :</p>
              <p>Year :</p>
              <p>Avilability :</p>
            </div>
          <div style={{ textAlign: "left" }}>
            <p>{book.Name}</p>
            <p>{book.Author} </p>
            <p>{book.Publication}</p>
            <p>{book.Year}</p>
            <p>{`${book.Avilability}` === "true"
                            ? "avilable"
                            : "not avilable"}</p>

            </div>
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
  )
}

export default Viewbook