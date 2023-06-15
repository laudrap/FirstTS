
import { Spinner } from '@fluentui/react-components';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';

const element = <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" style={{ color: "#ffffff", }} />

interface Dico {
    [key: string]: string;
}

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

const name: string = 'souris';


function App(): JSX.Element {
    {
        const [data, setData] = useState<any>({});
        const [location, setLocation] = useState('');

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ddcb7ebff34fe073865e71aa9b50c157`;

        const searchLocation = async (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                try {
                    const response = await axios.get(url);
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
                                        onChange={(event) => setLocation(event.target.value)}
                                        onKeyPress={searchLocation}
                                        placeholder="Enter location"
                                    />
                                </div>
                            </div>
                            <div className="container police">
                                <div className="top">
                                    <div className="d-flex justify-content-center police">
                                        {data?.name ? (<h1>{data.name}</h1>) : null}
                                    </div>
                                    <div className="d-flex justify-content-center  police">
                                        {data?.sys ? (<h6>{data.sys.country}</h6>) : null}

                                    </div>
                                </div>
                                <div className="Middle">
                                    <div>
                                        {data?.main ? (<h5 className="Bold police">{data.main.temp} °C</h5>) : null}
                                    </div>
                                </div>
                                <div className="milieu">{data?.weather && data?.main ?
                                    <div className="bottom">
                                        <div className="État">
                                            <p className="Bold police">{data.weather[0].main}</p>
                                            <p style={{ fontSize: '35px' }}>
                                                {emojidic[data.weather[0].main]}
                                            </p>
                                        </div>
                                        <div className="Feels">
                                            <p className='Bold police cupcake'>Feels Like</p>
                                            <p className="police">{data.main.feels_like} °C</p>
                                        </div>
                                        <div className="Hum">
                                            <p className="Bold police">Humidity</p>
                                            <p className="police">{data.main.humidity} %</p>
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

//<div><MessageTemp /></div>
//<div><BoiteEmoji /></div>
//<div><IlFait /></div>

////{data.weather ? <p className = 'Bold'> data.weather[0].main </p> : null}
//                        <p className = 'Bold'>Cloudy</p>

//const url = "https://api.openweathermap.org/data/2.5/weather?q=Honolulu&units=metric&appid=aa469b1405559ebe8a0fba5c665038c8";
//const data = fetch(url)
//.then(response => response.json())
//.then(data => {
  //const data = data;
 // console.log(data);
//})

//                            if ({data.weather[0].main} == "Clear")
/*
interface Dico {
    [key: string]: string;
}

const emojidic: Dico = {
    Thunderstorm: '\u{1F60E}',
    Drizzle: '\u{1F60E}',
    Rain: '\u{1F60E}',
    Snow: '\u{1F60E}',
    Clear: '\u{1F60E}',
    Clouds: '\u{1F60E}',
    Mist: '\u{1F60E}',
    Smoke: '\u{1F60E}',
    Haze: '\u{1F60E}',
    Dust: '\u{1F60E}',
    Fog: '\u{1F60E}',
    Sand: '\u{1F60E}',
    Ash: '\u{1F60E}',
    Squall: '\u{1F60E}',
    Tornado: '\u{1F60E}',
};


{emojidic[data.weather[0].main]}*/