import React, { useState } from 'react'
import {  Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { BiBookAdd, BiCartAdd, BiLogOutCircle } from "react-icons/bi";
import { SiBookstack } from "react-icons/si";
import { FaCartArrowDown, FaCartPlus, FaUserCircle, FaUserPlus } from "react-icons/fa";
import { GiTeamDowngrade } from "react-icons/gi"

import { AiOutlineUnorderedList } from "react-icons/ai";
import './Sidebar.css'
import { RiTeamLine } from 'react-icons/ri';

function Sidebar(prop) {
  
   const nav=useNavigate()
   const [show, setshow] = useState(false)

   console.log(prop.show1);
   console.log(show);
   

   const clickBook=()=>{
    nav('/Books')
   }
   const addbook=()=>{
    nav('/addbook')
   }
   const logout=async()=>{
     await swal("User log out","come back soon","success")
      await nav('/')
   }
  return (
    <div>
     
     <div className={show || prop.show1 ? 'navcontainer' : null}>
     {/* <main className={show ? 'space-toggle' : null}> */}
       <div defaultActiveKey="/home" className="nav-head"  >
       {/* <div className="header-toggle" onClick={()=>setshow(!show)}>
          <FaBars style={{  color: "white" ,fontSize:'1.25rem',cursor:'pointer'}} />
        </div> */}
        <div>
      <Nav.Link eventKey="Books" className='nav-link' onClick={clickBook} > <SiBookstack /> Books</Nav.Link>
      <Nav.Link eventKey="AddBook" className='nav-link' onClick={addbook}> <BiBookAdd /> Add Books</Nav.Link>
      <Nav.Link eventKey="Clients" className='nav-link' onClick={()=>nav('/Clients')}> <FaUserCircle />&nbsp; Clients</Nav.Link>
      <Nav.Link eventKey="addClients"  className='nav-link' onClick={()=>nav('/addClients')}> <FaUserPlus/> Add Clients</Nav.Link>
      <Nav.Link eventKey="Customer" className='nav-link' onClick={()=>nav('/Customers')}><FaCartArrowDown /> Customers</Nav.Link>
      <Nav.Link eventKey="addCustomer" className='nav-link' onClick={()=>nav('/addCustomers')}> <FaCartPlus />   AddCustomers</Nav.Link>
      <Nav.Link eventKey="addTeamMember" className='nav-link' onClick={()=>nav('/sidebar/TeamMember')}> <RiTeamLine /> TeamMember</Nav.Link>
      <Nav.Link eventKey="addTeamMember" className='nav-link' onClick={()=>nav('/addTeammember')}> <GiTeamDowngrade/>   AddTeamMember</Nav.Link>
      <Nav.Link eventKey="addTeamMember" className='nav-link' onClick={()=>nav('/Order')}> <AiOutlineUnorderedList/>Order</Nav.Link>
       
      <Nav.Link eventKey="addTeamMember" className='nav-link' onClick={()=>nav('/addOrder')}> <BiCartAdd/>AddOrder</Nav.Link>
       
      </div>
      <div>
      <Nav.Link eventKey="Logout"  className='nav-link'  onClick={logout} >
          <BiLogOutCircle /> Logout
      </Nav.Link>
      </div>
    </div>
   {/* </main> */}
    </div>
    </div>
  )
}

export default Sidebar