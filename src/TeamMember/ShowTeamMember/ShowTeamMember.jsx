import React, { useEffect, useState } from 'react'
import { Card, Form, Table } from 'react-bootstrap'
import { FaBars, FaEye, FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import Sidebar from '../../Sidebar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

function ShowTeamMember() {
  const nav=useNavigate()
  const [TeamMember, setTeamMember] = useState
  ([])
  const [show, setshow] = useState('')
  
  useEffect(() => {
   const api=`${process.env.REACT_APP_API_URL}/Teammember`
   axios.get(api).then(async(res)=>{
     await setTeamMember(res.data)
     console.log(res.data);
   }).catch((error)=>console.log(error))
  }, [])
  const deleteTeamMember=(id)=>{
    console.log(id);
    axios.delete(`${process.env.REACT_APP_API_URL}/deletTeammember/${id}`).then((e)=>{
      setTeamMember(e.data.TeamMember)
      swal("Deleted",e.data.deletTeamMember.Name, "success");
    })
  }
  
  const [Searchinput, setSearchinput] = useState("");
  const [CurrentPage, setCurrentPage] = useState(1);
  const recordsperpage = 5;
  const lsIndex = CurrentPage * recordsperpage;
  const fsIndex = lsIndex - recordsperpage;
  var Teammember = TeamMember.slice(fsIndex, lsIndex);
  const npage = Math.ceil(TeamMember.length / recordsperpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const nextpage = () => {
    if (CurrentPage !== npage) {
      setCurrentPage(CurrentPage + 1);
    }
  };
  const prepage = () => {
    if (CurrentPage !== 1) {
      setCurrentPage(CurrentPage - 1);
    }
  };
  const changCpage = (id) => {
    setCurrentPage(id);
    console.log("cpage");
  };
  if(Searchinput!==''){
    var Teammember = TeamMember.filter((tm) =>
    tm.Name.toLowerCase().includes(Searchinput.toLowerCase())
  );
  }
  const viewTeammember=(id)=>{
    console.log(id);
    nav(`/viewTeammember/${id}`)
  }
  const editTeamMember=(id)=>{
    console.log(id);
    nav(`/editTeammember/${id}`)
  }
 
  return (
    <div>
        <div className="showbook">
        <Sidebar show1={show}/>
        
      <Card border="light" className="scard">
        <Card.Header className="theader">
        <div className="header-toggle" onClick={()=>setshow(!show)}>
          <FaBars style={{  color: "white" ,fontSize:'1.25rem',cursor:'pointer'}} />
        </div>
          {" "}
          Team Member
         
        </Card.Header>
        <Card.Body className="cardbt">
          <Form className="d-flex  search-form">
            <Form.Control
              type="search"
              placeholder="Search Team Member"
              className="search"
              aria-label="Search"
              onChange={(e) => setSearchinput(e.target.value)}
            />
            {/* <Button type="submit" variant="outline-success" onClick={search}>
                Search
              </Button> */}
          </Form>
          <div className="tablecontainer">
          <Table striped="columns" className="btable table-border mt-5 table-responsive">
              <tr className="heading">
                <th>Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th> Gender</th>
                <th>Description</th>
                <th>Role</th>
                <th>PhoneNumber</th>
                {/* <th>Country</th> */}
                {/* <th>cred</th> */}
              </tr>
                {Teammember.map((tm)=>(
                  <tr>
                    <td>{tm.Name}</td>
                    <td>{tm.Email}</td>
                    <td>{tm.DOB}</td>
                    <td>{tm.Gender}</td>
                    <td>{tm.Description}</td>
                    <td>{tm.Role}</td>
                    <td>{tm.PhoneNumber}</td>
                    <td style={{display:'flex' }}>
                    <FaEye  className="table-icon" onClick={()=>viewTeammember(tm._id)}  />
                   
                   <FaRegEdit  className="table-icon"
                     onClick={()=>editTeamMember(tm._id)}
                      />
                     
                   
                   <RiDeleteBin5Fill
                     
                     className="table-icon"
                    onClick={()=>deleteTeamMember(tm._id)}
                   
                   />
                    </td>
                  </tr>
                ))}
              </Table>
           </div>
           <nav style={{display:'flex',justifyContent:'center'}}>
            <ul  className="pagination">
              <li  className="page-item">
                <button href="#" className="page-link" onClick={prepage}>
                  {" "}
                  prev
                </button>
              </li>
              {numbers.map((n, i) => (
                <li
                
                  className={`page-item ${CurrentPage === n ? "active" : ""}`}
                  key={i}
                >
                  <button
                    href="#"
                    className="page-link"
                    onClick={() => changCpage(n)}
                  >
                    {" "}
                    {n}
                  </button>
                </li>
              ))}

              <li  className="page-item">
                <button href="#" className="page-link" onClick={nextpage}>
                  {" "}
                  next
                </button>
              </li>
            </ul>
          </nav>
           </Card.Body>
      </Card> 
        </div>
    </div>
  )
}

export default ShowTeamMember