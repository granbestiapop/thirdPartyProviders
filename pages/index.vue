<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div>
        <img src="../assets/img/JimmyStreamingLogo.png" alt="Vuetify.js" class="jimmy-image" />
      </div>
      <v-card class="transparent-background mb-5">
        <v-card-title class="headline text-center">Bienvenidos a Jimmy Streaming</v-card-title>
        <v-card-text>
          <p>La plataforma de contenido audiovisual <b>Líder</b> en Latinoamerica</p>
          <p>Jimmy te ayudará a encontrar las series más vistas, películas, y contenido exclusivo, para no aburrirte jamás!</p>
          <p></p>
          <p>Si eres parte del programa Mercado Puntos de <a href="http://www.mercadolibre.com.mx">Mercado Libre</a> podrás acceder a un descuento exclusivo en tu suscripción!</p>
        </v-card-text>
        <v-flex class="pa-3 text-all-center">
          <v-spacer></v-spacer>
          <v-btn color="Yellow darken-3" nuxt :to="{ name: 'checkout', params: { email, token, loyal }}">Suscribirme!</v-btn>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: 'checkout',
  asyncData(context) {
    const data = {
        loyal: context.loyal,
        token: context.query.token,
        email: context.loyal ? context.loyal.email : ''
    }
    return data
  },

  methods:{
  },

  mounted(){
  }
}
</script>
