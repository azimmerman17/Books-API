const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const bookRoutes = require('./controllers/books')

// Initialize
const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('/books', bookRoutes)

app.get('/', (req, res) => {
    res.send('BOOK APP API')
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`listen ${PORT}`))