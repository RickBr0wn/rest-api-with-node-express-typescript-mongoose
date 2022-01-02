import express from 'express'
import controller from '../controllers/sample'

const router = express.Router()

/**
 @summary A SAMPLE ROUTE
 @route   GET /sample/ping/
 @desc    A basic operation of the server: Should reply `ping`.
 @access  Public
 @header  null
 @body    null
*/
router.get('/ping', controller.sampleHealthCheck)

export = router
