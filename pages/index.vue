<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
     <div class="text-xs-center">
        <img src="../assets/img/JimmyStreamingLogo.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <v-card class="transparent-background">
        <v-card-title class="headline">Bienvenidos a Jimmy Streaming</v-card-title>
        <v-card-text>
          <p>La plataforma de contenido audiovisual <b>Líder</b> en Latinoamerica</p>
          <p>Jimmy te ayudará a encontrar las series más vistas, películas, y contenido exclusivo, para no aburrirte jamás!</p>
          <p></p>
          <p>Si eres parte del programa Mercado Puntos de <a href="http://www.mercadolibre.com.mx">Mercado Libre</a> podrás acceder a un descuento exclusivo en tu suscripción!</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="Yellow darken-3" nuxt to="/checkout">Suscribirme!</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
