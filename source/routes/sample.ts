import express from 'express'
import controller from '../controllers/sample'

const router = express.Router()

/**
 @summary A SAMPLE ROUTE
 @route   GET /sample/ping/
 @desc    Test basic operation of the server: Should reply `ping`.
 @access  Public
 @header  null
 @body    null
 @returns json { message: 'pong!' }
*/
router.get('/ping', controller.sampleHealthCheck)

export = router
