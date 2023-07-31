
# Meteo application with auth0

This app allows you to search the weather of your chosen location once you're logged in with auth0. If you've searched the same city in the last hour, the backend retrieves the weather values from the cache. If not, a request is made to the OpenWeather API.

## ⚡Quick Start

1. Open the server directory
    ```bash
    cd server
    ```
2. Start the server
    ```bash
    npm run devo
    ```

3. Open the Meteo directory
    ```bash
    cd Meteo
    ```

4. Run the React script

    ```bash
    npm run dev
    ```
5. Click on ***Open in the browser*** or copy and paste http://localhost:5173 in the bowser.

```Make sure to open the three following ports :```

- 5173 : React/Vite
- 8791 : Server 
- 6379 : Redis


## 🔒 Authentication

```To request the weather you need to be authenticated.``` We use [Auth0](https://auth0.com/) to do so. 

For a personalized welcome, you can either use :

- [Google](https://www.google.com/account/about/?hl=en-GB) account

- [Facebook](https://www.facebook.com/) account


Note : You can also sign in with an email address. 

### <u> Why Auth0 ? </u>

- Convenient to install

- Allows us to create our own custom connection

- Regulations compliant


## 🙌 Contributing

You can't 😈

eslint