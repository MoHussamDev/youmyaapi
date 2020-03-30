const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const UsersSchema = mongoose.Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, unique: true, lowercase: true, required: true},
    password: { type: String, required: true},
    gender: { type: String, lowercase: true, required: true},
    profile_image:{type:String},
    active:{type:Boolean,default:true},
    image: { type: String },
    profile:{
      birthday:{ type: Date},
      area:{ type: String},  
      height:{ type: Number},  
    },
    images:{type:Array},


});

UsersSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  });

  UsersSchema.methods.comparePassword = async function(password) {
    console.log('here')
  try{
   return await bcrypt.compareSync(password, this.password);
  }catch(err){
    throw new Error(error)
  }
  }
  

module.exports = mongoose.model('UsersModel', UsersSchema);

