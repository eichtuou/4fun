var express = require('express');
var router = express.Router();

/* HOME page */
router.get('/', function (req, res) {
    res.render('index', { title: 'Snake Game' });
});

module.exports = router;

