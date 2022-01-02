import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import logging from './config/logging'
import mongoose from 'mongoose'
import config from './config/config'
import sampleRoutes from './routes/sample'
import bookRoutes from './routes/book'
import createBookRoute from './routes/book'

const NAMESPACE = 'SERVER'
const router = express()

/** Connect to mongoDB via mongoose */
mongoose
	.connect(config.mongo.url, config.mongo.options)
	.then(result => {
		logging.info(NAMESPACE, 'Connected successfully to mongoDB!')
	})
	.catch(error => {
		logging.error(NAMESPACE, error.message, error)
	})

/** Logging the request */
router.use((req, res, next) => {
	logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`)

	res.on('finish', () => {
		logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS -[${res.statusCode}]`)
	})

	next()
})

/** Parse the request */
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

/** API Rules */
router.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content Type, Accept, Authorization')

	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT')
		return res.status(200).json({})
	}

	next()
})

/** Routes */
router.use('/sample', sampleRoutes)
router.use('/api/books/', bookRoutes)

/** Error Handling */
router.use((req, res, next) => {
	const error = new Error('not found')

	return res.status(400).json({
		message: error.message
	})
})

/** Create the server */
const httpServer = http.createServer(router)
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}: ${config.server.port}`))
