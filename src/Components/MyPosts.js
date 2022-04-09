import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from './Navigation';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/my-posts', {
      headers: { authorization: 'Bearer ' + localStorage.getItem('blogKey') }
    }).then((res) => {
      const data = res.data;
      setPosts(data.data);
      setName(data.name);
    }).catch((err) => {
      navigate('/login', { state: location });
    });
  }, []);

  return (
    <>
      <Navigation />
      <div className="container my-5">
        <h2 className='font-weight-bolder my-3'>{name}'s posts</h2>
        <div className="row row-cols-1 justify-content-center">
          {posts.length !== 0 ? posts.map((item) => {
            return (
              <div className='col col-12 col-sm-10 col-md-8 col-lg-7' key={item.id}>
                <div className='card my-3 shadow'>
                  <div className='card-body'>
                    <h5 className='card-title'>{item.postName}</h5>
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