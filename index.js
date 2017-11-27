// Require `Nuxt` And `Builder` modules
const express = require('express')
const session = require('express-session')
const app = express()

app.use(session({ secret: 'keyboard cat' }));

//const oauth = require('./api/oauth')
//app.use('/auth', oauth)

//app.use(express.static('public'))

//app.listen(3000)

//
async function start() {
	// Require Nuxt config
	const config = require('./nuxt.config.js')

	// Create a new Nuxt instance
	const nuxt = new Nuxt(config)

	// Enable live build & reloading on dev
	if (nuxt.options.dev) {
	  new Builder(nuxt).build()
	}

	// Add nuxt.js middleware
	app.use(nuxt.render)

	// Listen the server
	app.listen(3000)
	console.log('Server listening on ' + 'localhost:' + 3000) // eslint-disable-line no-console
}

start()