const User = require('../models/Users');


const helpers = {
    getUserById : function(id,cb){
        User.findById(id,cb);
        
        }



}

module.exports = helpers
// module.exports.getUserByEmail = function(email,cb){

//     User.findOne({email:email},cb);
    
// module.exports.getUserByEmail = function(email,cb){

//     User.findOne({email:email},cb);
    
//     }
// module.exports.getUserByEmail = function(email,cb){

//     User.findOne({email:email},cb);
    
//     }