var express = require('express');
var router = express.Router();
const User = require("../models/user");
const Todo = require("../models/todo");

router.use(express.json());

router.post("/register", async function(req,res){
    try {
        const user = new User(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (error) {
        res.status(400).send(error);
        comsole.log(error);
    }
});

router.post("/login", async function(req,res){
    try {
        const user = await User.findOne({username: req.body.username});
        let response;
        if(user===null){
            response = {message: "User Not Found"};
            res.status(200).send(response);
        }
        else if(user.password !==req.body.password){
            response = {message: "Password Incorrect"};
            res.status(200).send(response);
        }
        else{
            response = {username: req.body.username ,message:"Login Succesfull"};
            res.status(200).send(response);
        }
        
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/todo", async function(req,res){
    try {
        const todo = new Todo(req.body);
        const createUser = await todo.save();
        res.status(201).send(createUser);
    } catch (error) {
        res.status(400).send(error);
        comsole.log(error);
    }
});

router.get("/:user", async function(req,res){
    // console.log(req.params.user);
    try{
        const todos = await Todo.find({username: req.params.user});
        // console.log(todos);
        let response;
        if(todos.length===0){
            response = {message: "User Not Found"};
            res.status(200).send(response);
        }
        else{
            response = {message: "User Found" , todos : todos};
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(400).send(error);
        comsole.log(error);
    }
});




module.exports = router;