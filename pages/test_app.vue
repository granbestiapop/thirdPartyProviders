<template>
  <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
          <div class="text-xs-center">
              <img src="../assets/img/JimmyStreamingLogo.png" alt="Vuetify.js" class="mb-5" />
          </div>

           <v-card class="transparent-background">
            <form class="mb-5">
              <v-text-field v-model="user.email" label="E-mail" id="email" required></v-text-field>
              <v-text-field v-model="user.id" label="Customer Id" id="customerid" required></v-text-field>
              <v-text-field v-model="token" label="Token"  id="token" required></v-text-field>
              <v-text-field v-model="amount" v-on:change="discount= amount*0.2" label="$"  id="amount" required></v-text-field>
              <v-text-field v-model="discount" label="Discount"  id="discount" required></v-text-field>
              <v-text-field v-model="couponCode" label="Coupon Code"  id="couponCode" required></v-text-field>
              <v-text-field v-model="reference" label="Reference"  id="reference" required></v-text-field>

              <v-btn success @click="pay">Pago</v-btn>
          </form>
          <div id="card_draw"></div>
          </v-card>
      </v-flex>

    <v-snackbar
      :timeout="snackbar.timeout"
      :top="snackbar.y === 'top'"
      :bottom="snackbar.y === 'bottom'"
      :right="snackbar.x === 'right'"
      :left="snackbar.x === 'left'"
      :color="snackbar.color"
      v-model="snackbar.show"
      > {{ snackbar.text }}
      <v-btn flat color="white" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  middleware: 'testapp',

  asyncData(context) {
    const user = context.user
    const token = context.token
    return {
      user,
      token,
      response: '',
      amount: 10,
      couponCode: 'CLAROV20',
      discount: 2,
      reference: 'Beneficio Mercadopuntos 20% OFF',
      snackbar: {
         text: '¡Pago realizado con éxito!',
         show: false,
         timeout: 2500,
         x: 'right',
         y: 'bottom',
         color: 'success'
      }
    }
  },

  methods:{
    pay(){
      const data = {
        amount: this.amount,
        token: this.token,
        email: this.user.email,
        customer_id: this.user.id,
        couponCode: this.couponCode,
        couponAmount: this.discount,
        reference: this.reference
      }
      console.log(data)
      axios.post('https://mercadopago-loyal.herokuapp.com/api/payments', data).then(response => {
        this.response = response
        this.snackbar.show = true
        this.snackbar.color = 'success'
      }).catch(err=>{
        this.snackbar.text = 'Error al realizar pago'
        this.snackbar.show = true
        this.snackbar.color = 'error'

      })
    }
  },

  mounted(){
  }
}
</script>
