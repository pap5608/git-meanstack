var express=require('express')
var request = require('supertest')
var router = require('../../../controller')

var app=express()
app.use(router)

module.exports = request(app)