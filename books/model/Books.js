import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: false
    },
    publisher: {
        type: String,
        required: false
    }
})

const Books = mongoose.model('Books', BookSchema)

export default Books