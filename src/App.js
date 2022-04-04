import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Components/Login";
import Home from "./Components/Home";
import Posts from "./Components/Posts";
import Logout from './Components/Logout';
import RequireAuth from './Components/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<RequireAuth><Home /></RequireAuth>} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/posts' element={<RequireAuth><Posts /></RequireAuth>} />
        <Route exact path='/logout' element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;