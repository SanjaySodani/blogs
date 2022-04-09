import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Components/Login";
import Home from "./Components/Home";
import Posts from "./Components/Posts";
import Logout from './Components/Logout';
import RequireAuth from './Components/RequireAuth';
import React, { useState } from 'react';
export const AuthContext = React.createContext();

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, user, setUser }}>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/logout' element={<Logout />} />
          <Route element={<RequireAuth />}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/posts' element={<Posts />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;