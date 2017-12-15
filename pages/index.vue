<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
     <div class="text-xs-center">
        <img src="https://www.clarovideo.com/webclient/sk_core/images/clarovideo-logo-sitio.svg" alt="Vuetify.js" class="mb-5" />
      </div>
      <v-card class="transparent-background">
        <v-card-title class="headline">Bienvenidos a Claro Video</v-card-title>
        <v-card-text>
          <p>La plataforma de contenido audiovisual <b>Líder</b> en Latinoamerica</p>
          <p>En Claro Video encontrarás las series más vistas, películas, y contenido exclusivo</p>
          <p></p>
          <p>Si eres parte del programa Mercado Puntos de <a href="http://www.mercadolibre.com.mx">Mercado Libre</a> podrás acceder a un descuento exclusivo en tu suscripción!</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="red darken-3" nuxt :to="{ name: 'checkout', params: { email, token, loyal }}">Suscribirme!</v-btn>
        </v-card-actions>
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
    console.log(data)
    return data
  }
}
</script>
