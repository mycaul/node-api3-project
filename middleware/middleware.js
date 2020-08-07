const users = require('../users/userDb');
const posts = require('../posts/postDb');

exports.logger = (req, res, next) => {
    const method = req.method;
    const endpoint = req.originalUrl;
    const base = req.baseUrl ? `from ${req.baseUrl}` : "";
    
    console.log(`${method} to ${endpoint} ${base} at ${new Date().toISOString()}`);
    next();
}

exports.validateUserId = async (req, res, next) => {
    const id = req.params.id;
    const user = await users.getById(id);
    if (!user){
        res.status(400).json({ errorMessage: "Invalid user ID" })
    } else {
        req.user = user;
    }
    next();
}

exports.validateUser = (req, res, next) => {
    const body = req.body;

    if (Object.entries(body).length === 0) {
      res.status(400).json({ errorMessage: `Missing user data.`})
    } else if (!body.name) {
      res.status(400).json({ errorMessage: `Missing required name field.`})
    }
    next();
    }
  

exports.validatePosts = (req, res, next) => {
    const post = req.body;

    if(Object.entries(post).length === 0){
        res.status(400).json({ errorMessage: "Missing post data." })
    } else if(!post.text){
        res.status(400).json({ errorMessage: "Missing required text field." })
    }

    next();
}

exports.validatePostId = (req, res, next) => {
    const id = req.params.id;
    posts.getById(id)
    .then (post => { 
        if(!post){
        res.status(400).json({ errorMessage: "Invalid post ID" })
    } else {
        req.post = post;
    }})
   
    next();
}

exports.notFound = (req, res, next) => {
    res.status(404).json({errorMessage: "Oops, we didn't find what you're looking for!"})
}