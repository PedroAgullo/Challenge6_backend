const router = require('express').Router();
const userRouter = require('./routes/userRouter.js');
// const roomRouter = require('./routes/roomRouter.js');
const loginRouter = require('./routes/loginRouter.js');

router.use('/user', userRouter);
// router.use('/room', roomRouter);
router.use('/login', loginRouter);


module.exports = router;