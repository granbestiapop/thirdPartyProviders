<template>

    <v-container fluid>
    
    <div style="background-color:red; height:50%; width:100%">
      <h3>ClaroVideo</h3>
    </div>

    <v-layout row justify-center>
      <v-card style="width:50%; margin-top:-10px"> 

        <v-container row justify-center>

        <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            Disfruta del beneficio
          </v-flex>
        </v-layout>

          <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            <router-link to="checkout">
              <v-btn success>Suscribir</v-btn>
            </router-link>
          </v-flex>
        </v-layout>

          
        </v-container>
      </v-card>
    </v-layout>

    

    </v-container>

</template>

<script>
export default {
  asyncData(context) {
    return {}
  },
  head: {
    script: [
      { src: 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js' }
    ]
  },

  methods:{
    click: function(){
      console.log('metodo ejecutado.')
    },
    getTypes: function(){
    },
    goCheckout: function(){
      console.log('go checkout')
      this.$router.push({ path: 'checkout', query: { token: '111111119' }})
      //this.$router.go(this.$router.currentRoute)
    }
  }
}

</script>
