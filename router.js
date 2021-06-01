const router = require('express').Router();
const userRouter = require('./routes/userRouter.js');
// const roomRouter = require('./routes/roomRouter.js');

router.use('/user', userRouter);
// router.use('/room', roomRouter);

module.exports = router;