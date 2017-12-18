const MP = require ("mercadopago");
const mp = new MP(process.env.MERCADOPAGO_SECRET);
const MERCADOPAGO_PUBLIC_KEY = process.env.MERCADOPAGO_PUBLIC_KEY

/**
 * @param {Object} data
 * @param {String} data.token - Card token
 * @param {String} data.email - email of payer
 * @param {String} data.
 */
function Pay(data){
	const body = {
		"transaction_amount": data.amount,
		"token": data.token,
		"description": "Title of what you are paying for",
		"installments": 1,
		"payment_method_id": "visa",
		"payer": {
			"email": data.email
		},

	}
	// has coupon
	if(data.couponCode && data.couponAmount){
		body.coupon_code = data.couponCode //'CLAROV20',
		body.coupon_amount = data.couponAmount //20,
	}
	if(data.customer_id){
		body.payer.id = data.customer_id
	}

	var doPayment = mp.post ("/v1/payments", body);

	return doPayment.then (
		function (payment) {
			console.log(payment);
			return payment
		},
		function (error){
			console.log(error);
		});	
}

function refund(paymentId){
	var refundCall = mp.post(`/v1/payments/${paymentId}/refunds`,{});

	return refundCall.then (
		function (payment) {
			console.log(payment);
		},
		function (error){
			console.log(error);
		});	
}

function payWithRefund(data){
	return Pay(data).then(response =>{
		console.log(response)
	})
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

function createCustomer(email){

	var request = mp.post("/v1/customers", {
		"email": email
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

function getCustomers(){
	const request = mp.get("/v1/customers/search");

	return request.then (
		function (data) {
			return data
		},
		function (error){
			console.log(error);
		});	
}

/**
 * @param  {Object} data
 * @param {String} data.card_id - User card_id
 * @return {[type]}
 */
function createToken(data){
	const request = mp.post(`/v1/card_tokens?pub_key=${MERCADOPAGO_PUBLIC_KEY}`, data);

	return request.then (
		function (data) {
			return data
		},
		function (error){
			console.log(error);
		});	
}

module.exports = {
	Pay: Pay,
	refund: refund,
	payWithRefund: payWithRefund,
	getPayment: GetPayment,
	createCustomer: createCustomer,
	getCustomer: getCustomer,
	getCustomers: getCustomers,
	addCardCustomer: addCardCustomer,
	createToken: createToken,
	MERCADOPAGO_PUBLIC_KEY: MERCADOPAGO_PUBLIC_KEY
}
