
# Weather application with Auth0

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

#### <u> Why Auth0 as a third-party authentication app ? </u>

- Convenient to install

- Allows to create our own custom connection by giving us access to third-party authentication providers 

- Regulations compliant

Note: For more information about the authentication implementation, click [here](https://auth0.com/blog/complete-guide-to-react-user-authentication/). 


## Server 
<mark>***Backend directory***</mark> : _written in JS_


### <u> Server's Functions </u>

- #### Security 
    - Hides custom API key given by OpenWeather from the public


- #### Performance Optimization
    - Implements Redis cache


- #### Responsible to manage the application's datas
    - Interacts with OpenWeather and the cache
    - Processes datas

- #### Authorization 
    - Validates the authenticity of the JWT given by Auth0
    - Grants access

- #### Error Handling


#### <u> Why use Redis ? </u>

- Optimize the number or requests made to OpenWeather -> less $$

- Allows automatic expiration of the researched weathers after an hour

- Low latency


Note : Click [here](https://github.com/laudrap/FirstTS/edit/main/server/ReadMe.md) for additional information about the server.

## Meteo
<mark>***Frontend directory***</mark> : _written in TS_

- #### Modular Components & files
    - ***LoginButton.tsx*** : Loginb component renders a login button if a user isn't authenticated via Auth0.
    - ***LogoutButton.tsx*** : Logoutb component renders a logout button if a user is authenticated via Auth0.
    - ***Slide.tsx*** : Slide function renders a three-images carousel in the background of the website (automatic switch -> 2 sec. intervals)
    - ***Website.tsx*** : Profile component renders a welcome message when the user is logged in or displays "You need to sign!" when the user isn't. 
    - ***App.tsx*** : App function displays the temperature, felt temperature, humidity level, state, and country of a searched town. Implements the search bar. When the user want to research a town, he/she has to press the "Enter" keyboard. 
    - ***Main2.tsx*** : Main component displays the right order in which components will be rendered on the HTML webpage.
     - ***main.tsx*** : Renders the Main components from Main2.tsx on an HTML webpage and implements OAuth with Auth0.
     - ***index.css***: Contains all the css code. 

## Environment Variables
_Meteo Folder_

- VITE_AUTH0_DOMAIN: The domain of the Auth0 authentication service for the application.

- VITE_AUTH0_CLIENT_ID: The client ID associated with your Auth0 application.

Note : 

1. Set these environment variables in your application's configuration or deployment settings.
2. Keep the values confidential and avoid sharing them publicly.
3. Securely store and access environment variables in your application to prevent security risks.


## 🙌 Contributing

- You can't 😈

## 💅 Formatting

- Check out both eslint files (server and Meteo)


## 📄 License

- Source code in this repository is made available under the [MIT License](https://github.com/laudrap/FirstTS/blob/main/LICENSE.md).