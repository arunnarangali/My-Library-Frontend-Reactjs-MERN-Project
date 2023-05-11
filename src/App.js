
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import Sidebar from './Sidebar';
import Signup from './Login & signup/Signup';
import Login from './Login & signup/Login';
import ShowBook from './Books/ShowBook';
import Addbooks from './Books/Addbooks';
import EditBook from './Books/EditBook';
import Viewbook from './Books/Viewbook';
import ShowClient from './Client/Client show/ShowClient';
import AddClient from './Client/Addclient/AddClient';
import EditClient from './Client/EditClient/EditClient';
import Viewclient from './Client/ViewClient/Viewclient';
import ShowCustomer from './Customer/ShowCustomer/ShowCustomer';
import AddCustomer from './Customer/AddCustomer/AddCustomer';
import Customerview from './Customer/Customerview';
import EditCustomer from './Customer/Edit Customer/EditCustomer';
import AddTeamMember from './TeamMember/AddTeamMember/AddTeamMember';
import ShowTeamMember from './TeamMember/ShowTeamMember/ShowTeamMember';
import ViewTeamMember from './TeamMember/viewTeamMember/ViewTeamMember';
import EditTeamMember from './TeamMember/EditTeamMember/EditTeamMember';
import Addorder from './Order/Addorder/Addorder';
import ShowOrder from './Order/Addorder/showorder/ShowOrder';
import Vieworder from './Order/viewOrder/Vieworder';
import EditOrder from './Order/Edite Order/EditOrder';
import Homepage from './Login & signup/Homepage';
import AdminLogin from './Login & signup/AdminLogin';
import UserHome from './User/UserHome';
import Cart from './User/Cart';






function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* {<Signup /> || <Login /> ? <NavBar /> :<Sidebar />} */}
      {<Sidebar />?"":<NavBar />}
      
     
      <Routes>
  
      <Route path='/' element={<Homepage />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/login' element={<Login />} ></Route>
      <Route path='/adminlogin' element={<AdminLogin/>} ></Route>
      <Route path='/sidebar' element={<Sidebar />}></Route>
      <Route path='/Userhome' element={<UserHome />}></Route>
      <Route path='/Cart' element={<Cart />}></Route>

      <Route path='/Books' element={<ShowBook />}></Route>
      <Route path='/addbook' element={<Addbooks />} />
      <Route path='/editbook/:id' element={<EditBook/>} />
      <Route path='/viewbook/:id' element={<Viewbook/>} />
      <Route path='/Clients' element={<ShowClient/>} />
      <Route path='/addClients' element={<AddClient/>} />
      <Route path='/editclient/:id' element={<EditClient/>} />
      <Route path='/viewclient/:id' element={<Viewclient/>} />
      <Route path='/Customers' element={<ShowCustomer/>} />
      <Route path='/addCustomers' element={<AddCustomer/>} />
      <Route path='/Customerview/:id'  element={<Customerview />}/>
      <Route path='/editCustomers/:id' element={<EditCustomer/>} />
      <Route path='/sidebar/TeamMember' element={<ShowTeamMember/>} />

      <Route path='/addTeammember' element={<AddTeamMember/>} />
      <Route path='/viewTeammember/:id' element={<ViewTeamMember/>} />
      <Route path='/editTeammember/:id' element={<EditTeamMember/>} />
      <Route path='/addOrder' element={<Addorder/>} />
      <Route path='/Order' element={<ShowOrder/>} />
      <Route path='/ViewOrder/:id' element={<Vieworder/>} />
      <Route path='/editeOrder/:id' element={<EditOrder/>} />
      
      





      

    


     



     












      </Routes>
     
      </BrowserRouter>
    </div>
  );
}

export default App;
