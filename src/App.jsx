import React, { useContext } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from './component/Feed';
import Shushes from './component/Shushes';
import ShushEm from './component/ShushEm';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Footer from './component/Footer';
import AuthContext from './context/AuthContext';
import Verify from './component/Verify';
import AllUsers from './component/AllUsers';

function App() {
  const { selfData } = useContext(AuthContext);
  const { userName } = selfData;

  return (
      <BrowserRouter>
        <div className="App">
          <Navbar userName={userName}/>
          <Routes>
            <Route exact path="/" element={<Feed />} />
            <Route exact path={`/shushes/${userName}`} element={<Shushes />} />
            <Route path='/shushem/:userName' element={<ShushEm />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/verify" element={<Verify />} />
            <Route path='allUsers/:searchNameValue' element={<AllUsers />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
