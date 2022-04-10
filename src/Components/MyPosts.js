import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navigation from './Navigation';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const getData = () => {
    axios.get('https://blog-site-s.herokuapp.com/api/my-posts', {
      headers: { authorization: 'Bearer ' + localStorage.getItem('blogKey') }
    }).then((res) => {
      const data = res.data;
      setPosts(data.data);
    }).catch((err) => {
      navigate('/login', { state: location, replace: true });
    });
  }

  useEffect(() => {
    axios.get('https://blog-site-s.herokuapp.com/api/my-posts', {
      headers: { authorization: 'Bearer ' + localStorage.getItem('blogKey') }
    }).then((res) => {
      const data = res.data;
      setPosts(data.data);
      setName(data.name);
    }).catch((err) => {
      navigate('/login', { state: location, replace: true });
    });
  }, []);

  const handleDelete = (postId) => {
    axios.delete('https://blog-site-s.herokuapp.com/api/delete-post/' + postId, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('blogKey') }
    }).then((res) => {
      getData();
    }).catch((err) => {
      navigate('/login', { state: location, replace: true });
    });
  }

  return (
    <>
      <Navigation active='myposts' />
      <div className="container my-5">
        <div className='d-sm-flex justify-content-between align-items-center'>
          <div>
            <h2 className='font-weight-bolder my-3'>{name && name + "'s posts"}</h2>
          </div>
          <div>
            <Link to='/create-post' className='btn btn-primary btn-lg'>Create post</Link>
          </div>
        </div>
        <div className="row row-cols-1 justify-content-center">
          {posts.length !== 0 ? posts.map((item) => {
            return (
              <div className='col col-12 col-sm-10 col-md-8 col-lg-7' key={item.id}>
                <div className='card my-3 shadow-sm'>
                  <div className='card-header'>
                    <h5 className='my-0'>{item.postName}</h5>
                  </div>
                  <div className='card-body'>
                    <p className='card-text'>{item.postDescription}</p>
                  </div>
                  <div className='card-footer'>
                    <button type='button' className='btn btn-danger btn-block' onClick={() => { handleDelete(item.id) }}>
                      Delete this post
                    </button>
                  </div>
                </div>
              </div>
            )
          }) : <div className="d-flex justify-content-center">
            <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>}
        </div>
      </div>
    </>
  )
}

export default Posts;