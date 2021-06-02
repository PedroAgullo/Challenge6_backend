const router = require('express').Router();
const roomController = require('../controllers/roomController.js');



//GET - Return all Rooms in the DB

router.get('/', async (req, res) => {
    try {
        res.json(await roomController.findAllRooms())
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});


//POST - Creates a new room

router.post('/', async (req,res) => {
    try {
        const room = req.body;
        res.json(await roomController.createRoom(room));
    }catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

//POST - Join members to the room

router.post('/join', async (req,res) => {
    try{
        const data = req.body;
        res.json(await roomController.joinRoom(data));
    }catch (err){
        return res.status(500).json({
            message: err.message
        })
    }

})

router.post('/leave', async (req, res) => {
    try{
        const data = req.body;
        res.json(await roomController.leaveRoom(data));
    }catch (err){
        return res.status(500).json({
            message: err.message
        })
    }
})

router.post('/addmessage', async (req, res) => {
    try{
        const data = req.body;
        res.json(await roomController.addMessage(data));
    }catch (err){
        return res.status(500).json({
            message: err.message
        })
    }
});

module.exports = router;