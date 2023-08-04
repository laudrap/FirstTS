
# Server

This folder is a Node.js server built with Express, which fetches weather data from the OpenWeatherMap API and caches it using Redis. The server is secured using OAuth2 JWT (JSON Web Tokens) authentication.


``` 
cd server
npm i 
```

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

Note : You can also see the command line to  install each dependency. 


- [axios](https://axios-http.com/docs/intro) : ^1.4.0 
```
npm install axios
```

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

- [node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) : ^20.4.0
```
npm install -g npm (pt a enlever)
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
to check the version : 

```
redis-cli --version
```


### For a quick install : 

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

## Variables 


### Documentation .env

_This practice prevents hardcoding values, an unsecure way of developping applications._

- CLIENT_URL : Website link were the meteo app is rendered.

- AUTH_AUDIENCE : Environment variable representing the audience for authentication.

- AUTH_ISSUER :  Environment variable representing the issuer for authentication.

### Documentation const

- checkJwt :  Middleware function to check JSON Web Tokens (JWT) for authentication.

- app : Creates a new Express application.

- app.use(cors()) : Enables Cross-Origin Resource Sharing (CORS) middleware for the Express application.

- cliente : A Redis client instance.

### Documentation function








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
