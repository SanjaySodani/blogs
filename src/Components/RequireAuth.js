import { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";

function RequireAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('blogKey');

    if (user) {
      axios.get('http://localhost:5000/api/authenticated', {
        headers: { authorization: 'Bearer ' + localStorage.getItem('blogKey') }
      }).then((res) => {
        setAuth(true);
      }).catch((err) => {
        navigate('/login', { state: location, replace: true });
      });
    } else {
      navigate('/login', { state: location });
    }

    return function cleanup () {
      setAuth(false);
    }
  }, []);

  return (
    auth ? <Outlet /> : null
  )
}

export default RequireAuth;