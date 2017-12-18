import axios from 'axios'
const accessToken = process.env.MERCADOPAGO_SECRET
const host = 'https://api.mercadolibre.com'
const path = `${host}/loyal/partners/benefits`

export default function (context) {
	const loyalToken = context.query.token
	if(loyalToken){
		const uri = `${path}?access_token=${accessToken}&loyal_token=${loyalToken}`
		console.log(uri)
		return axios.get(uri).then(response=>{
	  		console.log(response.data);
		  	context.loyal = response.data
		}).catch(err=> console.log(err))
	}

}