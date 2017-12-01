<template>

    <v-container fluid>

    <v-layout row justify-center>
      <v-card style="width:50%; margin-top:-10px"> 
        <v-card-media src="https://www.neostuff.net/wp-content/uploads/2015/12/claro-video.png" height="400px">
        </v-card-media>

        <v-container row justify-center>

        <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            Disfruta del beneficio
          </v-flex>
        </v-layout>

          <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            <v-btn success @click="goCheckout">Suscribir</v-btn>
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
    return {} //
  },

  methods:{
    goCheckout: function(){
      console.log('go checkout')
      this.$router.push({ path: 'checkout', query: { token: '111111119' }})
      //this.$router.go(this.$router.currentRoute)
    }
  }
}

</script>
