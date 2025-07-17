
import { useEffect } from 'react';
import Header from './components/Header'
import axios from 'axios';

function App() {
  const URL = import.meta.env.VITE_WEATHER_API;
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(URL);
        console.log("Current Weather:", response.data.current);
        console.log("7-Day Forecast:", response.data.forecast.forecastday);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <>
      <Header/>
      <h1>App</h1>
    </>
  )
}

export default App
