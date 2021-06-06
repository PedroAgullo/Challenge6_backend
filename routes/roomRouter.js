const router = require("express").Router();
const roomController = require("../controllers/roomController.js");
const authenticate = require("../middleware/authenticate.js");
const admin = require("../middleware/admin.js");
const monitor = require("../middleware/monitor.js");

//GET - Return all Rooms in the DB

router.get("/", admin, async (req, res) => {
  try {
    res.json(await roomController.findAllRooms());
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//GET - Find all Rooms Active

router.get("/active", async (req, res) => {
  try {
    res.json(await roomController.findAllRoomsActive());
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//GET - Find all Rooms NO Active

router.get("/noactive", admin, async (req, res) => {
  try {
    res.json(await roomController.findAllRoomsNoActive());
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//POST - Find All Activities

router.post("/activity", async (req, res) => {
  try {
    const room = req.body;
    res.json(await roomController.findAllRoomsActivity(room));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//POST - Creates a new room

router.post("/", monitor, async (req, res) => {
  try {
    const room = req.body;
    res.json(await roomController.createRoom(room));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//POST - Join members to the room

router.post("/join", authenticate, async (req, res) => {
  try {
    const data = req.body;
    res.json(await roomController.joinRoom(data));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//POST - Join coaches to the room

router.post("/join/coach", monitor, async (req, res) => {
  try {
    const data = req.body;
    res.json(await roomController.joinRoomCoach(data));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//POST - Leave members the room

router.post("/leave", authenticate, async (req, res) => {
  try {
    const data = req.body;
    res.json(await roomController.leaveRoom(data));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//POST - Leave coches the room

router.post("/leave/coach", monitor, async (req, res) => {
  try {
    const data = req.body;
    res.json(await roomController.leaveRoomCoach(data));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//DELETE - Delete rooms

router.delete("/", monitor, async (req, res) => {
  try {
    const id = req.body.id;
    res.json(await roomController.deleteRoom(id));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//PUT - Update Status Room Active true o false

router.put("/", monitor, async (req, res) => {
  try {
    const data = req.body;
    res.json(await roomController.updateStatusRoom(data));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
