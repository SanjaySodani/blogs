import { Navigate } from 'react-router-dom';

function Logout() {
  localStorage.removeItem('blogKey');
  return <Navigate to='/login' />;
}

export default Logout;