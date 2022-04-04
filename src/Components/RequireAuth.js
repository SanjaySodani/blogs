import axios from 'axios';
import { Navigate } from 'react-router-dom';

function RequireAuth({children}) {
  const user = localStorage.getItem('blogKey');
  if (user) {
    axios.get('http://localhost:5000/api/authenticated', {
      headers: { authorization: 'Bearer ' + localStorage.getItem('blogKey') }
    }).then((res) => {
      console.log(res.data);
      return children;
    }).catch((err) => {
      console.log(err.response.data);
      return <Navigate to='/login' />;
    });
  } else {
    return <Navigate to='/login' />;
  }
}

export default RequireAuth;