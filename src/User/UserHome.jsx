import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { FaCartArrowDown, FaUserAlt } from "react-icons/fa";
import { FcLibrary } from "react-icons/fc";
import "./UserHome.css";
import { BsFillCartCheckFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert";
function UserHome() {
  const nav = useNavigate();
  const [Book, setBook] = useState([]);
  useEffect(() => {
    const api = `${process.env.REACT_APP_API_URL}/Books`;
    axios.get(api).then((res) => {
      setBook(res.data);
    });
  }, []);
  const username=localStorage.getItem('userName')
  console.log(username);


  
  const handlecart=(id)=>{
    const bkid=id;
    const userid=localStorage.getItem('userId')
 
    const data={bkid,userid}
    console.log(data);
    axios.put(`${process.env.REACT_APP_API_URL}/addtocart`,data).then((res)=>{
      console.log(res.data);
    })
    toast.success('Add to cart🛒', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  }
  const logout = () => {
    swal({
        title: "Are you sure?",
        icon: "warning",
         buttons: {
            yes: {
              text: "yes",
              value: "yes",
              
            },
            cancel: "No"
          },
          dangerMode: true,
        
      })
      .then((value) => {
        switch (value) {
 
            case "yes":
              swal("come back soon");
              nav('/')
              // localStorage.removeItem('userinfo')
              break;
         
            default:
              swal("thank a lot");
          }
      });
      
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            {" "}
            <FcLibrary style={{ fontSize: "2rem" }} /> My Libary
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link  onClick={()=>nav('/Cart')}>
                <FaCartArrowDown
                  style={{ color: "white", fontSize: "1.5rem" }}
                />
                Cart
              </Nav.Link>
              
              <NavDropdown
                title={ 
                  username
                }
                id="collasible-nav-dropdown"
              >
           
                <NavDropdown.Item href="#action/3.1" onClick={logout}>
                  {" "}
                  <BiLogOut /> loG OUT
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
      <div className="user-body">
        {Book.map((bk) => (
          <Card style={{ width: '18rem' }} className="Bk-card">
          <Card.Img variant="top" src={bk.Image} style={{height:'16rem'}} />
          <Card.Body>
            <Card.Title>Book Name 📖:{bk.Name}</Card.Title>
            <Card.Text>
             Author✒️:{bk.Author}
            </Card.Text>
            <Card.Text>
             Avilability :{`${bk.Avilability}` === "true"
                      ? "avilable"
                      : "not avilable"}
            </Card.Text>
            <Card.Title>Price :₹{bk.Price}💸</Card.Title>
            <Button variant="primary" onClick={()=>handlecart(bk._id)}>add to Cart🛒</Button>
          </Card.Body>
        </Card>
        ))}
      </div>
    </div>
  );
}

export default UserHome;
