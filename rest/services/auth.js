const User = require('../models/Users');
const activateAccountEmail = require('../helpers/sendEmail')
const _ = require('lodash');
const {signToken} = require('../helpers/jwt');
const authService ={
    signUp : async (req,res)=>{
        const email = req.body.email
        console.log(email)
        const checkEmail = await User.findOne( _.pick(req.body,['email']));
        if(checkEmail){
            return res.status(403).send({error:true, no:2, message:'Email is Already Taken'});
        }

        const user = new User( _.pick(req.body,['firstname','lastname','email','gender','password']))
      try{
          const result = await user.save()
          const token = signToken(result.id)
          await activateAccountEmail(token,email, res);
          res.status(200).json({error:false, no:null, message:'Account Successfully Created' , token})
        }catch(err){
            res.status(200).json({error:true, no:null, message:'error In Creating Account' , token:''})
            
        }
 
 
    },
    login: async (req,res)=>{
        const email = req.body.email;
        const password = req.body.password; 
        const getUser = await User.findOne({email: email })
        if(!getUser) {
            return res.status(200).json({er:true, no:5, message:'Wrong email or Mobile Number ',token:'' })
        }
        const isMatch = await getUser.comparePassword(password);
        if(!isMatch){
            return res.status(200).json({er:true, no:6, message:'Wrong Password' ,token:''}) 
        }
    
        const token = signToken(getUser.id);
        res.status(200).json({er:false, no:null, message:'Successfully Login ',token })
    }
    
    
}

module.exports = authService