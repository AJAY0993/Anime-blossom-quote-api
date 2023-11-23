const express = require('express');
const path = require('path');
const cors = require('cors')
const invalid = [{
    "error": "Invalid ID",
    "message": "The requested ID does not exist or is invalid."
},
{
    "error": "Invalid Character Name",
    "message": "The requested character name does not exist or is invalid."
}

]
const quotes = require('./quotes');

const app = express()
app.use(cors())
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



//  HOME PAGE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/doc', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/documents.html'))
})
app.get('/demo', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/demo.html'))
})

app.get('/js', (req, res) => {
    res.sendFile(__dirname + '/public/js/main.js')
})
app.get('/css/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', '/css', '/styles.css'))
})

app.get('/bg', (req, res) => {
    res.sendFile(__dirname + '/public/images/bg.jpg')
})
//  SEND QUOTES
app.get('/api/quotes', (req, res) => {
    res.json(quotes)
})

// SEND RANDOM QUOTE
app.get('/api/quotes/random', (req, res) => {
    res.json(quotes[getRandomInt(quotes.length)])
})

// SEND QUOTE ON THE BASIS OF CHARACTER NAME
app.get('/api/quotes/character', (req, res) => {
    const character = req.query.name.toLocaleLowerCase();
    const quote = quotes.find(quote => quote.character.toLowerCase() === character);
    res.json(quote || invalid[1])
})

// SEND QUOTE ON THE BASIS OF ID
app.get('/api/quotes/:id', (req, res) => {
    const id = +req.params.id
    const quote = quotes.find(quote => quote.id === id)
    res.json(quote || invalid[0])
})
app.listen(process.env.PORT || 9000)