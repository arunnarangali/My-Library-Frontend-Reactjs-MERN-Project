import React, { useEffect, useState } from 'react'
import { Card, Form, Table } from 'react-bootstrap'
import { FaBars, FaEye, FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import Sidebar from '../../../Sidebar'
import axios from 'axios'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

function ShowOrder() {
    const nav=useNavigate();
    const [Order, setOrder] = useState([])
  const [show, setshow] = useState('')

    useEffect(() => {
      axios.get(`http://localhost:8000/Order`).then(async(res)=>{
        await setOrder(res.data)
        console.log(res.data);
      }).catch((err)=>console.log(err))
    }, [])

   
    const deleteOrder=(id)=>{
        console.log(id);
        axios.delete(`http://localhost:8000/deleteorder/${id}`).then((e)=>{
            setOrder(e.data.order)
            swal("Deleted",e.data.deleteorder.FirstName, "success");
        })
    }

    const [Searchinput, setSearchinput] = useState("");
    const [CurrentPage, setCurrentPage] = useState(1);
  const recordsperpage = 5;
  const lsIndex = CurrentPage * recordsperpage;
  const fsIndex = lsIndex - recordsperpage;
  var Orderdata = Order.slice(fsIndex, lsIndex);
  const npage = Math.ceil(Order.length / recordsperpage);
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
    var Orderdata = Order.filter((od) =>
    od.FirstName.toLowerCase().includes(Searchinput.toLowerCase())
  );
  }
  const viewOrder=(id)=>{
    console.log(id);
    nav(`/ViewOrder/${id}`)
  }
  const EditOrder=(id)=>{
    console.log(id);
    nav(`/editeOrder/${id}`)
  }
    

    
    
  return (
    <div className='showbook' >
          <Sidebar  show1={show}/>
          <Card border="light" className="scard">
        <Card.Header className="theader">
        <div className="header-toggle" onClick={()=>setshow(!show)}>
          <FaBars style={{  color: "white" ,fontSize:'1.25rem',cursor:'pointer'}} />
        </div>
          {" "}
          Order 
         
        </Card.Header>
        <Card.Body className="cardbt">
          <Form className="d-flex  search-form">
            <Form.Control
              type="search"
              placeholder="Search Order"
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
                <th> First Name</th>
                <th>Last Name</th>
                <th>Order Id</th>
                <th> ProductNumber</th>
                <th> Date</th>
               
              </tr>
             {Orderdata.map((od)=>(
                <tr>
                    <td>{od.FirstName}</td>
                    <td>{od.LastName}</td>
                    <td>{od.OrderId}</td>
                    <td>{od.ProductNumber}</td>
                    <td>{od.Date}</td>
                    <td>
                    <FaEye  className="table-icon" onClick={()=>viewOrder(od._id)} />
                   
                   <FaRegEdit  className="table-icon" onClick={()=>EditOrder(od._id)}/>
                     
                   
                   <RiDeleteBin5Fill className="table-icon" onClick={()=>deleteOrder(od._id)}/>
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
  

  )
}

export default ShowOrder