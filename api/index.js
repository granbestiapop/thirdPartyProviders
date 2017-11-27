const express = require('express')
const cors = require('cors')
const app = express()

const MercadoPago = require('../lib/mercadopago')


app.post('/token', async(req, res, next)=>{
	console.log(req.body)
	const userId = req.body.userId
	const token= req.body.cardToken.id
	console.log(userId, token)

	// traer el usuario de la api de loyalty con el token (data.userId)
	// devuelve JSON {discount, email, }
	// TODO

	// asocia a mercadopago el user con el email de respuesta
	const data = await MercadoPago.createCustomer(userId)
	const {response, status} = data
	console.log(response)

	// asocia tarjeta usuario
	const addCardResponse = await MercadoPago.addCardCustomer(response.id, token)
	console.log(addCardResponse)

	res.status(201).send({status:201, message:"New user created"})
	return next()
})

app.get('/discount', (req, res, next)=>{
	res.status(200).send({code: 'claro_20'})
	return next()
})

module.exports = { path: '/api', handler: app }
