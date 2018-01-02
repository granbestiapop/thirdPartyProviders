import axios from 'axios'
const accessToken = process.env.MERCADOPAGO_SECRET
const publicKey = process.env.MERCADOPAGO_PUBLIC_KEY

const host = 'https://api.mercadolibre.com'
const path = `${host}/loyal/partners/benefits`

export default function (context) {
	const loyalToken = context.query.token
	const origin = context.query.origin === 'partner'
	
	if(origin){
		const path = loyalToken ? `/checkout?token=${loyalToken}` : '/checkout'
		return context.redirect(path)
	}

	if(loyalToken){
		const uri = `${path}?access_token=${accessToken}&loyal_token=${loyalToken}`
		console.log(uri)
		return axios.get(uri).then(response=>{
	  		console.log(response.data);
		  	context.loyal = response.data
		  	context.publicKey = publicKey
		}).catch(err=> console.log(err))
	}
}