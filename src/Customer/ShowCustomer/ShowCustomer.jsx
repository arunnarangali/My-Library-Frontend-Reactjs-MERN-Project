import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import { Card, Form, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaBars, FaEye, FaMinusCircle, FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import swal from 'sweetalert'

function ShowCustomer() {
  const nav=useNavigate()
  const [show, setshow] = useState('')
  const [Customer, setCustomer] = useState([])
  useEffect(() => {
    const api='http://localhost:8000/Customer'
    axios.get(api).then(async(res)=>{
      await setCustomer(res.data)
      console.log(res.data);
    }).catch((err)=> console.log(err))
  }, [])
  const deletecustomer=(id)=>{
    console.log(id);
     const  api=`http://localhost:8000/deleteCustomer/${id}`
    axios.delete(api).then((e)=>{
      setCustomer(e.data.customer);
      swal("Deleted",e.data.deleteCustomer.Name, "success");
    });
  }
  const [Searchinput, setSearchinput] = useState("");
  const [CurrentPage, setCurrentPage] = useState(1);
  const recordsperpage = 5;
  const lsIndex = CurrentPage * recordsperpage;
  const fsIndex = lsIndex - recordsperpage;
  var Customerrecords = Customer.slice(fsIndex, lsIndex);
  const npage = Math.ceil(Customer.length / recordsperpage);
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
    var Customerrecords = Customer.filter((cl) =>
    cl.Name.toLowerCase().includes(Searchinput.toLowerCase())
  );
  }
  const editcustomer=(id)=>{
    console.log(id);
    nav(`/editCustomers/${id}`)
  }
  const view=(id)=>{
    console.log(id);
    nav(`/Customerview/${id}`)
  }

  
  return (
   
        <div className="showbook">
      <Sidebar show1={show} />
      <Card border="light" className="scard">
        <Card.Header className="theader">
        <div className="header-toggle" onClick={()=>setshow(!show)}>
          <FaBars style={{  color: "white" ,fontSize:'1.25rem',cursor:'pointer'}} />
        </div>
          {" "}
          Customers
         
        </Card.Header>
        <Card.Body className="cardbt">
          <Form className="d-flex  search-form">
            <Form.Control
              type="search"
              placeholder="Search Customer"
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
                <th>Address 1</th>
                <th>Address 2</th>
                <th>city</th>
                <th>State</th>
                <th>pin</th>
                <th>Country</th>
                {/* <th>cred</th> */}
              </tr>
              {Customerrecords .map((cu)=>(
                <tr>
                  <td>{cu.Name}</td>
                  <td>{cu.Email}</td>
                  <td>{cu.Addressline1}</td>
                  <td>{cu.Addressline2}</td>
                  <td>{cu.City}</td>
                  <td>{cu.State}</td>
                  <td>{cu.PinCode}</td>
                  <td>{cu.Country}</td>
                  <td style={{display:'flex' }}>
                  <FaEye  className="table-icon" onClick={()=>view(cu._id)} />
                   
                   <FaRegEdit  className="table-icon"
                     onClick={()=>editcustomer(cu._id)}
                      />
                     
                   
                   <RiDeleteBin5Fill
                     
                     className="table-icon"
                     onClick={()=>deletecustomer(cu._id)}
                   
                   />
                  </td>
                </tr>
              ))

              }

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
  )
}

export default ShowCustomer