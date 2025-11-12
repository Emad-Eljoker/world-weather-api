import {
  Card,
  Button,
  Typography,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";

//icons
import NightsStayIcon from "@mui/icons-material/NightsStay";
import CloudIcon from "@mui/icons-material/Cloud";
import SearchIcon from "@mui/icons-material/Search";

//Extra
import axios from "axios";
import { useEffect, useState } from "react";
//data
const key = "e2a11bca70d259e73ca948d2d43a76a6";

export default function WeatherCard() {
  const [city, SetCity] = useState("cairo");
  const [geoData, setGeoData] = useState({
    lon: "31.233334",
    lat: "30.033333",
  });
  const { lat, lon } = geoData;

  const [weatherData, setWeatherData] = useState({});
  //  let temp = weatherData.main?.temp;
  function fetchWeather() {
    if (city) {
      axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`
        )
        .then(function (res) {
          const fetchData = res.data[0];

          setGeoData(fetchData);
          console.log("====fetchData====");
          console.log(geoData);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("incorrect input ");
    }
  }

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
      )
      .then(function (response) {
        console.log("====geoData====");

        const data = response.data;
        setWeatherData({ ...data, 
          temp: Math.round(data.main.temp - 273.15),
        min:Math.round(data.main.temp_min -273.15),
        max:Math.ceil(data.main.temp_max -273.15),
        dis:data.weather[0].description,
        icon:data.weather[0].icon,
        });
        console.log(weatherData);
      });
  }, [geoData]);

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          padding: "10px",
          background: "rgba(30, 20, 212, 0.4)",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0px 0px 7px rgba(0,0,0,0.4)",
        }}
      >
       <TextField
  onChange={(e) => SetCity(e.target.value)}
  value={city}
  onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
  variant="outlined"
  placeholder="اكتب اسم المدينة"
  sx={{
    mt: 2,
    mb: 2,
    width: "100%",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": { border: "none" },
      "&:hover fieldset": { border: "none" },
      "&.Mui-focused fieldset": { border: "none" },
      color: "white",
    },
    "& input": { 
      color: "white",
      textAlign: "center"   
    },
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <Button sx={{ color: "white" }} onClick={fetchWeather}>
          <SearchIcon />
          بحث
        </Button>
      </InputAdornment>
    ),
  }}
/>


        {/* Header */}
        <div
          style={{
            display: "flex",
            direction: "rtl",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" dir="rtl" sx={{ ml: "30px" }}>
            {geoData.name}
          </Typography>
          <Typography variant="h5" dir="rtl" sx={{ mt: "30px" }}>
            نوفمبر ٦ _ ٢٠٢٥
          </Typography>
        </div>
        <hr />

        {/* body */}
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            direction: "rtl",
            padding: "10px",
            // background:"green",
            position: "relative",
          }}
        >
          {/* right */}
          <div
            style={{
              display: "flex",

              flexDirection: "column",
              //  background:"red",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h2" dir="rtl">
              {weatherData.temp}
   <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt="weather"
                style={{ width: "100px" }}
              />
            </Typography>
            <Typography variant="h5" dir="rtl">
             {weatherData.dis}
            </Typography>
            <Typography variant="p" dir="ltr" sx={{ mt: "40px", ml: "40px" }}>
            {weatherData.max} :الصغري: {weatherData.min} | الكبري
            </Typography>
          </div>

          {/* left */}
          <div
            style={{
              direction: "rtl",
              position: "absolute",
              right: "63%",
            }}
          >
            <CloudIcon sx={{ fontSize: "120px", color: "#B6771D" }} />
          </div>
        </div>
        {/* == body */}
      </Card>

      <Button
        sx={{
          fontFamily: "IBM",
          fontSize: "20px",
          color: "white",
          mt: "10px",
          ml: "20px",
          mr: "auto",
        }}
        variant="text"
      >
        انجليزي
      </Button>
    </Container>
  );
}
