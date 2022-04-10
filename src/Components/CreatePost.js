import Navigation from "./Navigation";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

function CreatePost() {
  const [postName, setPostName] = useState("");
  const [postDescription, setPostDescription] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleCreatePost = () => {
    axios.post('https://blog-site-s.herokuapp.com/api/create-post', {
      postName: postName,
      postDescription: postDescription
    }, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('blogKey') }
    }).then((res) => {
      navigate('/my-posts', { state: location, replace: true });
    }).catch((err) => {
      navigate('/login', { state: location, replace: true });
    });
  }

  return (
    <>
      <Navigation />
      <div className="container my-4">
        <div className="row row-cols-1 justify-content-center">
          <div className="col col-12 col-sm-10 col-md-8 col-lg-6">
            <h3 className="font-weight-bolder my-4" style={{ fontFamily: 'sans-serif' }}>Create a new post</h3>
            <input type="text" placeholder="Post title" className="form-control my-2"
              onChange={(e) => { setPostName(e.target.value) }} />
            <textarea className="form-control my-2" placeholder="Post body" rows="5"
              onChange={(e) => { setPostDescription(e.target.value) }}></textarea>
            <div className="my-3 text-right">
              <button onClick={handleCreatePost} type="button" className="btn btn-primary">Create</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePost;