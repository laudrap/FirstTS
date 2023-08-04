
# Server

This folder is a Node.js server built with Express, which fetches weather data from the OpenWeatherMap API and caches it using Redis. The server is secured using OAuth2 JWT (JSON Web Tokens) authentication.


## Express


This is a Node.js server built with [Express.js](https://expressjs.com/).  

### Express.js

What's Express.js ?

- Express.js is a framework for Node.js. It is a web application that listens for incoming HTTP requests, processes those requests, and sends back appropriate response. It provides a set of tools and features that make it easier to handle various aspects of web development, such as routing, middleware, template rendering, and more.

Why Express.js ?

- Simplicity : easy to design and use

- Middleware : enables the possibility to add athentication
install express --save

Note : You must have ```version 4.18.2``` or higher 
 
## ⚡Quick Start

To install all the dependencies in package.json, you must run these lines in the terminal : 
``` 
cd server
npm i 
```

## Versions Requirements


### Dependencies version requirements and installation : 

Note 1: You can also see the command line to install each dependency individually.
Note 2: The following dependencies should be installed using either npm or yarn. <mark>Choose one and stick to it for security purposes? </mark>


- [cors](https://www.npmjs.com/package/cors) : ^2.8.5
```
npm install cors
```

- [dotenv](https://www.npmjs.com/package/dotenv) : ^16.3.1
```
npm install dotenv --save
```

- [express](http://expressjs.com/en/starter/installing.html) : ^4.18.2
```
npm install express
```

- [express-oauth2-jwt-bearer](https://www.npmjs.com/package/express-oauth2-jwt-bearer) : ^1.5.0
```
npm install express-oauth2-jwt-bearer
```

- [node-fetch](https://www.npmjs.com/package/node-fetch) : ^2.6.12

```
npm install node-fetch
```

Note : Node-fetch is an ES module (ESM). That's why "type": "module" is added in package.js. 

To use correctly the package you must import it this way : 

```
import fetch from 'node-fetch';
```


- [redis](https://redis.io/docs/getting-started/installation/) : ^4.6.7

```
sudo apt-get update
sudo apt install redis
```

#### _To install all the dependencies at the same time :_ 

```
npm install node-fetch express redis cors dotenv express-oauth2-jwt-bearer
```


### devDependencies version requirements :

Note : You can also see the command line to install each devDependency. 

- [eslint](https://www.npmjs.com/package/eslint) : ^8.45.0
```
npm init @eslint/config
```

- [nodemon](https://www.npmjs.com/package/nodemon) : ^3.0.1
```
npm install --save-dev nodemon
```

## Documentation


### Environment Variables

_This practice prevents hardcoding values, an unsecure way of developping applications._


- AUTH_ISSUER: The issuer for authentication using OAuth2 JWT.

- AUTH_AUDIENCE: The audience for authentication using OAuth2 JWT.

- CLIENT_URL : Website link were the meteo app is rendered.

- REDIS_PORT: The port number for the Redis server (default is 6379).

- REDIS_HOST: The hostname of the Redis server (default is 'localhost').

- REDIS_USERNAME: The optional username for the Redis server (if required).

- REDIS_PASSWORD: The optional password for the Redis server (if required).

### OAuth2 JWT Authentication

The server uses OAuth2 JWT authentication to secure the private endpoints. Users need to include a valid JWT in the request headers to access these endpoints. The JWT should have the required scope of 'read:messages' for the '/api/private-scoped' endpoint.

Note : The authentication process and settings are managed in Auth0 [Dashboard](https://auth0.com/docs/get-started/auth0-overview/dashboard).


### Endpoints

- GET /api/public: A public endpoint that does not require authentication. It returns a simple message.

- GET /api/private: A private endpoint that requires JWT authentication. Users must include a valid JWT in the request headers to access this endpoint.

- GET /api/private-scoped: A private endpoint that requires both JWT authentication and the 'read:messages' scope. Users must include a valid JWT with the required scope in the request headers to access this endpoint.

- GET /backend: An endpoint that fetches weather data from OpenWeatherMap API or Redis cache, depending on whether the data is available in the cache. This endpoint requires JWT authentication before processing the request.

_For more information about the authorization section and query parameters, click this [link](https://auth0.com/docs/quickstart/backend/nodejs/01-authorization)._

Note :  /backend shows the values without being carefully presented. 


### Variables and Naming
- PORT: The port number on which the server will listen (set to 8701).

- REDIS_PORT, REDIS_HOST, REDIS_USERNAME, REDIS_PASSWORD: Environment variables used to connect to the Redis server. Defaults are provided if not  specified in the .env file.

- AUTH_ISSUER, AUTH_AUDIENCE: Environment variables representing the issuer and audience for JWT authentication.

- app: The Express application instance.

- cliente: The Redis client instance for caching weather data.

- checkJwt: A middleware function for checking JWT authentication.

- checkScopes: A middleware function for checking if the user has the required 'read:messages' scope.

- getweather: The function that handles fetching weather data and sending the response.

- app.use(cors()) : Enables Cross-Origin Resource Sharing (CORS) middleware for the Express application.


## A little bit more about the cache

- To improve performance and reduce API calls the server caches datas in Redis. 

- If the weather data for a specific location is available in the cache, the server will retrieve it from Redis instead of making a new API call. The cached data has a time-to-live (TTL) of 1 hour (60 * 60 seconds).


## Note
Before running the server, ensure you have the Redis server running and properly configured with the provided environment variables. Additionally, make sure you have valid credentials and keys for the OpenWeatherMap API.

Please check the official documentation for Redis, Express, OpenWeatherMap, and Auth0 for more detailed information about their usage and configuration.







## Bruno suggestion

Expliquer lien openweather, app express, cache 

-version reids : pour que ça marche: doit être plus grande ou égale à celle que j'ai installée -DONE
-mettre un lien comment installer redis -DONE

-pk j'ai choisi le mot backend

-documenter le .env - DONE

-C'est quoi le / meaning dans le backend

-Répéter OAuth2, pointer vers le dashboard

-publier le API refernce

2 thématiques : 
-parler variables 
-comment l'utiliser

swagger
