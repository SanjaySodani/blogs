import { Link } from 'react-router-dom';
import './custom.css';

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link className="navbar-brand font-weight-bolder" to='/'>Blog Site</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={props.active === 'posts' ? 'nav-item active' : 'nav-item'}>
            <Link className='nav-link' to='/posts'>All Posts</Link>
          </li>
          <li className={props.active === 'myposts' ? 'nav-item active' : 'nav-item'}>
            <Link className='nav-link' to='/my-posts'>My Posts</Link>
          </li>
        </ul>
        <div>
          <Link className='text-danger btn btn-logout' to='/logout'>Logout</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation