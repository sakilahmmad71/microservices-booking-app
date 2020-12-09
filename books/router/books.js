import { Router } from 'express'

import Books from '../model/Books.js'

const router = Router()

/*
URL             GET http://localhost:4000/books/:id
Description     Getting a single book
Accessibility   public
*/
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Books.findById(id)

        if (!book) {
            return res.status(404).json({ message: 'No Book Found' })
        }

        return res.status(200).json(book)
    } catch (error) {
        console.log(error)
    }
})

/*
URL             GET http://localhost:4000/books
Description     Getting the lists of books
Accessibility   public
*/
router.get('/', async (req, res) => {
    try {
        const books = await Books.find()

        if (!books) {
            return res.status(404).json({ message: 'No Books Found' })
        }

        return res.status(200).json(books)
    } catch (error) {
        console.log(error)
    }
})

/*
URL             POST http://localhost:4000/books
Description     Create a Book
Accessibility   public
*/
router.post('/', async (req, res) => {
    try {
        const { title, author, pages, publisher } = req.body

        const book = await Books.create({ title, author, pages, publisher })

        if (!book) {
            return res.status(400).json({ message: 'Bad Request' })
        }

        return res.status(201).json({ message: 'Book successfully created' })
    } catch (error) {
        console.log(error)
    }
})

/*
URL             PUT http://localhost:4000/books/:id
Description     Update a Book Details
Accessibility   public
*/
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const book = await Books.findOneAndUpdate({ _id: id }, req.body, { new: true })

        if (!book) {
            return res.status(400).json({ message: 'Bad Request' })
        }

        return res.status(201).json({ message: 'Book successfully updated' })
    } catch (error) {
        console.log(error)
    }
})

/*
URL             DELETE http://localhost:4000/books/:id
Description     Delete a Book
Accessibility   public
*/
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const book = await Books.findByIdAndDelete({ _id: id })

        if (!book) {
            return res.status(400).json({ message: 'Bad Request' })
        }

        return res.status(201).json({ message: 'Book successfully deleted' })
    } catch (error) {
        console.log(error)
    }
})

/*
URL             DELETE http://localhost:4000/books/:id
Description     Delete all Books
Accessibility   public
*/
router.delete('/', async (req, res) => {
    try {
        await Books.deleteMany()

        return res.status(201).json({ message: 'All Books deleted successfully' })
    } catch (error) {
        console.log(error)
    }
})

export default router