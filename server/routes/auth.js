const express = require('express');
const router = express.Router();

const {
  signup,
  signin,
  signout,
  //   requireSignin,
} = require('../controllers/auth');
const { userValidationRules, validate } = require('../validator');

router.post('/signup', userValidationRules(), validate, signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;
