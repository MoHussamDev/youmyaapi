// users controller routes
var express = require('express');
var router = express.Router();
const authService = require('../services/auth');
const {validationBody, schemas} = require('../helpers/validators');
const passport = require('passport');

// get /api/users/
router.get('/',(req,res) => {
  res.send('GET response');
});

// Register New User
router.post('/', validationBody(schemas.registerSchema),authService.signUp);

// Login
router.post('/login', validationBody(schemas.loginSchema),authService.login);
router.post('/resetpassword', validationBody(schemas.loginSchema),authService.login);




// put /api/users/
router.get('/protect',passport.authenticate('jwt', {session: false}) ,(req,res) => {
  res.send('PUT response');
});

// delete /api/users/
router.delete('/',(req,res) => {
  res.send('DELETE response');
});

module.exports = router;