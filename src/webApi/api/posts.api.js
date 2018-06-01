const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const replaceId = require('./helpers').replaceId;
const error = require('./helpers').sendErrorResponse;

// GET all posts  
router.get('/', function (req, res) {
    const db = req.app.locals.db;
    db.collection('posts').find().toArray(
        function (err, docs) {
            if (err) throw err;
            res.json(docs.map((post) => {
                post.id = post._id;
                delete (post._id);
                return post;
            }));
        }
    );
});

// GET posts list 
router.get('/:postId', function (req, res) {
    const db = req.app.locals.db;
    const params = req.params;
    db.collection('posts', function (err, all_posts) {
        if (err) throw err;
        all_posts.findOne({ _id: new mongodb.ObjectID(params.postId) },
            (err, post) => {
                if (err) throw err;
                if (post === null) {
                    error(req, res, 404, `Post with Id=${params.postId} not found.`, err);
                } else {
                    replaceId(post);
                    res.json(post);
                }
            });
    });
});

// Create new post
router.post('/', function (req, res) {
    const db = req.app.locals.db;
    const post = req.body;
    const collection = db.collection('posts');
    console.log('Inserting post:', post);
    collection.insertOne(post).then((result) => {
        if (result.result.ok && result.insertedCount === 1) {
            replaceId(post);
            const uri = req.baseUrl + '/' + post.id;
            console.log('Created Post: ', post);
            res.location(uri).status(201).json(post);
        } else {
            error(req, res, 400, `Error creating new post: ${post}`);
        }
    }).catch((err) => {
        error(req, res, 500, `Server error: ${err}`, err);
    })
});

// PUT (edit) post by id 
router.put('/:postId', function (req, res) {
    const db = req.app.locals.db;
    const post = req.body;
    if (post.id !== req.params.postId) {
        error(req, res, 400, `Invalid post data - id in url doesn't match: ${post}`);
        return;
    }
    const collection = db.collection('posts');
    post._id = new mongodb.ObjectID(post.id);
    delete (post.id);
    console.log('Updating post:', post);
    collection.updateOne({ _id: new mongodb.ObjectID(post._id) }, { "$set": post })
        .then(result => {
            const resultUser = replaceId(post);
            if (result.result.ok && result.modifiedCount === 1) {
                res.json(resultUser);
            } else {
                error(req, res, 400, `Data was NOT modified in database: ${JSON.stringify(post)}`);
            }
        }).catch((err) => {
            error(req, res, 500, `Server error: ${err}`, err);
        });
});

// DELETE posts list 
router.delete('/:postId', function (req, res) {
    const db = req.app.locals.db;
    const params = req.params;
    db.collection('posts', function (err, all_posts) {
        if (err) throw err;
        all_posts.findOneAndDelete({ _id: new mongodb.ObjectID(params.postId) },
            (err, result) => {
                if (err) throw err;
                if (result.ok) {
                    replaceId(result.value);
                    res.json(result.value);
                } else {
                    error(req, res, 404, `User with Id=${params.postId} not found.`, err);
                }
            });
    });
});


module.exports = router;