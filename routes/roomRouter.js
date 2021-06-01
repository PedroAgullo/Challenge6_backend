const router = require('express').Router();
const roomController = require('../controllers/chatController');



//GET - Return all Chats in the DB

router.get('/', async (req, res) => {
    try {
        res.json(await chatController.findAllRooms())
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});


//POST - Creates a new chat room

router.post('/', async (req,res) => {
    try {
        const room = req.body;
        res.json(await chatController.createRoom(room));
    }catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

router.post('/join', async (req,res) => {
    try{
        const data = req.body;
        res.json(await chatController.joinRoom(data));
    }catch (err){
        return res.status(500).json({
            message: err.message
        })
    }

})

router.post('/leave', async (req, res) => {
    try{
        const data = req.body;
        res.json(await chatController.leaveRoom(data));
    }catch (err){
        return res.status(500).json({
            message: err.message
        })
    }
})

router.post('/addmessage', async (req, res) => {
    try{
        const data = req.body;
        res.json(await chatController.addMessage(data));
    }catch (err){
        return res.status(500).json({
            message: err.message
        })
    }
});

module.exports = router;