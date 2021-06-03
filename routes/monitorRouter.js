const router = require("express").Router();
const monitorController = require("../controllers/monitorController.js");
const authenticate = require("../middleware/authenticate.js");
const admin = require("../middleware/admin.js");
const monitor = require("../middleware/monitor.js");

//GET - Return all Users in the DB

router.get("/", admin, async (req, res) => {
  try {
    res.json(await monitorController.findAllMonitor());
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//POST - Creates a new user

router.post("/", async (req, res) => {
  try {
    const monitor = req.body;
    res.json(await monitorController.createMonitor(monitor));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// Find users by email
router.post("/email", admin, async (req, res) => {
  try {
    let email = req.body.email;
    res.json(await monitorController.findByEmailMonitor(email));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//Modify a user
router.put("/", monitor, async (req, res) => {
  try {
    const data = req.body;
    res.json(await monitorController.modifyMonitor(data));
  } catch (err) {
    return res.status(500).json({
      mensaje: err.message,
    });
  }
});


router.post('/addmessage', async (req, res) => {
  try{
      const data = req.body;
      res.json(await monitorController.addMessage(data));
  }catch (err){
      return res.status(500).json({
          message: err.message
      })
  }
}); 


module.exports = router;
