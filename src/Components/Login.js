import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [passwordVisible, setPasswordVisible] = useState("password");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/login', { username, password }).then((res) => {
      localStorage.setItem('blogKey', res.data.token);
      navigate('/', {replace: true});
    }).catch((error)=>{
      window.alert("Invalid username/password");
    })
  }

  const handleTogglePassword = () => {
    setPasswordVisible((prev) => {
      if (prev === "password") {
        return "text";
      }
      else {
        return "password";
      }
    });
  }

  return (
    <div className='container'>
      <div className='row row-cols-1 justify-content-center vh-100'>
        <div className='col my-auto'>
          <h2 className='mb-5 text-center'>Blogs</h2>
          <div className='form-group mx-sm-5 mx-3'>
            <h3 className='text-monospace mb-4'>Please login</h3>
            <div className='input-group my-2'>
              <div className='input-group-prepend'>
                <div className='input-group-text' style={{ fontSize: "20px" }} >
                  <i className='fas fa-user text-primary'></i>
                </div>
              </div>
              <input type="text" className='form-control p-3'
                placeholder="Username" style={{ fontSize: "20px" }}
                onChange={(event) => { setUsername(event.target.value) }} value={username} />
            </div>
            <div className='input-group my-2'>
              <div className='input-group-prepend'>
                <div className='input-group-text' style={{ fontSize: "20px" }} >
                  <i className='fas fa-lock text-primary'></i>
                </div>
              </div>
              <input type={passwordVisible} className='form-control p-3'
                placeholder="Password" style={{ fontSize: "20px" }}
                onChange={(event) => { setPassword(event.target.value) }} value={password} />
              <div className='input-group-append'>
                <button type="button" className='btn btn-outline-secondary' onClick={handleTogglePassword}>
                  <i className={passwordVisible === "text" ? 'fas fa-eye text-primary' : 'fas fa-eye text-secondary'}></i>
                </button>
              </div>
            </div>
            <div className='mt-4 mb-5'>
              <div className='d-flex justify-content-end'>
                <button type='button' onClick={handleSubmit} className='btn btn-lg btn-outline-success'>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;