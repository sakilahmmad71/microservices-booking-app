import Axios from 'axios'
import { Router } from 'express'
import mongoose from 'mongoose'

import Orders from '../models/Orders.js'

const router = Router()

/*
URL             GET http://localhost:4002/orders
Description     Get all orders
Accessibility   public
*/
router.get('/', async (req, res) => {
    try {
        const orders = await Orders.find()

        if (!orders) {
            return res.status(404).json({ message: 'There is no orders' })
        }

        return res.status(201).json(orders)
    } catch (error) {
        console.log(error)
    }
})

/*
URL             GET http://localhost:4002/orders/:id
Description     Get order details
Accessibility   public
*/
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const order = await Orders.findOne({ _id: id })

        if (!order) {
            return res.status(404).json({ message: 'Order Not Found' })
        }

        const bookResponse = await Axios.get(`http://localhost:4000/books/${order.bookId}`)
        const customerResponse = await Axios.get(`http://localhost:4001/customers/${order.customerId}`)

        const orderDetails = {
            _id: order._id,
            customer: {
                name: customerResponse.data.name,
                age: customerResponse.data.age,
                address: customerResponse.data.address,
            },
            book: {
                title: bookResponse.data.title,
                author: bookResponse.data.author,
                pages: bookResponse.data.pages,
                publisher: bookResponse.data.publisher,
            },
            orderDate: order.initialDate,
            deliverDate: order.deliverDate
        }

        return res.status(200).json(orderDetails)
    } catch (error) {
        console.log(error)
    }
})

/*
URL             POST http://localhost:4002/orders
Description     Creating a order
Accessibility   public
*/
router.post('/', async (req, res) => {
    try {
        const { customerId, bookId, initialDate, deliveryDate } = req.body

        const newOrder = {
            customerId: mongoose.Types.ObjectId(customerId),
            bookId: mongoose.Types.ObjectId(bookId),
            initialDate,
            deliveryDate
        }

        const order = await Orders.create(newOrder)

        if (!order) {
            return res.status(400).json({ message: 'Bad Request' })
        }

        return res.status(201).json({ message: 'Order created successfully' })
    } catch (error) {
        console.log(error)
    }
})

export default router