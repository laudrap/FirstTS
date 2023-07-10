
const PORT = 8701
//const fetch = require('node-fetch')
const express = require('express')
const app = express()
const axios = require('axios')
require('dotenv').config()


/*app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
})*/



/*app.get('/backend', (req, res, next) => {
    res.send('Hello from the backend!');
})*/



async function getapi(req, res, next) {
    try {
        console.log("Fetching Data...");

        const location = "paris";

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ddcb7ebff34fe073865e71aa9b50c157`);

        const data = await response.json();



        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500);
    }
}


app.get('/backend', getapi);


app.listen(8701, () => { console.log(`Server started on port ${PORT}`) });

