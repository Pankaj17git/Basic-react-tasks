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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import axios from 'axios';



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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const KEY = import.meta.env.VITE_WEATHER_API_Key;


  const fetchWeather = async (location) => {
    setLoading(true);
    setError('')
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${location}&days=7`);
      setWeather(response.data);
      console.log(response.data);

    } catch (err) {
      setError('Error fetching weather data.', err)
    }
    setLoading(false);
  };

  useEffect(() => {

    fetchWeather(place);
  }, []);


  const handleOpenDialog = () => {
    setInputValue('');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      setPlace(inputValue.trim());
      fetchWeather(inputValue.trim());
      handleCloseDialog();
    }
  };

  return (
    <>
      <Header />
      {
        weather && (
          <Box sx={{ maxWidth: 800, mx: "auto", p: 2, }}>
            {/* Location */}
            <Typography variant="h6" gutterBottom>
              Results for <strong>{weather.location.name},{weather.location.region}. </strong>
              <span onClick={handleOpenDialog} style={{
                textAlign: 'top', color: 'Blue', fontSize: "0.75rem",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}>Choose location</span>

            </Typography>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
              <DialogTitle>Enter City or Country </DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin='dense'
                  label='Location'
                  type='text'
                  fullWidth
                  variant='outlined'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancle</Button>
                <Button onClick={handleSearch} variant='contained'>Search</Button>
              </DialogActions>
            </Dialog>

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

            {loading && <Typography>Loading...</Typography>}
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Box>
        )
      }

    </>
  )
}

export default Weather;