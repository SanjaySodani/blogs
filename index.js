const express = require('express');
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(cors());

let posts = [
  {
    id: 1,
    postName: 'Python is Best',
    postDescription: "I don't know, I heared it from many people. So Python is best.",
    owner: 1
  }, 
  {
    id: 2,
    postName: 'JavaScript is better than Python',
    postDescription: 'I have coded in Python and JavaScript both. Both languages are good. Do not compare please!',
    owner: 2
  }, 
  {
    id: 3,
    postName: 'Things you can do with Python',
    postDescription: 'Web development, Data Science, Machine Learning and Image processing.',
    owner: 1
  }
];

let postId = 3;

let users = [{
  id: 1,
  name: 'Sanjay Sodani',
  username: 'sanjay',
  password: 'sanjay123'
}, {
  id: 2,
  name: 'Poonam Sodani',
  username: 'poonam',
  password: 'poonam123'
}, {
  id: 3,
  name: 'Sanju Sodani',
  username: 's',
  password: 's'
}];

app.post('/api/login', (req, res) => {
  const user = users.find(u => {
    return u.username === req.body.username && u.password === req.body.password;
  });

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, id: user.id, name: user.name }, 
      'mySecretKey', 
      { expiresIn: "20m" });
    res.status(200).json({
      id: user.id,
      token: accessToken
    });
  } else {
    res.status(401).json("Username and/or Password is invalid");
  }
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, 'mySecretKey', (err, user) => {
      if (err) {
        res.status(401).json("Token is not valid!");
      } else {
        req.user = user;
        next();
      }
    })
  } else {
    res.status(403).json("You are not authenticated!");
  }
}

app.get('/api/authenticated', verify, (req, res) => {
  res.status(200).json("Authenticated");
});

app.post('/api/create-post', verify,(req, res) => {
  postId++;
  const post = {
    id: postId,
    postName: req.body.postName,
    postDescription: req.body.postDescription,
    owner: req.user.id
  }
  posts.push(post);
  console.log(posts);
  res.status(200).json("Post created");
});

app.get('/api/all-posts', verify, (req, res) => {
  res.status(200).json({data: posts});
});

app.get('/api/my-posts', verify, (req, res) => {
  const myPosts = posts.filter((item) => {
    return item.owner == req.user.id
  });
  res.status(200).json({
    name: req.user.name,
    data: myPosts
  });
});

app.delete('/api/delete-post/:postId', verify, (req, res) => {
  for (let i=0; i<posts.length; i++) {
    if (posts[i].id == req.params.postId) {
      posts.splice(i, 1);
      break;
    }
  }
  console.log(posts);
  res.status(200).json("Post deleted");
});

app.listen(5000, () => {
  console.log("Server running on 5000");
})