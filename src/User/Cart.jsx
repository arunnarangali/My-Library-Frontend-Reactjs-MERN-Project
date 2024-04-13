import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, Table } from 'react-bootstrap';
import { AiFillMinusCircle } from 'react-icons/ai';

import {  BsPlusCircleFill } from 'react-icons/bs';
import { FaCartArrowDown } from 'react-icons/fa';
import { FcLibrary } from 'react-icons/fc';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Cart.css";
function Cart() {
    const nav = useNavigate();

    // const username=localStorage.getItem('userName')
    const [Cart, setCart] = useState([])
    useEffect(() => {
      const userid=localStorage.getItem('userId')
    const data={userid}
      axios.post(`${process.env.REACT_APP_API_URL}/Cart`,data).then((res)=>{
           setCart(res.data.product.Cart);
            console.log(res.data.product.Cart);
      })
     
    
    }, [])
   
    console.log(Cart);
    const   tPrice=Cart.reduce((price,item)=> price + item.Quantity *  item.Price , 0);
    //  const handleplus=(index,item)=>{
    //   console.log(index);
    //   // Cart.Price=Cart.Price * Cart.Price
    //  console.log(item);
    //  const _Cart=Cart.map()
    //  item.Price=item.Price*item.Price
    //  setyy(yy+1)
      
    //  }
    const handleremove=(bk)=>{
        const bkid=bk._id;
        const userid=localStorage.getItem('userId')
        const data={bkid,userid}
        console.log(data);
        axios.put(`${process.env.REACT_APP_API_URL}/removeitem`,data).then((res)=>{
           setCart(Cart.filter(ct=>ct._id !==bkid));
            console.log(res.data);
            
        })
        toast.warn(`${bk.Name} Removed from Cart!`, {
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

  return (
    <div className='cart'>
         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={()=>nav('/Userhome')}  >
            {" "}
            <FcLibrary style={{ fontSize: "2rem" }}  /> My Libary
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link  onClick={()=>nav('/Userhome')} >
                <FaCartArrowDown
                  style={{ color: "white", fontSize: "1.5rem" }}
                />
                Shop
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
      <div className='cart-heading'>
    <h4>{Cart.length>=1 ? `you have ${Cart.length} item` : "No items in Cart" }</h4>
    </div>
    <div className='cart-table-container'>
    <Table responsive striped bordered hover >
            
              <tr>
                <th></th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
                <th  rowSpan={Cart.length} style={{width:'10rem'}}>
                <span>total:</span>
                 <span>Rs -{tPrice}💸</span>
                </th>
              </tr>


   {Cart?.map((bk,crtindex)=>(
    <tr key={bk._id}>
    <td><img src={bk.Image} alt={`${bk.Name} image`} width={45}/> 
    </td>
   <td> 
    <span>{bk.Name}</span>
   </td>
    <td style={{display:'flex',justifyContent:'space-between'}}>
    <AiFillMinusCircle className="cart-table-icon" onClick={()=>{
      const UPCART= Cart.map((item,index)=>{
        return crtindex===index && item.Quantity!== 1 ? {...item,Quantity:item.Quantity-1} : item
      })
      setCart(UPCART)
    }} />
    < span>{bk.Quantity}</span>
    <BsPlusCircleFill className="cart-table-icon" onClick={()=>{
      const UPCART= Cart.map((item,index)=>{
        return crtindex===index ? {...item,Quantity:item.Quantity+1} : item
      })
      setCart(UPCART)
    }}/>
    </td>
    <td>
    <span> {bk.Price * bk.Quantity} 💸</span>
    </td>
   
    <td>
    <RiDeleteBin5Fill  className="cart-table-removeicon" onClick={()=>handleremove(bk)}/>
    </td>
    
</tr>
   ))} 
   </Table>
    </div>
    {/* <div style={{display:'flex',justifyContent:'flex-end'}}>
      <span>total : </span>
      <span>Rs -{tPrice}💸</span>
    </div> */}

    </div>
  )
}

export default Cart