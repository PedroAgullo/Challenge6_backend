const router = require('express').Router();
const loginController = require('../controllers/loginController.js');
const userController = require('../controllers/userController.js');
const monitorController = require('../controllers/monitorController.js');


router.post('/', async (req, res)=> {
    try {

        const emailCheck = req.body.email;
        const passwordCheck= req.body.password;
        let token = await loginController.validateUser(emailCheck,passwordCheck);
        let user = await userController.findByEmail(emailCheck);
        res.status(200).json({token, user});
        
    }catch (err) {
        return res.status(500).json({
            message: err.message
        }); 
    } 
})


router.post('/monitor', async (req, res)=> {
    try {

        const emailCheck = req.body.email;
        const passwordCheck= req.body.password;
        let token = await loginController.validateMonitor(emailCheck,passwordCheck);
        let user = await monitorController.findByEmail(emailCheck);
        res.status(200).json({token, user});
        
    }catch (err) {
        return res.status(500).json({
            message: err.message
        }); 
    } 
})

module.exports = router;