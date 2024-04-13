import axios from 'axios'
import './addbook.css';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import Sidebar from '../Sidebar'
import swal from 'sweetalert';

import { useNavigate, useParams } from 'react-router-dom';


function EditBook() {
  const nav=useNavigate()
  const {id}=useParams();
  const [book, setBook] = useState([])
  useEffect(() => {
    const api=`${process.env.REACT_APP_API_URL}/find/${id}`
    axios.get(api).then(async(res)=>{
      await setBook(res.data.finduser)
      console.log(res.data.finduser);
    }).catch(err=>console.log(err))
  }, [id])
  const [Name, setName] = useState(book.Name)
  const [Author, setAuthor] = useState(book.Author)
  const [Publication, setPublication] = useState(book.Publication)
  const [Year, setYear] = useState(book.Year)
  const [Avilability, setAvilability] = useState(book.Avilability)
  const [Image, setImage] = useState(book.Image)
  const [Price, setPrice] = useState(book.Price)
  const Quantity=1
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
  const update=async(e)=>{
    e.preventDefault()
          const api=`${process.env.REACT_APP_API_URL}/Booksupdate/${id}`;
          console.log(id);
          const addbook=await axios.put(api,{Name,Author,Publication,Year,Avilability,Image,Price,Quantity});
        
          await swal("Edited",addbook.data.upmsg,"success");
          nav('/Books')
        
        }
  return (
    <div className='addbook'>
           <Sidebar />
        
        <Card border="light"
        className="card">
      <Card.Header className='header'>Edit Book : {book.Name}</Card.Header>
      <Card.Body className='cardb'>
        <div className='formcontainer'>
      <Form className="text-start addform" >
   <Form.Group className="mb-3">
      <Form.Label>Book Name:</Form.Label>
      <Form.Control type="text" Value={book.Name} onChange={(e)=>setName(e.target.value)} />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Author Name:</Form.Label>
      <Form.Control type="text" Value={book.Author}  onChange={(e)=>setAuthor(e.target.value)}  />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Publications:</Form.Label>
      <Form.Control type="text" defaultValue={book.Publication} onChange={(e)=>setPublication(e.target.value)} />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Year:</Form.Label>
      <Form.Control type="number"   defaultValue={book.Year} onChange={(e)=>setYear(e.target.value)} />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Avilability:</Form.Label>
      <Form.Select deafultValue={book.Avilability} onChange={(e)=>{setAvilability(e.target.value)}} >
          <option value="N/A">N/A</option>
          <option  selected={book.Avilability === true}  value="true">avilable</option>
          <option selected={book.Avilability === false} value="false">not avilable</option>
       </Form.Select>
    </Form.Group>
    {/* <Form.Group className="mb-3">
        <Form.Label>Image:</Form.Label>
        <Form.Control type="text" placeholder='Provide a valid image link' defaultValue={book.Image} onChange={(e)=>setImage(e.target.value)} />
      </Form.Group> */}
       <Form.Group className="mb-3">
        <Form.Label>Image:</Form.Label>
        <br/>
        {Image=="" || Image==null ?  <img src={book.Image} alt="uploaded image" width={45}/>: <img src={Image} alt="uploaded image" width={45}/>}
        <Form.Control accept='image/*' type="file" defaultValue={''} onChange={Convertimage} />
        
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price:</Form.Label>
        <Form.Control type="number" defaultValue={book.Price} onChange={(e)=>setPrice(e.target.value)} />
      </Form.Group>
      {/* <Form.Group className="mb-3">
        <Form.Label>Quantity:</Form.Label>
        <Form.Control type="number" defaultValue={0} onChange={(e)=>setQuantity(e.target.value)} />
      </Form.Group> */}
    <div  style={{display:'flex',justifyContent:'center',marginTop:"2rem"}}>
    <Button variant="info" type="submit" style={{color:"#ffff"}} onClick={update}>
      update and add
    </Button>
      </div>
    </Form>
    </div>
      </Card.Body>
    </Card>
        

    </div>
  )
}

export default EditBook
