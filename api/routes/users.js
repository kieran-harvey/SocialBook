const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// router.get("/",(req,res)=>{
//     res.send('Hey, its user route')
// })

//update user
router.put("/:id",async (req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            });
            res.status(200).json('Account updated');
        }catch(err){
            return res.status(500).json('No user found');
        }
    }else{
        return res.status(403).json('You can only update your account');
    }
})

//delete user

router.delete("/:id",async (req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Account deleted');
        }catch(err){
            return res.status(500).json('No user found');
        }
    }else{
        return res.status(403).json('You can only delete your account');
    }
})


//get a user

router.get('/', async(req,res) =>{
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId ? await User.findById(userId) 
        : await User.findOne({username:username})
        const {password,updateAt, ...other} = user._doc
        res.status(200).json(other);
    }catch(err){
        return res.status(500).json(err);
    }
})

//get users from filter

router.get('/filter', async(req,res) =>{
    const filterValue = req.params.value;
    // const query = { "username" + filterValue};
    try{
        const users = await User.find({username:filterValue});
        res.status(200).json(users);
    }catch(err){
        return res.status(500).json(err);
    }
})

//get friends

router.get('/friends/:userId', async (req,res) =>{
    try{
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map(friendId =>{
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map(friend => {
            const {_id,username,profilePicture} = friend;
            friendList.push({_id,username,profilePicture});
        })
        res.status(200).json(friendList);
    }catch(err){
        res.status(500).json(err)
        console.log(err);
    }
})

//follow a user

router.put('/:id/follow', async (req,res)=>{
   if(req.body.userId !== req.params.id){
    try{
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId)
        if(!user.followers.includes(req.body.userId)){
            await user.updateOne({$push:{followers:req.body.userId}});
            await currentUser.updateOne({$push:{following:req.params.id}});
            res.status(200).json('User has been followed');
        }else{
            res.status(403).json("You already follow this person")
        }
    }catch(err){
        res.status(500).json(err)
    }
   }else{
       res.status(403).json('You cant follow yourself');
   } 
})

//unfollow a user
router.put('/:id/unfollow', async (req,res)=>{
    if(req.body.userId !== req.params.id){
     try{
         const user = await User.findById(req.params.id);
         const currentUser = await User.findById(req.body.userId)
         if(user.followers.includes(req.body.userId)){
             await user.updateOne({$pull:{followers:req.body.userId}});
             await currentUser.updateOne({$pull:{following:req.params.id}});
             res.status(200).json('User has been unfollowed');
         }else{
             res.status(403).json("You dont follow this person")
         }
     }catch(err){
         res.status(500).json(err)
     }
    }else{
        res.status(403).json('You cant unfollow yourself');
    } 
 })


module.exports = router;