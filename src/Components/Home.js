import Navigation from "./Navigation";
import reactImage from '../icons/react.svg';
import expressImage from '../icons/expressjs.svg';
import mongoImage from '../icons/mongodb.svg';
import bootstrapImage from '../icons/bootstrap.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://blog-site-s.herokuapp.com/api/all-posts', {
      headers: { authorization: 'Bearer ' + localStorage.getItem('blogKey') }
    }).then((res) => {
      const data = res.data.data;
      setPosts(data.slice(0,3));
    }).catch((err) => {
      navigate('/login', { state: location, replace: true });
    });
  }, []);

  return (
    <>
      <Navigation />
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-3 mb-5">
          <div className="col col-lg-1 d-none d-lg-flex flex-column">
            <div className="text-center my-2">
              <img className="img-fluid" src={reactImage} />
              <h6>ReactJs</h6>
            </div>
            <div className="text-center my-2">
              <img className="img-fluid" src={expressImage} />
              <h6>ExpressJs</h6>
            </div>
            <div className="text-center my-2">
              <img className="img-fluid" src={mongoImage} />
              <h6>MongoDB</h6>
            </div>
            <div className="text-center my-2">
              <img className="img-fluid" src={bootstrapImage} />
              <h6>Bootstrap</h6>
            </div>
          </div>
          <div className="col col-md-8 col-lg-7">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="card-title font-weight-bolder my-4 mr-lg-5 mt-lg-4 mb-lg-5" style={{ letterSpacing: "-1px", fontFamily: "sans-serif" }}>
                  Blog Site using ReactJs, ExpressJs, MongoDB and Bootstrap
                </h1>
                <div className="card-text my-5 mr-lg-4">
                  <h3 style={{ letterSpacing: "-1px", fontFamily: "sans-serif" }}>Backend</h3>
                  <p>
                    This app uses <b>ExpressJs</b> for backend and handles tasks such as login, providing posts,
                    creating new posts. Uses <b>JWT</b> for authentication, checks if the user is authenticated every
                    time when a request is made. Uses <b>MongoDB</b> to store data and users information.
                  </p>
                </div>
                <div className="card-text my-5 mr-lg-4">
                  <h3 style={{ letterSpacing: "-1px", fontFamily: "sans-serif" }}>Frontend</h3>
                  <p>
                    The frontend is build using <b>ReactJs</b>, having simple components such as Home,
                    Posts and My Posts. Uses <b>React Router Dom</b> for routing and authentication purpose.
                    It also uses <b>Bootstrap</b> for styling and the navbar is build using it.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-md-4 col-lg-4">
            <h3 className="card-title font-weight-bolder my-3" style={{ fontFamily: "sans-serif" }}>
              Trending Posts
            </h3>
            {posts.length !== 0 ? posts.map((item, i) => {
              return (
                <div className='' key={item.id}>
                  <div className='card my-3 shadow-sm'>
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
      </div>
    </>
  )
}

export default Home;