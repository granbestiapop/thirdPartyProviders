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
              <v-text-field v-model="amount" label="$"  id="amount" required></v-text-field>
              <v-btn success @click="test">Pago</v-btn>
          </form>
          <div>{{response}}</div>
          <div id="card_draw"></div>
          </v-card>
      </v-flex>
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
      amount: 10
    }
  },

  methods:{
    test: function(){
      const data = {
        amount: this.amount,
        token: this.token,
        email: this.user.email
      }
      console.log(data)
      axios.post('https://mercadopago-loyal.herokuapp.com/api/payments', data).then(response => {
        this.response = response
      })
    }
  },

  mounted(){
  }
}
</script>
