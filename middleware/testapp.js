import axios from 'axios'
const accessToken = process.env.MERCADOPAGO_SECRET
const host = 'https://mercadopago-loyal.herokuapp.com'

export default function (context) {
	const uri = `${host}/api/customers`
	return axios.get(uri).then(response=>{
	  	context.user = response.data.response.results[0]
	  	const cardId = context.user.cards[0].id
	  	console.log(cardId)
	  	return axios.post(`${host}/api/card_tokens`, {card_id: cardId}).then(response =>{
	  		console.log(response.data)
	  		context.token = response.data.response.id
	  	})
	}).catch(err=> console.log(err))	
}