const router = require('express').Router();
const userController = require('../controllers/userController.js');



//GET - Return all Users in the DB

router.get('/', async (req, res) => {
    try {
        res.json(await userController.findAllUsers())
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});


//POST - Creates a new user

router.post('/', async (req,res) => {
    try {
        const user = req.body;
        console.log(user);
        res.json(await userController.createUser(user))
    }catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})


// Find users by email
router.get("/email/:email", async (req, res) => {
    try {
      let email = req.params.email;
      res.json(await usersController.findByEmail(email));
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });


module.exports = router;