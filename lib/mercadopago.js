const MP = require ("mercadopago");
var mp = new MP(process.env.MERCADOPAGO_SECRET);

console.log(process.env.MERCADOPAGO_SECRET)
function Pay(data){
	var doPayment = mp.post ("/v1/payments",
		{
			"transaction_amount": 100,
			"token": data.token,
			"description": "Title of what you are paying for",
			"installments": 1,
			"payment_method_id": "visa",
			"payer": {
				"email": data.payer.email
			},
			coupon_code: 25907, //'MPCLARO_10_TEST',
			coupon_amount: 10
		});

	return doPayment.then (
		function (payment) {
			console.log(payment);
		},
		function (error){
			console.log(error);
		});	
}

function GetPayment(id){
	var getPayment = mp.get("/v1/payments/"+id);

	return getPayment.then (
		function (payment) {
			console.log(payment);
		},
		function (error){
			console.log(error);
		});	
}

function createCustomer(userId){

	var request = mp.post("/v1/customers", {
		"email": `test_payer_${userId}@testuser.com`
	});

	return request.then (
		function (data) {
			return data
		},
		function (error){
			console.log(error);
			return error
		});	
}

function addCardCustomer(customerId, token){

	var request = mp.post(`/v1/customers/${customerId}/cards`, {
		token: token
	});

	return request.then (
		function (data) {
			return data
		},
		function (error){
			console.log(error);
			return error
		});	
}

function getCustomer(id){

	var request = mp.get("/v1/customers/"+id);

	return request.then (
		function (data) {
			console.log(data);
		},
		function (error){
			console.log(error);
		});	
}

module.exports = {
	Pay: Pay,
	getPayment: GetPayment,
	createCustomer: createCustomer,
	getCustomer: getCustomer,
	addCardCustomer: addCardCustomer
}


//Pay()