const router = require('express').Router();
const controller = require('./controller');

router.use('/api/healthz', (req, res) => {
    res.status(200).send("I'm fine.");
});

router.post('/api/upload', controller.uploadFile);

router.get('/api/download/:fileName', controller.downloadFile);


module.exports = router;
