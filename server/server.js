import fetch from 'node-fetch'

import express from 'express'

import Redis from 'redis'

import cors from 'cors'

import dotenv from 'dotenv'

import { auth, requiredScopes } from 'express-oauth2-jwt-bearer'

/**
 * Load environment variables from the .env file and set them in the process.env object.
 *
 * @function
 * @returns {void}
 */
dotenv.config()

/**
 * Middleware function to check if the user has the required scopes for access.
 *
 * @function
 * @param {string} requiredScopes - The required scopes for access.
 * @returns {Function} Middleware function for checking required scopes.
 */
const checkScopes = requiredScopes('read:messages')

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
 * Environment variable representing the issuer for authentication.
 * @type {string}
 */
const AUTH_ISSUER = process.env.AUTH_ISSUER

/**
 * Environment variable representing the audience for authentication.
 * @type {string}
 */
const AUTH_AUDIENCE = process.env.AUTH_AUDIENCE

/**
 * Create a new Express application.
 * @type {Express}
 */
const app = express()

/**
 * Enables Cross-Origin Resource Sharing (CORS) middleware for the Express application.
 * @function
 */
app.use(cors())

/**
 * Redis client instance.
 * @type {Redis.RedisClient}
 */
const cliente = Redis.createClient({
    url: `redis://${REDIS_CRED}${REDIS_HOST}:${REDIS_PORT}`
})

/**
 * Establish a connection to the database using the `cliente` object.
 * @function
 * @async
 */
await cliente.connect()

/**
 * Middleware function to check JSON Web Tokens (JWT) for authentication.
 *
 * @function
 * @param {Object} options - The options for JWT authentication.
 * @param {string} options.audience - The expected audience (aud) claim in the JWT.
 * @param {string} options.issuerBaseURL - The base URL of the issuer for the JWT.
 * @returns {Function} Middleware function for JWT authentication.
 */
const checkJwt = auth({
    audience: AUTH_AUDIENCE,
    issuerBaseURL: AUTH_ISSUER
})
/**
 * GET request handler for the '/api/public' endpoint.
 * This endpoint is publicly accessible and does not require authentication.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 */
app.get('/api/public', function (req, res) {
    res.json({
        message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    })
})

/**
 * GET request handler for the '/api/private' endpoint.
 * This endpoint is private and requires authentication using JSON Web Tokens (JWT).
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 */
app.get('/api/private', checkJwt, function (req, res) {
    res.json({
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    })
})

/**
 * GET request handler for the '/api/private-scoped' endpoint.
 * This endpoint is private and requires authentication using JSON Web Tokens (JWT).
 * Additionally, users must have the required scope of 'read:messages'.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {void}
 */
app.get('/api/private-scoped', checkJwt, checkScopes, function (req, res) {
    res.json({
        message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
    })
})

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
 * @returns {Promise<void>} A promise that resolves when the weather data is fetched and the response is sent.
 */
async function getweather(req, res) {
    try {
        console.log('Fetching Data...')

        /**
        * Extracted location from the query parameters of the Express request.
        * @type {string}
        */
        const location = req.query.loc

        /* Check if the 'location' parameter is provided. If not, send a 400 error response and a console log error message */
        if (!location) { res.send('message, ', 400); console.log('empty location requested.'); return }

        /* Attempt to retrieve cached data for the given 'location' from the 'cliente' object. */
        /* If an error occurs during retrieval, set 'cachee' to undefined. */
        let cachee
        try {
            cachee = await cliente.get(`temp:${location}`)
        } catch {
            cachee = undefined
        }

        /* Check if weather data is available in the cache */
        if (cachee) {
            /* Parse the cached JSON data */
            cachee = JSON.parse(cachee)

            /* Log the cached data with a source label */
            console.log({ ...cachee, source: 'cache' })

            /* Extract individual data from the cached object */
            const country = cachee.sys.country
            const main = cachee.weather[0].main
            const feels = cachee.main.temp
            const feelslike = cachee.main.feels_like
            const ville = cachee.name
            const humid = cachee.main.humidity

            /** Send the response using the extracted data from cache */
            res.send(setResponse(country, main, feels, feelslike, ville, humid))
        } else {
            /* Make the API request to fetch weather data for the specified location */
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ddcb7ebff34fe073865e71aa9b50c157`)

            /* Parse the API response into JSON format */
            const data = await response.json()

            try {
                /* Cache the fetched data in Redis for future use with a time-to-live of 1 hour (3600 seconds) */
                await cliente.set(`temp:${location}`, JSON.stringify(data), { EX: 60 * 60 * 24 })
            } catch {
                /* If caching fails, log an error message */
                console.err('Could not set the weather in redis')
            }

            /* Log the fetched data with a source label */
            console.log({ data, source: 'API' })

            /* Extract individual data from the API response object */
            const country = data?.sys?.country
            const main = data?.weather[0].main
            const feels = data?.main.temp
            const feelslike = data?.main.feels_like
            const ville = data?.name
            const humid = data?.main.humidity

            /* Send the response using the extracted data from the API */
            res.send(setResponse(country, main, feels, feelslike, ville, humid))
        }
    } catch (err) {
        console.error(err)
        res.status(500)

        // TODO: Faire une routine pour le reconnecter / circuit breaker ?
    }
}

/**
 * HTTP GET endpoint that handles weather data retrieval from the backend.
 * Requires JWT authentication before processing the request.
 *
 * @route GET /backend
 * @function
 *
 * @throws {Error} - If JWT authentication fails, an error response will be sent.
 *
 * @returns {void}
 */
app.get('/backend', checkJwt, getweather)

/**
 * Starts the HTTP server and listens on port 8701 for incoming requests.
 *
 * @function
 *
 * @returns {void}
 */
app.listen(8701, () => { console.log(`Server started on port ${PORT}`) })
