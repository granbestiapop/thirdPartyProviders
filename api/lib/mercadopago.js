const MP = require ("mercadopago");
const mp = new MP(process.env.MERCADOPAGO_SECRET);

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
			// Enable this to get coupon
			//coupon_code: 'MPCLARO_10_TEST',
			//coupon_amount: 10,
			capture: true
		});

	return doPayment.then (
		function (payment) {
			console.log(payment);
		},
		function (error){
			console.log(error);
		});	
}

function authorizePay(paymentId){
	var doCapture = mp.put ("/v1/payments/PAYMENT_ID",
	{
		"transaction_amount": 75,
		"capture": true
	});

	return doCapture.then (
	function (payment) {
		console.log (payment);
		return payment
	},
	function (error){
		console.log (error);
		return error
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