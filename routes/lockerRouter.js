const router = require("express").Router();
const loginController = require("../controllers/loginController.js");
const userController = require("../controllers/userController.js");
const monitorController = require("../controllers/monitorController.js");
const authenticate = require("../middleware/authenticate.js");
const admin = require("../middleware/admin.js");
const lockerController = require("../controllers/lockerController.js");

// GET Find all lockers.
router.get("/all", admin, async (req, res) => {
  try {
    res.json(await lockerController.findAllLocker());
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// GET Find all available lockers. Active
router.get("/active", authenticate, async (req, res) => {
  try {
    res.json(await lockerController.findLockerNoRent());
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// GET Find all locker rent. No Active
router.get("/inactive", admin, async (req, res) => {
  try {
    res.json(await lockerController.findLockersRent());
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// POST Add a New locker
router.post("/", admin, async (req, res) => {
  try {
    let body = req.body;
    res.json(await lockerController.createLocker(body));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// PUT Rent a locker
router.put("/", authenticate, async (req, res) => {
  try {
    let body = req.body;
    res.json(await lockerController.rentLocker(body));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//PUT - Update Status Loocker Active true o false

router.put("/status", admin, async (req, res) => {
  try {
    const data = req.body;
    res.json(await lockerController.updateStatusLocker(data));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
module.exports = router;
