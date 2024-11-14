const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// register
exports.registerController = async (req, res)=>{
    console.log("Inside register controller");
    const {FirstName, LastName, EmailAddress, Password, PhoneNumber} = req.body
    console.log(req.body);
    try{
      const existingUser = await users.findOne({EmailAddress})
      if(existingUser){
         res.status(406).json("Already existing user....Please Login!!!")
      }else{
         const saltRounds = 10;
         const hashedPassword = await bcrypt.hash(Password, saltRounds);
         const newUser = new users({FirstName, LastName, EmailAddress, Password: hashedPassword, PhoneNumber})
         await newUser.save()
         res.status(200).json(newUser)
      }
    }catch(err){
        res.status(401).json(err)
    }  
}


// login
exports.loginController = async (req, res) => {
    console.log("Inside loginControllewr");
    const {EmailAddress, Password} = req.body
    console.log(EmailAddress, Password);
    try{
      const existingUser = await users.findOne({EmailAddress})
      if(existingUser){
        const isPasswordCorrect = await bcrypt.compare(Password, existingUser.Password);
        //token generation
        if (isPasswordCorrect){
        const token = jwt.sign({userId:existingUser._id}, process.env.JWTPASSWORD)
        res.status(200).json({user:existingUser, token });
        }else{
            res.status(401).json('Incorrect Email/Password!!!');
        }
      }else{
        res.status(404).json('User not found');
      }
    }catch(err){
       res.status(401).json(err)
    } 
}

//all registered users - need for authorisation
exports.allRegisteredUsersController = async (req, res) => {
    console.log("Inside allRegisteredUersController");
    
    try{
        const allRegisteredUsers = await users.find()
        res.status(200).json(allRegisteredUsers.map(user=>({FirstName: user.FirstName, EmailAddress: user.EmailAddress})))
    }catch(err){
        res.status(401).json(err)
    }
}

//userDetails - need for authorization
exports.userDetailsController = async (req, res)=>{
    console.log("Inside userDetailsController");
    const {id} = req.params
    try{
      const userDetails = await users.findById({_id:id})
      if (!userDetails) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { Password, ...userWithoutPassword } = userDetails.toObject();

    res.status(200).json(userWithoutPassword);
    }catch(err){
        console.error(err);
        res.status(401).json(err)
    }
}