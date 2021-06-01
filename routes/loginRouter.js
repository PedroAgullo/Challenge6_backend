const router = require('express').Router();
const loginController = require('../controllers/loginController.js');
const userController = require('../controllers/userController.js');


router.post('/', async (req, res)=> {
    try {

        const emailCheck = req.body.email;
        const passwordCheck= req.body.password;
        console.log(passwordCheck, "<<<=== PasswordCheck");        
        let token = await loginController.validate(emailCheck,passwordCheck);
        console.log(token, "<<<<<====Token");
        let user = await userController.findByEmail(emailCheck);
        res.status(200).json({token, user});
        
    }catch (err) {
        return res.status(500).json({
            message: err.message
        }); 
    } 
})

module.exports = router;