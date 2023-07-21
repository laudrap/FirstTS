import fetch from 'node-fetch'

import express from 'express'

import Redis from 'redis'

import cors from 'cors'

/**
 * The port on which the server will listen.
 * @type {number}
 */
const PORT = 8701

/**
 * The port number of the Redis server.
 * If the process.env.REDIS_PORT is not defined, the default value is 6379.
 * @type {number}
 */
const REDIS_PORT = process.env.REDIS_PORT ?? 6379

/**
 * The hostname of the Redis server.
 * If the process.env.REDIS_HOST is not defined, the default value is 'localhost'.
 * @type {string}
 */
const REDIS_HOST = process.env.REDIS_HOST ?? 'localhost'

/**
 * The username for the Redis server (optional).
 * @type {string|undefined}
 */
const REDIS_USERNAME = process.env.REDIS_USERNAME

/**
 * The password for the Redis server (optional).
 * @type {string|undefined}
 */
const REDIS_PASSWORD = process.env.REDIS_PASSWORD

/**
 * The Redis credentials to be used in the URL.
 * @type {string}
 */
const REDIS_CRED = REDIS_USERNAME && REDIS_PASSWORD ? `${REDIS_USERNAME}:${REDIS_PASSWORD}@` : ''

/**
 * Express application instance.
 */
const app = express()

// Enable Cross-Origin Resource Sharing (CORS) for less restrictive access
app.use(cors())

/**
 * Redis client instance.
 * @type {Redis.RedisClient}
 */
const cliente = Redis.createClient({
    url: `redis://${REDIS_CRED}${REDIS_HOST}:${REDIS_PORT}`
})

// Connect to the Redis server when the application starts
await cliente.connect()

/**
 * Formats the weather response data into a JSON string.
 * @param {string} country - The country name.
 * @param {string} main - The main weather description.
 * @param {number} feels - The temperature in Celsius.
 * @param {number} feelslike - The feels-like temperature in Celsius.
 * @param {string} ville - The city name.
 * @param {number} humid - The humidity percentage.
 * @returns {string} A JSON string representing the formatted weather response.
 */
function setResponse(country, main, feels, feelslike, ville, humid) {
    return JSON.stringify({ country, main, feels, feelslike, ville, humid })
}

/**
 * Fetches weather data from OpenWeatherMap API or Redis cache and sends the response.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves when the weather data is fetched and the response is sent.
 */
async function getweather(req, res, next) {
    try {
        console.log('hello people')

        console.log('Fetching Data...')
        // const location = 'paris'

        const location = req.query.loc

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

// Start the server
app.listen(8701, () => { console.log(`Server started on port ${PORT}`) })
