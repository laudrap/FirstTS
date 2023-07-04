
import React, { useEffect } from 'react';

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

interface AppState { data?: any; city: string };

function app2(): JSX.Element {
    {

        const [state, setState] = React.useState<AppState>({ city: "Honolulu" })


        useEffect(() => {
            const fetchWeatherData = async () => {
                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${state.city}&units=metric&appid=ddcb7ebff34fe073865e71aa9b50c157`
                    );
                    const data = await response.json();
                    setState({ ...state, data, city: data?.name });
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                }
            };
            fetchWeatherData();
        }, []);
        const { data, city } = state;

        return (
            <div className="app">
                <div className="container">
                    <div className="top">
                        <div className="d-flex justify-content-center">
                            <h1>{city}</h1>
                        </div>
                        <div className="d-flex justify-content-center country">
                            {data?.sys ? (<h6>{data?.sys.country}</h6>) : null}

                        </div>
                    </div>
                    <div className="Middle">
                        <div>
                            {data?.main ? (<h5 className="Bold">{data?.main.temp} °C</h5>) : null}
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="État">
                            {data?.weather ? (<p className="Bold">{data?.weather[0].main}</p>) : null}
                            <p style={{ fontSize: '35px' }}>
                                {data?.weather ? emojidic[data?.weather[0].main] : null}
                            </p>
                        </div>
                        <div className="Feels">
                            <p className='Bold'>Feels Like</p>
                            {data?.main ? (<p>{data?.main.feels_like} °C</p>) : null}
                        </div>
                        <div className="Hum">
                            <p className="Bold">Humidity</p>
                            {data?.main ? (<p>{data?.main.humidity} %</p>) : null}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default app2;



