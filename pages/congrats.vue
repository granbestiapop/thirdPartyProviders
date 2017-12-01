<template>
  <div>
    <router-link to="checkout">
      <button>Ir a Mercadolibre</button>
    </router-link>
  </div>


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
    }
  },
  mounted(){
  }
}
</script>
