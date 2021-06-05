const router = require('express').Router();
const loginController = require('../controllers/loginController.js');
const userController = require('../controllers/userController.js');
const monitorController = require('../controllers/monitorController.js');
const authenticate = require('../middleware/authenticate.js');
const admin = require('../middleware/admin.js');
const lockerController = require('../controllers/lockerController.js');

//Find all lockers.
router.get("/all", async (req, res) => {
    try {
      res.json(await lockerController.findAllLocker());
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });
  
  //Find all available lockers
  router.get("/", async (req, res) => {
    try {
      res.json(await lockerController.findLockerNoRent());
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });

  //Find all locker rent.
  router.get("/", async (req, res) => {
    try {
      res.json(await lockerController.findLockersRent());
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });

  //Add a New locker
  router.post("/", async (req, res) => {
    try {
      let body = req.body;
      res.json(await lockerController.createLocker(body));
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });

  //Rent a locker
  router.put("/", async (req, res) => {
    try {
      let body = req.body;
      res.json(await lockerController.rentLocker(body));
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });
module.exports = router;