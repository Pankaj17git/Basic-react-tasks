import Header from '../components/Header'
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
} from "@mui/material";
import axios from 'axios';
import { data } from 'react-router';


const mockData = {
  location: "Mauli Baidwan, Punjab",
  time: "Tuesday, 9:00 pm",
  condition: "Mostly Cloudy",
  temp: 29,
  high: 32,
  low: 27,
  precipitation: 10,
  humidity: 75,
  wind: 16,
  forecast: [
    { day: "Tue", icon: "🌧️", high: 32, low: 27 },
    { day: "Wed", icon: "🌧️", high: 31, low: 26 },
    { day: "Thu", icon: "🌧️", high: 31, low: 27 },
    { day: "Fri", icon: "🌧️", high: 31, low: 27 },
    { day: "Sat", icon: "🌧️", high: 34, low: 28 },
    { day: "Sun", icon: "⛅", high: 34, low: 27 },
    { day: "Mon", icon: "🌧️", high: 30, low: 27 },
  ],
};

/*{const hourlyData = [
  { time: "1 PM", temp: 32 },
  { time: "2 PM", temp: 32 },
  { time: "3 PM", temp: 29 },
  { time: "4 PM", temp: 28 },
  { time: "5 PM", temp: 28 },
  { time: "6 PM", temp: 28 },
  { time: "7 PM", temp: 28 },
  { time: "8 PM", temp: 30 },
];}*/


const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [place, setPlace] = useState('India')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const KEY = import.meta.env.VITE_WEATHER_API_Key;

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${place}&days=7`);
        setWeather(response.data);
        console.log(response.data);

      } catch (err) {
        setError('Error fetching weather data.', err)
      }
      setLoading(false);
    };
    fetchWeather();
  }, [])

  return (
    <>
      <Header />
      {
        weather && (
          <Box sx={{ maxWidth: 800, mx: "auto", p: 2, }}>
            {/* Location */}
            <Typography variant="h6" gutterBottom>
              Results for <strong>{weather.location.region}, {weather.location.country}</strong>
            </Typography>

            {/* Temperature */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <img src={weather.current.condition.icon} alt="" />
                  </Grid>
                  <Grid item>
                    <Typography variant="h2">{Math.round(weather.current.temp_c)}<span style={{}}>°C</span></Typography>
                  </Grid>
                  <Grid item sx={{ marginLeft: 'auto' }}>
                    <Typography variant="h5" sx={{ textAlign: 'right' }}>Weather</Typography>
                    <Typography variant="body1">{weather.current.condition.text}</Typography>
                    <Typography variant="body2">Time : {weather.current.last_updated}</Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Stats */}
                <Grid container spacing={2}>
                  <Grid item>
                    <Chip

                      label={`Precipitation: ${weather.forecast.forecastday[0].day.daily_chance_of_rain}%`}
                    />
                  </Grid>
                  <Grid item>
                    <Chip label={`Humidity: ${weather.current.humidity}%`} />
                  </Grid>
                  <Grid item>
                    <Chip label={`Wind: ${Math.round(weather.current.wind_kph)} km/h`} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Forecast */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  7-Day Forecast
                </Typography>
                <Grid container spacing={2} justifyContent="space-between">
                  {weather.forecast.forecastday.map((day) => (
                    <Grid
                      item
                      xs={12}
                      sm={1.5}
                      key={day.date}
                      sx={{
                        textAlign: "center",
                        borderRight: { sm: "1px solid #eee" },
                        "&:last-child": { borderRight: "none" },
                      }}
                    >
                      {/* Day of week */}
                      <Typography variant="body2">
                        {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                      </Typography>

                      {/* Icon */}
                      <img
                        src={`https:${day.day.condition.icon}`}
                        alt={day.day.condition.text}
                        width={48}
                        height={48}
                      />

                      {/* Temps */}
                      <Typography variant="body2">
                        {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
                      </Typography>
                    </Grid>
                  ))}

                </Grid>
              </CardContent>
            </Card>

            {/* Warning */}
            <Card sx={{ backgroundColor: "#ffebee", borderLeft: "4px solid #d32f2f" }}>
              <CardContent>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    {/* <WarningIcon color="error" /> */}
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" color="error">
                      Excessive heat
                    </Typography>
                    <Typography variant="body2">
                      {mockData.location} — 2 hours ago
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        )
      }

    </>
  )
}

export default Weather;