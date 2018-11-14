const db=require("../models/index.js");

module.exports=function(app){

    // GET - get users
    app.get('/api/users',function(req,res){
        db.Users.find({})
        .then(function(data){
            res.send(data);
        });
    });
    // POST - create new user
    app.post('/api/users',function(req,res){
        db.Users.create(req.body)
        .then(function(response){
            res.json(response);
        }).catch(function(err){
            res.json(err);
        });
    });
    // GET - get current posts
    app.get('/api/posts',function(req,res){
        db.Compliments.find({})
        .then(function(response){
            res.json(response);
        }).catch(function(err){
            res.json(err);
        });
    });
    // POST - create new compliment post
    app.post('/api/posts',function(req,res){
        db.Compliments.create(req.body)
        .then(function(response){
            res.json(response);
        }).catch(function(err){
            res.json(err);
        });
    });
}