var router=require('express').Router()
var User=require('../../models/users')
var bcrypt=require('bcrypt')
var jwt=require('jwt-simple')
var config=require('../../config')

router.post('/', function(req, res, next) {
	var user = new User({username: req.body.username})
	bcrypt.hash(req.body.password, 10, function(err, hash){
		user.password = hash
		user.save(function (err){
			if(err) {throw next(err)}
				res.send(201)
		})
	})
})

router.get('/',function(req,res) {
	if(!req.headers['x-auth']) {
		return res.send(401)
	}

	var auth=jwt.decode(req.headers['x-auth'], config.secret)
	User.findOne({username: auth.username}, function(err, user){
	if(err) {return next(err)}
	res.json(user)	
	})
	
})

module.exports = router