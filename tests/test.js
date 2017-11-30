var mercadoP = require('./lib/mercadopago')

/*
mercadoP.Pay().then(res=>{
	console.log(res)
})*/
const data = {
	payer:{
		email: 'test_payer_111111117@testuser.com'
	},
	token: '01560575e4a48eb0f44f950cfa6647ee'
}
mercadoP.Pay(data).then(res=>{
	console.log(res)
})