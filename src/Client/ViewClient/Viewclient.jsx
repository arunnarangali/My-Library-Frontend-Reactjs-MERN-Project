import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import { Button, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function Viewclient() {
  const nav=useNavigate()
  const [Client, setClient] = useState([])
  const {id}=useParams()
  useEffect(() => {
    const api=`${process.env.REACT_APP_API_URL}/findclient/${id}`
    axios.get(api).then(async(res)=>{
         await setClient(res.data.client);
      

    }).catch(err=>console.log(err))
  }, [id])
  const back=()=>{
   nav('/Clients')
  }
  
  return (
    <div>
      <div className="showclient">
        <Sidebar />
        <div className="cbody">
          <div className="chead">
            <span className='ch1'> Client &nbsp;&nbsp;{Client.Name}'s &nbsp; Details{" "}
            </span>
          </div>
          <div className="tableclientcontainer">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card
                border="success"
                style={{ width: "45rem", height: "20rem", marginTop: "5rem" }}
              >
                <Card.Body>
                  <Card.Title style={{ color: "#fff" }}></Card.Title>
                  <Card.Text>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                      }}
                    >
                      <div style={{ textAlign: "right", color: "#4E6468" }}>
                        <h4>Name :</h4>

                        <h4>Username</h4>

                        <h4>Email: </h4>

                        <h4>SignedStatus: </h4>

                        <h4>ROLE :</h4>

                        <h4>Phonenumber :</h4>
                      </div>
                      <div style={{ textAlign: "left", color: "#fff" }}>
                        <h4>{Client.Name}</h4>
                        <h4>{Client.Username}</h4>
                        <h4>{Client.Email}</h4>
                        <h4>
                          {`${Client.SignedStatus}` === "true"
                            ? "Signed"
                            : "notSigned"}
                        </h4>
                        <h4>{Client.Role}</h4>
                        <h4>{Client.PhoneNumber}</h4>
                      </div>
                    </div>
                  </Card.Text>
                  <Button
                    variant="info"
                    type="submit"
                    style={{ color: "#ffff" }}
                    onClick={back}
                  >
                    Back 
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewclient