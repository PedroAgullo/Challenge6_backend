const router = require("express").Router();
const userController = require("../controllers/userController.js");
const authenticate = require("../middleware/authenticate.js");
const admin = require("../middleware/admin.js");
const userCheckMail = require('../middleware/userCheckMail');

//GET - Return all Users in the DB

router.get("/", admin, async (req, res) => {
  try {
    res.json(await userController.findAllUsers());
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//Encuentra un grupo de usuarios dados en un array
router.post("/group", admin, async (req, res) => {
  try {
    console.log("Lo que llega al backend: ",req.body)
    res.json(await userController.findUserGroup(req.body));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//POST - Creates a new user

router.post("/", async (req, res) => {
  try {    
    const user = req.body;
    res.json(await userController.createUser(user));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});



// POST Find users by email

router.post("/email", admin, async (req, res) => {
  try {
    let email = req.body.email;
    res.json(await userController.findByEmail(email));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// PUT Modify a user

router.put("/", authenticate, async (req, res) => {
  try {
    const data = req.body;
    console.log("Datos que llegan del body", req.body)

    res.json(await userController.modifyUser(data));

  } catch (err) {
    return res.status(500).json({
      mensaje: err.message,
    });
  }
});



//Modify user by admin
router.post("/update", admin, async (req, res) => {
  try {
    const data = req.body;
    console.log("Datos que llegan del body", req.body)

    res.json(await userController.modifyUserByAdmin(data));

  } catch (err) {
    return res.status(500).json({
      mensaje: err.message,
    });
  }
});




// PUT Modify status payment a user

router.post("/payment", authenticate, async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);
    res.json(await userController.updateSuscription(data));
  } catch (err) {
    return res.status(500).json({
      mensaje: err.message,
    });
  }
});


// Mail confirmation
router.get("/confirm/:confirmationCode", async (req, res) => {
  try {
    token = req.params.confirmationCode;
    res.json(await userController.updateActive(token));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;

