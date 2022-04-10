const express = require('express');
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(cors());
const { dbUrl, MongoClient } = require('./dbConfig');

let postId = 0;

app.post('/api/login', async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('test');
    const user = await db.collection('users').findOne({
      username: req.body.username,
      password: req.body.password
    });

    if (user) {
      const accessToken = jwt.sign(
        { username: user.username, id: user.id, name: user.name },
        'mySecretKey',
        { expiresIn: "30m" });
      res.status(200).json({
        id: user.id,
        token: accessToken
      });
    } else {
      res.status(401).json("Username and/or Password is invalid");
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.close();
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

app.post('/api/create-post', verify, async (req, res) => {
  postId++;
  const post = {
    id: postId,
    postName: req.body.postName,
    postDescription: req.body.postDescription,
    owner: req.user.id
  }

  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('test');
    const posts = await db.collection('posts').insertOne(post);
    res.status(200).json("Post created");
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.close();
  }
});

app.get('/api/all-posts', verify, async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('test');
    const posts = await db.collection('posts').find().toArray();
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.close();
  }
});

app.get('/api/my-posts', verify, async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('test');
    const posts = await db.collection('posts').find({
      owner: req.user.id
    }).toArray();
    res.status(200).json({
      name: req.user.name,
      data: posts
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.close();
  }
});

app.delete('/api/delete-post/:postId', verify, async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('test');
    await db.collection('posts').deleteOne({
      id: parseInt(req.params.postId)
    });
    res.status(200).json("Post deleted");
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.close();
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on 5000.");
})