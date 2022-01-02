import express from 'express'
import controller from '../controllers/book'

const router = express.Router()

/**
 @summary GET BOOKS
 @route   GET /api/books/get/books
 @desc    Get all of the books
 @access  Public
 @header  null 
 @body    null
 @returns json {
  "books": [<IBOOK>, ...],
  "count": 0
}
*/
router.get('/get/books', controller.getAllBooks)

/**
 @summary CREATE NEW BOOK
 @route   POST /api/books/create/book 
 @desc    Create a new book
 @access  Public
 @header  null 
 @body    null
 @returns json {}
*/
router.post('/create/book', controller.createNewBook)

export = router
