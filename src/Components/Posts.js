import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from './Navigation';

function Posts() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://blog-site-s.herokuapp.com/api/all-posts', {
      headers: { authorization: 'Bearer ' + localStorage.getItem('blogKey') }
    }).then((res) => {
      const data = res.data.data;
      setPosts(data);
    }).catch((err) => {
      navigate('/login', { state: location, replace: true });
    });
  }, []);

  return (
    <>
      <Navigation active='posts' />
      <div className="container my-4">
        <div className="row row-cols-1 justify-content-center">
          <div className='col col-12 col-sm-10 col-md-8 col-lg-7'>
            <h2 className='font-weight-bolder my-3'>All posts</h2>
          </div>
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