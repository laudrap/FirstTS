
const PORT = 8701;
const REDIS_PORT = 6379;
import fetch from 'node-fetch';

import express from 'express'
//const express = require('express');
const app = express();

import Redis from 'redis';
import redis from 'redis';
//const axios = require('axios');
//require('dotenv').config();
//const cors = require('cors');


//app.use(cors());
const cliente = Redis.createClient(REDIS_PORT);

await cliente.connect();




function setResponse(country, main, feels, feelslike, ville, humid) {

    return `<h2> Le pays est : ${country}. La condition est ${main}. Il fait ${feels} °C. Il fait un ressenti de ${feelslike} °C. Nous sommes dans la ville de ${ville} et le taux d'humidité est de ${humid} %. </h2>`

}


//function setResponse(country) {

// return `<h2> Le pays est : ${country}.`;

//}



async function getweather(req, res, next) {
    try {

        console.log("hello people")

        console.log("Fetching Data...");

        const location = "los angeles";

        //checker la cache avant API

        let cachee = await cliente.get(`${location}`)

        //if we have cache hit

        if (cachee) {
            cachee = JSON.parse(cachee)

            console.log({ ...cachee, 'source': 'cache' })

            const country = cachee.sys.country;

            const main = cachee.weather[0].main;

            const feels = cachee.main.temp;

            const feelslike = cachee.main.feels_like;

            const ville = cachee.name;

            const humid = cachee.main.humidity;

            res.send(setResponse(country, main, feels, feelslike, ville, humid));
        }
        // if not, we have a cache miss

        else {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ddcb7ebff34fe073865e71aa9b50c157`);

            const data = await response.json();

            await cliente.set(`${location}`, JSON.stringify(data), 'EX', 3600)

            console.log({ data, 'source': 'API' })

            //cacher données individuelles

            const country = data?.sys?.country;

            const main = data?.weather[0].main;

            const feels = data?.main.temp;

            const feelslike = data?.main.feels_like;

            const ville = data?.name;

            const humid = data?.main.humidity;
            res.send(setResponse(country, main, feels, feelslike, ville, humid));
        }

        //Set to Redis



        //await cliente.set(`${location}`, JSON.stringify(data), 'EX', 3600)


        //const weatherData = JSON.stringify({ country, main, feels, feelslike, ville, humid });
        //await cliente.set(location, { 'country': country, 'condition': main, 'temp': feels, 'tempre': feelslike, 'ville': ville, 'humidite': humid }, 'EX', 3600);

        //console.log(data)

        // res.send(setResponse(country, main, feels, feelslike, ville, humid));
        //res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500);
    }
}


//Cache middleware
/*
function cache (req, res, next){

    
    const country = data?.sys?.country;

    const main = data?.weather[0].main;

    const feels = data?.main.temp;

    const feelslike = data?.main.feels_like;

    const ville = data?.name;

    const humid = data?.main.humidity;

    cliente.get(ville) => {
        if (err) throw err;

        if(data !== null){
            res.send(setResponse())
        }
    }
}*/

app.get('/backend', getweather);


app.listen(8701, () => { console.log(`Server started on port ${PORT}`) });



