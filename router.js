const router = require('express').Router();
const userRouter = require('./routes/userRouter.js');
const roomRouter = require('./routes/roomRouter.js');
const loginRouter = require('./routes/loginRouter.js');
const monitorRouter = require('./routes/monitorRouter.js');
const lockerRouter = require('./routes/lockerRouter.js');

router.use('/user', userRouter);
router.use('/room', roomRouter);
router.use('/login', loginRouter);
router.use('/monitor', monitorRouter);
router.use('/locker', lockerRouter);


module.exports = router;