import { Router } from 'express'

import Customers from '../model/Customers.js'

const router = Router()

/*
URL             GET http://localhost:4000/customers/:id
Description     Getting a single customer detail
Accessibility   public
*/
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const customer = await Customers.findOne({ _id: id })

        if (!customer) {
            return res.status(400).json({ message: 'Customer Not Found' })
        }

        return res.status(200).json(customer)
    } catch (error) {
        console.log(error)
    }
})

/*
URL             GET http://localhost:4000/customers
Description     Getting all customers
Accessibility   public
*/
router.get('/', async (req, res) => {
    try {
        const customers = await Customers.find()

        if (!customers) {
            return res.status(400).json({ message: 'No Customer Found' })
        }

        return res.status(200).json(customers)
    } catch (error) {
        console.log(error)
    }
})

/*
URL             POST http://localhost:4000/customers
Description     Creating a customer
Accessibility   public
*/
router.post('/', async (req, res) => {
    try {
        const { name, age, address } = req.body

        const customer = await Customers.create({ name, age, address })

        if (!customer) {
            return res.status(400).json({ message: 'Bad Request' })
        }

        return res.status(201).json({ message: 'Customer registered successfully' })
    } catch (error) {
        console.log(error)
    }
})

export default router