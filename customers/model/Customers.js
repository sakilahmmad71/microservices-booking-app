import mongoose from 'mongoose'

const CustomersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

const Customers = mongoose.model('Customers', CustomersSchema)

export default Customers