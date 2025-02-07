import React, { useContext } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from './component/Feed';
import Shushes from './component/Shushes';
// import ShushEm from './component/ShushEm';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Footer from './component/Footer';
import AuthContext from './context/AuthContext';

function App() {
  const { userData } = useContext(AuthContext);
  const { name } = userData;
  return (
      <BrowserRouter>
        <div className="App">
          <Navbar name={name}/>
          <Routes>
            <Route exact path="/" element={<Feed />} />
            <Route path={`/shushes/${name}`} element={<Shushes />} />
            {/* <Route exact path="/shushem" element={<ShushEm />} /> */}
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
