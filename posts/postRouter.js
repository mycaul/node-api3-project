const express = require('express');
const router = express.Router();

const posts = require('./postDb');
const {validatePostId, validatePosts} = require('../middleware/middleware')

router.get('/', (req, res) => {
  posts.get()
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    console.log('error with get user:', error);
    res.status(404).json({errorMessage: `Oops, couldn't find what you were looking for.`})
  })
});

router.get('/:id', validatePostId, (req, res) => {
  const id = req.params.id;

  posts.getById(id)
  .then(post => {
    if(!post){
      res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
    } else {
      res.status(200).json(`Success!!! You found what I said...${post.text}`)
    }
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  const id = req.params.id;

  posts.remove(id)
  .then(post => {
    if(post > 0 && post){
      res.status(200).json(`Successfully removed ${post} post`)
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ errorMessage: "The post could not be removed." });
  })
});

router.put('/:id', validatePostId, validatePosts, (req, res) => {
  const id = req.params.id;
  const body = req.body;

  posts.update(id, body)
  .then(post => {
    res.status(200).json(`Success!!! The post has been updated!! See: '${body.text}' ...`)
  })
  .catch(error => {
    console.log(error);
    res.status(400).json({errorMessage: 'The post could not be modified.'})
  })
});



module.exports = router;