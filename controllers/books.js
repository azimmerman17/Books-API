const router = require('express').Router()
const Db = require('../models')

// GET: get all books
router.get('/', async (req, res) => {
    try {
        const books = await Db.Books.find()
    .then(books => {
        res.json(books)
    })
    } catch (err) {
        res.status(400).json(err)
    }
})

// SEED DATA
router.get('/seed', (req, res) => {
    Db.Books.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

//  GET: get book by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const book = await Db.Books.findById(id)
        .then(book=> {
            res.status(200).json(book)
        }) 
    } catch (err) {
        console.log(err) 
        res.status(400).json(err)
    }
})

// POST: Create a new book
router.post('/', async (req,res) => {
    const { year, quanity } = req.body
    if (!year) req.body.year = undefined
    if (!quanity) req.body.year = undefined
    try {
    await Db.Books.create(req.body)
    res.status(201).json(req.body)    
    } catch (err) {
        console.log(err) 
        res.status(400).json(err)
    }
})

// PUT: Update a book by ID
router.put('/:id', async (req,res) => {
    const { id } = req.params
    console.log(req.body)
    try {
        await Db.Books.findByIdAndUpdate(id, req.body)
        let book = await Db.Books.findById(id)
        res.status(200).json(book)   
    } catch (err) {
        console.log(err) 
        res.status(400).json(err)
    }
})

// DELETE: Delete a book by id
router.delete('/:id', async (req,res) => {
    const { id } = req.params
    try {
        await Db.Books.findByIdAndDelete(id)
        res.status(303).json({
            message: 'Delete successful'
        })
    } catch (err) {
        console.log(err) 
        res.status(400).json(err)
    }
})


module.exports = router