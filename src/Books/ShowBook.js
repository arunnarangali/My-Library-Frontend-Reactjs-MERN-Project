import axios from "axios";
import React, { useEffect, useState } from "react";
import {  Card, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Sidebar from "../Sidebar";
import { FaBars, FaEye, FaMinusCircle, FaRegEdit} from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

import "./showBooks.css";


function ShowBook() {
  const nav = useNavigate();
  const [Books, setBooks] = useState([]);
  // const [bid, setbid] = useState(second)
  const [show, setshow] = useState('')

  useEffect(() => {
    const api = `${process.env.REACT_APP_API_URL}/Books`;
    axios
      .get(api)
      .then(async (res) => {
        await setBooks(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const editbook = async (_id) => {
    console.log(_id);

    nav(`/editbook/${_id}`);
  };
  const viewbook = async (_id) => {
    console.log(_id);
    nav(`/viewbook/${_id}`);
  };

  const deletebook = async (_id) => {
    const api = `${process.env.REACT_APP_API_URL}/Books/${_id}`;
    axios.delete(api).then((e)=> {
      setBooks(e.data.books);
      swal("Deleted", e.data.deleteuser.Name, "success");
    });
  };
  const [Searchinput, setSearchinput] = useState("");
  

  const [CurrentPage, setCurrentPage] = useState(1);
  const recordsperpage = 5;
  const lsIndex = CurrentPage * recordsperpage;
  const fsIndex = lsIndex - recordsperpage;
  var Bookrecords = Books.slice(fsIndex, lsIndex);
  const npage = Math.ceil(Books.length / recordsperpage);
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
    var Bookrecords = Books.filter((cl) =>
    cl.Name.toLowerCase().includes(Searchinput.toLowerCase())
  );
  }
  return (
    <div className="showbook">
      <Sidebar show1={show}/>
     
      <Card border="light" className="scard">
        <Card.Header className="theader">
        <div className="header-toggle" onClick={()=>setshow(!show)}>
          <FaBars style={{  color: "white" ,fontSize:'1.25rem',cursor:'pointer'}} />
        </div>
          {" "}
          Books
            {/* <Button type="submit" variant="outline-success" onClick={search}>
                Search
              </Button> */}
          
        </Card.Header>
        <Card.Body className="cardbt">
        <Form className="d-flex  search-form">
            <Form.Control
              type="search"
              placeholder="Search bookName"
              className="search"
              aria-label="Search"
              onChange={(e) => setSearchinput(e.target.value)}
            />
            {/* <Button type="submit" variant="outline-success" onClick={search}>
                Search
              </Button> */}
          </Form>
          <div className="tablecontainer">
            <Table responsive striped="columns" className="btable table-border mt-5 table-responsive">
              <tr className="heading">
                <th>Name</th>
                <th>Author</th>
                <th>Publication</th>
                <th>Year</th>
                <th>Avilabilty</th>
                <th>Price</th>
                {/* <th>cred</th> */}
              </tr>
              {Bookrecords.map((bk) => (
                <tr>
                  <td>{bk.Name}</td>
                  <td>{bk.Author}</td>
                  <td>{bk.Publication}</td>
                  <td>{bk.Year}</td>
                  <td>
                    {`${bk.Avilability}` === "true"
                      ? "avilable"
                      : "not avilable"}
                  </td>
                  <td>{bk.Price}</td>
                  <td>
                  <FaEye  className="table-icon" onClick={()=>viewbook(bk._id)} />
                   
                    <FaRegEdit  className="table-icon"
                      onClick={() => editbook(bk._id)}
                       />
                      
                    
                    <RiDeleteBin5Fill
                      
                      className="table-icon"
                      onClick={() => deletebook(bk._id)}
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
  );
}

export default ShowBook;
