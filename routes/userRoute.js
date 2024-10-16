const router = require('express').Router();
const { signUp, 
        logIn,
        
       } = require('../controllers/userController');
const { validateUserSignUp, 
        validateUser, 
      } = require('../middlewares/validate');

router.post("/register", validateUserSignUp, signUp);
router.post("/login", validateUser, logIn);

module.exports = router;

