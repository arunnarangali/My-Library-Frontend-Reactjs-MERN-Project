import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import { Button, Form, Table } from "react-bootstrap";
import axios from "axios";
import "./ShowClient.css";
import swal from "sweetalert";
import { FaBars, FaEye, FaMinusCircle, FaRegEdit} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";

function ShowClient() {
  const nav = useNavigate();
  const [Searchinput, setSearchinput] = useState("");
  const [Clientdetails, setClientdetails] = useState([]);
  const [show,setshow] = useState('');
  useEffect(() => {
    const api = "http://localhost:8000/Clients";
    axios
      .get(api)
      .then(async (res) => {
        await setClientdetails(res.data.Client);
      })
      .catch((err) => console.log(err));
  }, []);

  const View = (_id) => {
    nav(`/viewclient/${_id}`);
  };

  const Edit = (_id) => {
    console.log(_id);
    nav(`/editclient/${_id}`);
  };

  const deleteclient = async (_id) => {
    const api = `http://localhost:8000/Clientdelete/${_id}`;
    axios.delete(api).then((res) => {
      setClientdetails(res.data.client);
      swal("Deleted", res.data.deleteClient.Name, "success");
    });
  };
 
 

const [CurrentPage, setCurrentPage] = useState(1);
const recordsperpage = 5;
const lsIndex = CurrentPage * recordsperpage;
const fsIndex = lsIndex - recordsperpage;
var Clientrecords = Clientdetails.slice(fsIndex, lsIndex);
const npage = Math.ceil(Clientdetails.length / recordsperpage);
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
  var Clientrecords =  Clientdetails.filter((cl) =>
  cl.Name.toLowerCase().includes(Searchinput.toLowerCase())
);
}

  return (
    <div>
      <div className="showclient">
        <Sidebar />
        
        <div className="cbody">
          <div className="chead">
          {/* <div className="header-toggle" id="toggle" onClick={()=>setshow(!show)}> */}
          
        {/* </div> */}
            <div className="ch1">
            {/* <FaBars onClick={()=>setshow(!show)} style={{  color: "white" ,fontSize:'1.25rem',cursor:'pointer'}} /> */}
              <span>Client Details</span>
            </div>
          </div>
          
          <Form className="d-flex search-form" >
              <Form.Control
                type="search"
                placeholder="Search ClientName"
                className="search"
                aria-label="Search"
                onChange={(e) => setSearchinput(e.target.value)}
              />
              {/* <Button type="submit" variant="outline-success" onClick={search}>
                Search
              </Button> */}
            </Form>
            

          <div className="tableclientcontainer">
            <Table responsive>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>SignedStatus</th>
                <th>Role</th>
                <th>PhoneNumber</th>
              </tr>
              {Clientrecords.map((cl) => (
                <tr>
                  <td>{cl.Name}</td>
                  <td>{cl.Username}</td>
                  <td>{cl.Email}</td>
                  <td>
                    {`${cl.SignedStatus}` === "true" ? "signin" : "not signin"}
                  </td>
                  <td>{cl.Role}</td>
                  <td>{cl.PhoneNumber}</td>
                  <td>
                    <FaEye
                      
                      className="table-icon"
                      onClick={() => View(cl._id)}
                    />
                      
                    
                    <FaRegEdit
                      
                      className="table-icon"
                      onClick={() => Edit(cl._id)}
                      />
                   
                    
                    <RiDeleteBin5Fill
                    
                      className="table-icon"
                      onClick={() => deleteclient(cl._id)}
                    />
                    
                  
                  </td>
                </tr>
              ))}
            </Table>
           
            
          </div>
          <nav style={{display:'flex',justifyContent:'center',marginTop:'1rem'}}>
            <ul  className="pagination">
              <li  className="page-item">
                <a href="#" className="page-link" onClick={prepage}>
                  {" "}
                  prev
                </a>
              </li>
              {numbers.map((n, i) => (
                <li
                
                  className={`page-item ${CurrentPage === n ? "active" : ""}`}
                  key={i}
                >
                  <a
                    href="#"
                    className="page-link"
                    onClick={() => changCpage(n)}
                  >
                    {" "}
                    {n}
                  </a>
                </li>
              ))}

              <li  className="page-item">
                <a href="#" className="page-link" onClick={nextpage}>
                  {" "}
                  next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ShowClient;
