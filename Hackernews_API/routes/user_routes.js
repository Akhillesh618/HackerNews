

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user_schema");

router.post('/signup',async(req, res) => {
        const user = new User(req.body);
        console.log(user);
        try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token })   
        // shorthand syntax to define both properties.(user:user, token:token)
        //res.send(user);
        }
        catch(err){
        res.send(err);
    }
});


router.post('/login', async (req,res) =>{ //login
    try{
    // Creating a separate function to match the user's credentials(from the whole User collection)
    const user = await User.findByCredentials(req.body.email, req.body.password)
    console.log(user);
    // we're trying to generate a token for a very specific user.
    const token = await user.generateAuthToken();
    console.log(token);
    res.send({user: user, token: token});
    } catch(e){
    res.status(400).send()
    }
});

router.get('/users', async(req, res) => {
    try{
        const user = await User.find({});
        console.log(user);
        res.send(user);
    }catch(err)
    {
        res.send("No Users Found");
    }
});


router.delete('/delete/:id', async(req, res) => {
    try{
        const user = await User.findOneAndRemove({_id:req.params.id});
        res.send(user);
    }
    catch(err)
    {
        res.send(err);
    }
});


router.patch('/update/:id', async(req, res) => {
    try{
        const user =  await User.findOneAndUpdate({_id:req.params.id},req.body);
        const updated = await User.findById({_id:req.params.id});
        res.send(updated);    
    }
    catch(err)
    {
        res.send(err);
    }
});

module.exports = router;