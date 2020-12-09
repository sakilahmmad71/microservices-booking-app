import express from 'express'
import bodyParser from 'body-parser'
import colors from 'colors'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'

import connectDB from './config/db.js'
import ordersRoute from './router/orders.js'

const App = express()

dotenv.config()

App.use(bodyParser.urlencoded({ extended: false }))
App.use(bodyParser.json())
App.use(cors())
App.use(morgan('dev'))

App.use('/orders', ordersRoute)

const PORT = process.env.PORT || 4002
App.listen(PORT, () => {
    connectDB()
    console.log(`Books service running on http://localhost:${PORT}`.yellow.bold)
})