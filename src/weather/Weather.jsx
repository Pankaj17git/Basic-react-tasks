import Header from '../components/Header'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
} from "@mui/material";


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

const hourlyData = [
  { time: "1 PM", temp: 32 },
  { time: "2 PM", temp: 32 },
  { time: "3 PM", temp: 29 },
  { time: "4 PM", temp: 28 },
  { time: "5 PM", temp: 28 },
  { time: "6 PM", temp: 28 },
  { time: "7 PM", temp: 28 },
  { time: "8 PM", temp: 30 },
];


const Weather = () => {
  return (
    <>
      <Header />
      <Box sx={{ maxWidth: 800, mx: "auto", p: 2, }}>
        {/* Location */}
        <Typography variant="h6" gutterBottom>
          Results for <strong>{mockData.location}</strong>
        </Typography>

        {/* Temperature */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <img src="//cdn.weatherapi.com/weather/64x64/day/116.png" alt="" />
              </Grid>
              <Grid item>
                <Typography variant="h2">{mockData.temp}°C</Typography>
              </Grid>
              <Grid item sx={{ marginLeft: 'auto' }}>
                <Typography variant="h5">Weather</Typography>
                <Typography variant="body1">{mockData.condition}</Typography>
                <Typography variant="body2">{mockData.time}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Stats */}
            <Grid container spacing={2}>
              <Grid item>
                <Chip

                  label={`Precipitation: ${mockData.precipitation}%`}
                />
              </Grid>
              <Grid item>
                <Chip label={`Humidity: ${mockData.humidity}%`} />
              </Grid>
              <Grid item>
                <Chip label={`Wind: ${mockData.wind} km/h`} />
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
              {mockData.forecast.map((day) => (
                <Grid
                  item
                  xs={12}
                  sm={1.5}
                  key={day.day}
                  sx={{
                    textAlign: "center",
                    borderRight: { sm: "1px solid #eee" },
                    "&:last-child": { borderRight: "none" },
                  }}
                >
                  <Typography variant="body2">{day.day}</Typography>
                  <Typography variant="h4"><img src="//cdn.weatherapi.com/weather/64x64/day/176.png" alt="" /></Typography>
                  <Typography variant="body2">
                    {day.high}° / {day.low}°
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Temperature Trend Chart */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Temperature Trend
            </Typography>
            <TemperatureChart hourlyData={hourlyData} />
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
    </>
  )
}

export default Weather;