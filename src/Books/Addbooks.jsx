import React, { useState } from 'react'
import './addbook.css';
import { Button, Card, Form } from 'react-bootstrap'
import Sidebar from '../Sidebar';
import axios from 'axios';
import swal from 'sweetalert';
import { FaBars} from "react-icons/fa";

function Addbooks() {
    const [Name, setName] = useState('')
    const [Author, setAuthor] = useState('')
    const [Publication, setPublication] = useState('')
    const [Year, setYear] = useState('')
    const [Avilability, setAvilability] = useState('')
    const [Image, setImage] = useState('')
    const [Price, setPrice] = useState('')
    const Quantity=1
    const [show, setshow] = useState('')
    const Convertimage=(e)=>{
      console.log(e.target.files[0]);
      const reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=()=> {
        console.log(reader.result);//base64encode string
        setImage(reader.result)
      }
      reader.onerror=(err)=>{
        console.log("error",err);
      }

    }
    const add=async(e)=>{
        e.preventDefault()
        const api='http://localhost:8000/addBooks'
        const addbook=await axios.post(api,{Name,Author,Publication,Year,Avilability,Image,Price,Quantity})
        await console.log(addbook.data.booksdetails);
         if(addbook.data.msg){
            swal("Please check",addbook.data.msg,"error")
        }
        else{
           await swal("Book is add to list",addbook.data.addmsg,"success");
            window.location.reload()
        }
        
    }
  return (
    <div className='addbook'>
        <Sidebar  show1={show}/>
        
          <Card border="light"
          className="card">
        <Card.Header className='header'>
        <div className="header-toggle" onClick={()=>setshow(!show)}>
          <FaBars style={{  color: "white" ,fontSize:'1.25rem',cursor:'pointer'}} />
        </div>
          Add Books
          </Card.Header>
        <Card.Body className='cardbt'>
          <div className='formcontainer'>
        <Form className="text-start addform" >
     <Form.Group className="mb-3">
        <Form.Label>Book Name:</Form.Label>
        <Form.Control type="text" onChange={(e)=>setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author Name:</Form.Label>
        <Form.Control type="text" onChange={(e)=>setAuthor(e.target.value)}  />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Publications:</Form.Label>
        <Form.Control type="text" onChange={(e)=>setPublication(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Year:</Form.Label>
        <Form.Control type="number" onChange={(e)=>setYear(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Avilability:</Form.Label>
        <Form.Select  onChange={(e)=>{setAvilability(e.target.value)}} >
            <option value="N/A">N/A</option>
            <option value="true">avilable</option>
            <option value="false">not avilable</option>
         </Form.Select>
      </Form.Group>
      {/* <Form.Group className="mb-3">
        <Form.Label>Image:</Form.Label>
        <Form.Control type="text" placeholder='Provide a valid image link' onChange={Convertimage} />
      </Form.Group> */}
      <Form.Group className="mb-3">
        <Form.Label>Image:</Form.Label>
        <br/>
        {Image==="" || Image===null ? "" : <img src={Image} alt="uploaded image" width={45}/>}
        <Form.Control accept='image/*' type="file" onChange={Convertimage} />
        
      </Form.Group>
      
     
      <Form.Group className="mb-3">
        <Form.Label>Price:</Form.Label>
        <Form.Control type="number" onChange={(e)=>setPrice(e.target.value)} />
      </Form.Group>
     
      {/* <Form.Group className="mb-3">
        <Form.Label>Quantity:</Form.Label>
        <Form.Control type="number"onChange={(e)=>setQuantity(e.target.value)} />
      </Form.Group> */}
      <div  style={{display:'flex',justifyContent:'center',marginTop:"2rem"}}>
      <Button variant="info" type="submit" style={{color:"#ffff"}} onClick={add}>
        add Book
      </Button>
        </div>
      </Form>
      </div>
        </Card.Body>
      </Card>
    </div>

  )
}

export default Addbooks