import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './custom.css';

function Login() {
  const [passwordVisible, setPasswordVisible] = useState("password");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.pathname || '/';

  useEffect(() => {
    const user = localStorage.getItem('blogKey');

    if (user) {
      axios.get('https://blog-site-s.herokuapp.com/api/authenticated', {
        headers: { authorization: 'Bearer ' + localStorage.getItem('blogKey') }
      }).then((res) => {
        navigate('/');
      });
    }
  }, []);

  const handleSubmit = () => {
    axios.post('https://blog-site-s.herokuapp.com/api/login',
      {
        username, password
      }).then((res) => {
        const data = res.data;
        localStorage.setItem('blogKey', data.token);
        navigate(from, { replace: true });
      }).catch((error) => {
        window.alert("Invalid username/password");
      });
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
      <div className='row row-cols-1 row-cols-lg-2 justify-content-center vh-100'>
        <div className='col my-auto'>
          <h1 className='font-weight-bolder mb-5 text-center'>Blogs</h1>
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