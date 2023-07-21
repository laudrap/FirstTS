
import { Spinner } from '@fluentui/react-components';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';

//faMagnifyingGlass is the search emoji from fontawesome
const element = <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" style={{ color: "#ffffff", }} />

interface Dico {
    [key: string]: string;
}

//Dictionary of weather emojis according to the state of a town
const emojidic: Dico = {
    Thunderstorm: '⛈️',
    Drizzle: '🌧️',
    Rain: '🌧️',
    Snow: '❄️',
    Clear: '☀️',
    Clouds: '☁️',
    Mist: '🌫️',
    Smoke: '🌫️',
    Haze: '🌫️',
    Dust: '🌫️',
    Fog: '🌫️',
    Sand: '🌫️',
    Ash: '🌫️',
    Squall: '🌫️',
    Tornado: '🌪️',
};


/**
 * HTML webpage that displays the temperature, felt temperature, humidity level, state, and country of a chosen town.
 * @returns {JSX.Element} The rendered HTML webpage.
 */

function App(): JSX.Element {
    {
        const [data, setData] = useState<any>({});
        const [location, setLocation] = useState('');

        // Replace the URL with the actual backend URL or API endpoint for weather data
        const url = "http://localhost:8701/backend";

        /**
       * Fetches meterological information about the searched town.
       * @param {React.KeyboardEvent<HTMLInputElement>} event - The KeyboardEvent.
       * @returns {Promise<void>} A promise that resolves with JSON containing meterological information about the searched town or an error.
       */

        const searchLocation = async (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                try {
                    const response = await axios.get(url, {
                        params: {
                            loc: location // Include the 'location' parameter in the API request
                        }
                    });
                    setData(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        return (
            <div className="project">
                <div className='about'>
                    <a href="#" data-tool-tip="We're chasing the world's meterological conditions since '23 !">About us</a>
                </div>
                <div className='pagecontainer'>
                    <div className="milieu">
                        <div className="box">
                            <div className='propri_search'>
                                <div className="search">
                                    <div className="icone">
                                        {element}
                                    </div>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(event) => setLocation(event.target.value)}  //updating the location at the change of event
                                        onKeyPress={searchLocation}
                                        placeholder="Enter location"
                                    />
                                </div>
                            </div>
                            <div className="container police">
                                <div className="top">
                                    <div className="d-flex justify-content-center police">
                                        {data ? (<h1>{data.ville}</h1>) : null}
                                    </div>
                                    <div className="d-flex justify-content-center  police">
                                        {data ? (<h6>{data.country}</h6>) : null}

                                    </div>
                                </div>
                                <div className="Middle">
                                    <div>
                                        {data.feels ? (<h5 className="Bold police">{data.feels} °C</h5>) : null}
                                    </div>
                                </div>
                                <div className="milieu">{(data.main && data.feelslike && data.humid) ?
                                    <div className="bottom">
                                        <div className="État">
                                            <p className="Bold police">{data.main}</p>
                                            <p style={{ fontSize: '35px' }}>
                                                {emojidic[data.main]}
                                            </p>
                                        </div>
                                        <div className="Feels">
                                            <p className='Bold police cupcake'>Feels Like</p>
                                            <p className="police">{data.feelslike} °C</p>
                                        </div>
                                        <div className="Hum">
                                            <p className="Bold police">Humidity</p>
                                            <p className="police">{data.humid} %</p>
                                        </div>
                                    </div> : <Spinner size='large' />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default App;

