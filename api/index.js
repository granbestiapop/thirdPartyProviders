const express = require('express')
const fs = require('fs')
var logger = require('pino')()

const app = express()

const MercadoPago = require('./lib/mercadopago')


app.post('/token', async(req, res)=>{

	const userId = req.body.userId
	const token= req.body.cardToken.id
	const email = req.body.email
	logger.info('[api/index] body:', {user_id: userId, token:token, email:email})

	// traer el usuario de la api de loyalty con el token (data.userId)
	// devuelve JSON {discount, email, }
	// TODO
	//const user = loyalApi.getUserByToken(token)

	// asocia a mercadopago el user con el email de respuesta
	try{
		const data = await MercadoPago.createCustomer(email)
		const {response, status} = data
		logger.info('[api/index] createCustomer response:', response)

		// asocia tarjeta usuario
		if(response){
			const addCardResponse = await MercadoPago.addCardCustomer(response.id, token)
			logger.info('[api/index] addCardResponse', addCardResponse)	
		}

	}catch(error){
		// catch await exceptions, user could exists
		logger.error('[api/index]', error)	
	}


	//TODO: Realizar pago con 0 amount

	res.status(201).send({message:'User created'})
})

app.get('/ping', (req, res)=>{
	log(req.headers)
	res.status(200).send('pong')
})


module.exports = { path: '/api', handler: app }
