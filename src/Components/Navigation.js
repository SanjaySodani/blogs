import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link className="navbar-brand font-weight-bolder" to='/'>Blog Site</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className='nav-link' to='/posts'>All Posts</Link>
          </li>
          <li className="nav-item">
            <Link className='nav-link' to='/my-posts'>My Posts</Link>
          </li>
        </ul>
      </div>

      <div>
        <Link className='text-danger' to='/logout'>Logout</Link>
      </div>
    </nav>
  )
}

export default Navigation