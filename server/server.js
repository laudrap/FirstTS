
const PORT = 8700
//const fetch = require('node-fetch')
const express = require('express')
const app = express()
const axios = require('axios')
require('dotenv').config()


/*app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
})*/



app.get('/backend', (req, res) => {
    res.send('Hello from the backend!');
})

app.listen(8700, () => { console.log(`Server started on port ${8700}`) })

