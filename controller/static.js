var express = require('express')
var router = express.Router()

router.use(express.static(__dirname+'/../asset'))
router.use(express.static(__dirname+'/../template'))
router.get('/', function (req, res) {
	res.sendfile('layouts/app.html');
})

module.exports = router