const express = require('express')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const app = express()

const MercadoPago = require('./lib/mercadopago')


app.post('/token', async(req, res)=>{
	console.log(req.body)
	const userId = req.body.userId
	const token= req.body.cardToken.id
	const email = req.body.email
	console.log(userId, token, email)

	// traer el usuario de la api de loyalty con el token (data.userId)
	// devuelve JSON {discount, email, }
	// TODO
	//const user = loyalApi.getUserByToken(token)

	// asocia a mercadopago el user con el email de respuesta
	const data = await MercadoPago.createCustomer(email)
	const {response, status} = data
	console.log(response)

	//Realizar pago con 0 amount

	// asocia tarjeta usuario
	const addCardResponse = await MercadoPago.addCardCustomer(response.id, token)
	console.log(addCardResponse)

	res.status(201).send({status:201, message:{user: response}})
})

app.get('/discount', (req, res)=>{
	res.status(200).send({code: 'claro_20'})
})

app.get('/ping', (req, res)=>{
	console.log(req.headers)
	res.status(200).send('pong')
})


module.exports = { path: '/api', handler: app }
