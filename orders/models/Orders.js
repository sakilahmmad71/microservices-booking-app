import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }
})

const Orders = mongoose.model('Orders', orderSchema)

export default Orders