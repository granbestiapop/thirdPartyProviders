const express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())


app.post('/token', (req, res, next)=>{
	console.log(req.body)
	res.status(200).send({status:200, message:'Card token successful'})
	return next()
})