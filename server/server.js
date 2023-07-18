import fetch from 'node-fetch'

import express from 'express'

import Redis from 'redis'
// const axios = require('axios');
// require('dotenv').config();
import cors from 'cors'
const PORT = 8701
const REDIS_PORT = process.env.REDIS_PORT ?? 6379
const REDIS_HOST = process.env.REDIS_HOST ?? 'localhost'
const REDIS_USERNAME = process.env.REDIS_USERNAME
const REDIS_PASSWORD = process.env.REDIS_PASSWORD
const REDIS_CRED = REDIS_USERNAME && REDIS_PASSWORD ? `${REDIS_USERNAME}:${REDIS_PASSWORD}@` : ''
const app = express()

app.use(cors()) // comment faire pour être plus restrictif, inspecter les variables

const cliente = Redis.createClient({
    url: `redis://${REDIS_CRED}${REDIS_HOST}:${REDIS_PORT}`
})

await cliente.connect()

function setResponse(country, main, feels, feelslike, ville, humid) {
    return JSON.stringify({ country, main, feels, feelslike, ville, humid })
}

async function getweather(req, res, next) {
    try {
        console.log('hello people')

        console.log('Fetching Data...')
        const location = 'paris'

        // const location = req.query["loc"];

        if (!location) { res.send('message, ', 400); console.log('empty location requested.'); return }

        // Mettre le JSON de la ville dans la variable cachee if cache hit

        let cachee
        try {
            cachee = await cliente.get(`temp:${location}`)
        } catch {
            cachee = undefined // free la variable
        }

        // if we have cache hit == variable cachee est remplie

        if (cachee) {
            cachee = JSON.parse(cachee)

            console.log({ ...cachee, source: 'cache' })

            // données individuelles utiles pour l'app

            const country = cachee.sys.country

            const main = cachee.weather[0].main

            const feels = cachee.main.temp

            const feelslike = cachee.main.feels_like

            const ville = cachee.name

            const humid = cachee.main.humidity

            // retourne une phrase cute sur la page web

            res.send(setResponse(country, main, feels, feelslike, ville, humid))
        } else {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ddcb7ebff34fe073865e71aa9b50c157`)

            const data = await response.json()

            try {
                await cliente.set(`temp:${location}`, JSON.stringify(data), 'EX', 3600)
            } catch {
                console.err('Could not set the weather in redis')
            }

            console.log({ data, source: 'API' })

            // données individuelles utiles pour l'app

            const country = data?.sys?.country

            const main = data?.weather[0].main

            const feels = data?.main.temp

            const feelslike = data?.main.feels_like

            const ville = data?.name

            const humid = data?.main.humidity

            // retourne une phrase cute sur la page web

            res.send(setResponse(country, main, feels, feelslike, ville, humid))
        }
    } catch (err) {
        console.error(err)
        res.status(500)

        // TODO: Faire une routine pour le reconnecter / circuit breaker
    }
}

app.get('/backend', getweather)

app.listen(8701, () => { console.log(`Server started on port ${PORT}`) })
