const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const env = require('dotenv').config()


module.exports = {
	head: {
    title: '{{ name }}',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/vuetify/0.17.3/vuetify.min.css'}
    ]
  },
  serverMiddleware: [
  	  bodyParser.json(),
      '~/api/index.js'
  ],
  build: {
    vendor: ['~/plugins/vuetify.js'],
    extractCSS: true,
  },
  plugins: [
  	'~/plugins/vuetify.js'
  ],

}