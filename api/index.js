const express = require('express')
const fs = require('fs')
var logger = require('pino')()

const app = express()

const MercadoPago = require('./lib/mercadopago')

/**
 * Steps:
 * - With card token, create a payment with refund in order to validate credit_card.
 * - If payment is successfull we can add customer to MercadoPago wallet using createCustomer method.
 * - When the user_id generated on previous step, add the card to the created user.
 * - Offline we can cron a job in order to use make payments.
 */
/**
 * @param  {Request} req
 * @param  {Response} res
 * @param {String} req.body.cardToken.id - card_token used by MercadoPago
 * @param {String} req.body.email - Email used to register user
 */
app.post('/token', async(req, res)=>{

	const token= req.body.cardToken.id
	const email = req.body.email
	logger.info('[api/index] body:', {token, email})

	// Create pay with refund
	const paymentData = {
		email,
		token,
		amount: 0.1,
	}

	// TODO: create pay and refund
	//const refundResponse = await MercadoPago.payWithRefund(paymentData)
	//logger.info(refundResponse)

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

	res.status(201).send({message:'User created'})
})

app.post('/payment', async(req, res)=>{
	const body = req.body

	res.status(200).send(body)
})

app.get('/ping', (req, res)=>{
	log(req.headers)
	res.status(200).send('pong')
})


module.exports = { path: '/api', handler: app }
