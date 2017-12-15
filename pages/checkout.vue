
<template>

<v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
        <div class="text-xs-center">
            <img src="../assets/img/JimmyStreamingLogo.png" alt="Vuetify.js" class="mb-5" />
        </div>
        <div class="text-xs-center">¡Tienes {{loyal.products[0].discount}}% de descuento en la suscripción gracias a MercadoLibre!</div>

         <v-card class="transparent-background">
          <form action="" method="post" id="pay" name="pay" v-on:submit.prevent="payNow" class="mb-5">
            <v-text-field label="E-mail" v-model="data.email"  name="email" id="email" required></v-text-field>
            <v-text-field label="Card number" v-model="cardInfo.number"  data-checkout="cardNumber" id="cardNumber" required></v-text-field>
            <v-text-field label="CVV" v-model="cardInfo.cvv" data-checkout="securityCode" id="securityCode" required></v-text-field>
            <v-text-field label="Expiration Month" v-model="cardInfo.expirationMonth" data-checkout="cardExpirationMonth" id="cardExpirationMonth" required></v-text-field>
            <v-text-field label="Expiration Year" v-model="cardInfo.expirationYear" data-checkout="cardExpirationYear" id="cardExpirationYear" required></v-text-field>
            <v-text-field label="Holder name" v-model="cardInfo.holderName" data-checkout="cardholderName" id="cardholderName" required></v-text-field>
            <v-btn success type="submit">Subscribe</v-btn>
        </form>

        <div id="card_draw"></div>
        <v-btn color="red darken-3" nuxt to="/">Volver</v-btn>
        </v-card>
    </v-flex>
</v-layout>

</template>

<script>
export default {
  middleware: 'checkout',
  asyncData(context) {
    const data = context.loyal || context.params.loyal
    let email = data.email 

    if(!email){
        email = context.loyal ? context.loyal.email : ''
    }

    return {
        loyal: data,
        cardInfo:{
            number: 4075595716483764 ,
            cvv: '',
            expirationMonth: '',
            expirationYear: '',
            holderName: data.first_name + " " + data.last_name,
            cardToken: ''
        },
        data:{
            cardToken: {},
            email: email
        },
        public_key: 'APP_USR-1db144da-5681-4a13-be6a-dc61989b6be6'         
    }
  },
  head: {
    script: [
      { src: 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js' }, 
      { src: 'https://rawgit.com/jessepollak/card/master/dist/card.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/vuetify/0.17.3/vuetify.min.css'}
    ]
  },

  methods:{
    click: function(){
      console.log('metodo ejecutado.')
    },
    getRoute: function(){
        this.$router.push('congrats')
    },

    handleTokenResponse: function(status, response) {
        console.log(status, JSON.stringify(response))
        if (status != 200 && status != 201) {
            alert("Check data");
        }else{
            var form = document.querySelector('#pay');

            var card = document.createElement('input');
            card.setAttribute('name',"token");
            card.setAttribute('type',"hidden");
            card.setAttribute('value',response.id);
            this.cardInfo.cardToken = response.id
            form.appendChild(card);
            this.addCardTokenToServer(response)
        }
    },
    payNow: function(){
        console.log('Formulario enviado...')
        var $form = document.querySelector('#pay');
        console.log($form)
        Mercadopago.createToken($form, this.handleTokenResponse);
        return true;
    },

    addCardTokenToServer: function(cardToken){
        console.log('SEND',cardToken)
        this.data.cardToken = cardToken

        fetch('/api/token',{
            method: 'POST',
            body: JSON.stringify(this.data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response=>{
            return response.json()
        }).then(data=>{
            console.log(data)
            this.$router.push('congrats')
        })
    }
  },
  mounted(){

var card = new Card({
    form: '#pay', // *required*
    container: '#card_draw', // *required*
    formSelectors: {
        numberInput: '#cardNumber', // optional — default input[name="number"]
        expiryInput: '#cardExpiration', // optional — default input[name="expiry"]
        cvcInput: '#securityCode', // optional — default input[name="cvc"]
        nameInput: '#cardholderName' // optional - defaults input[name="name"]
    },

    width: 200, // optional — default 350px
    formatting: true, // optional - default true

    // Strings for translation - optional
    messages: {
        validDate: 'valid\ndate', // optional - default 'valid\nthru'
        monthYear: 'mm/yyyy', // optional - default 'month/year'
    },

    // Default placeholders for rendered fields - optional
    placeholders: {
        number: '•••• •••• •••• ••••',
        name: 'Full Name',
        expiry: '••/••',
        cvc: '•••'
    },

    masks: {
        cardNumber: '•' // optional - mask card number
    },

    // if true, will log helpful messages for setting up Card
    debug: true // optional - default false
});



    Mercadopago.setPublishableKey(this.public_key); //("APP_USR-3ebb3f1e-082c-4f5a-b69d-dd44743c7652");


    function addEvent(el, eventName, handler){
        if (el.addEventListener) {
               el.addEventListener(eventName, handler);
        } else {
            el.attachEvent('on' + eventName, function(){
              handler.call(el);
            });
        }
    };

    function getBin() {
        var ccNumber = document.querySelector('input[data-checkout="cardNumber"]');
        return ccNumber.value.replace(/[ .-]/g, '').slice(0, 6);
    };

    function guessingPaymentMethod(event) {
        var bin = getBin();

        if (event.type == "keyup") {
            if (bin.length >= 6) {
                Mercadopago.getPaymentMethod({
                    "bin": bin
                }, setPaymentMethodInfo);
            }
        } else {
            setTimeout(function() {
                if (bin.length >= 6) {
                    Mercadopago.getPaymentMethod({
                        "bin": bin
                    }, setPaymentMethodInfo);
                }
            }, 100);
        }
    };

    function setPaymentMethodInfo(status, response) {
        if (status == 200) {
            // do somethings ex: show logo of the payment method
            var form = document.querySelector('#pay');

            if (document.querySelector("input[name=paymentMethodId]") == null) {
                var paymentMethod = document.createElement('input');
                paymentMethod.setAttribute('name', "paymentMethodId");
                paymentMethod.setAttribute('type', "hidden");
                paymentMethod.setAttribute('value', response[0].id);

                form.appendChild(paymentMethod);
            } else {
                document.querySelector("input[name=paymentMethodId]").value = response[0].id;
            }
        }
    };

    addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'keyup', guessingPaymentMethod);
    addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'change', guessingPaymentMethod);


    var doSubmit = false;

  }
}
</script>

<style scoped>
  .title {
    padding-left: 20px;
  }
</style>
