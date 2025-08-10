import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewLeaseAgreement from './Page/ViewLeaseAgreement.jsx';
import AddLeaseAgreement from './Page/AddLeaseAgreement.jsx'; 
import Navbar from './Page/Navbar.jsx'; 

function App() {
  return (
    <Router> 
      <Navbar/>  
      <Routes>
        <Route path="/" element={<AddLeaseAgreement />} />  
        <Route path="/view" element={<ViewLeaseAgreement />} />
      </Routes>
    </Router>
  );
}

export default App;
