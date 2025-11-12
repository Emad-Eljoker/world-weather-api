import {
  Card,
  Button,
  Typography,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/min/locales";

const key = "e2a11bca70d259e73ca948d2d43a76a6";
let cancel = null;

export default function WeatherCard() {
  const [lang, setLang] = useState("ar"); // اللغة الحالية
  const [date, setDate] = useState("");
  const [city, SetCity] = useState("cairo");
  const [geoData, setGeoData] = useState({
    lon: "31.233334",
    lat: "30.033333",
    name: "Cairo",
  });
  const [weatherData, setWeatherData] = useState({});

  const { lat, lon } = geoData;

  // 🔹 تغيير اللغة
  const toggleLang = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    setLang(newLang);
    moment.locale(newLang);
  };

  function fetchWeather() {
    if (city.trim() !== "") {
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}&lang=${lang}`
        )
        .then((res) => {
          if (res.data.length === 0) {
            alert(
              lang === "ar"
                ? "اسم المدينة غير صحيح، حاول مرة أخرى"
                : "Invalid city name, try again"
            );
            return;
          }

          const fetchData = res.data[0];
          setGeoData({
            lon: fetchData.lon,
            lat: fetchData.lat,
            name: fetchData.local_names?.[lang] || fetchData.name,
          });
        })
        .catch(() =>
          alert(
            lang === "ar"
              ? "حدث خطأ أثناء الاتصال بالخادم!"
              : "An error occurred while connecting to the server!"
          )
        );
    } else {
      alert(
        lang === "ar" ? "من فضلك اكتب اسم المدينة أولاً" : "Please enter a city name first"
      );
    }
  }

  useEffect(() => {
    moment.locale(lang);
    setDate(moment().format("dddd - Do MMM - YYYY"));

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}`,
        {
          cancelToken: new axios.CancelToken((can) => {
            cancel = can;
          }),
        }
      )
      .then((response) => {
        const data = response.data;
        setWeatherData({
          temp: Math.round(data.main.temp - 273.15),
          min: Math.round(data.main.temp_min - 273.15),
          max: Math.ceil(data.main.temp_max - 273.15),
          dis: data.weather[0].description,
          icon: data.weather[0].icon,
        });
      })
      .catch((error) => {
        if (!axios.isCancel(error)) console.error(error);
      });

    return () => cancel && cancel();
  }, [geoData, lang]);

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
        {/* خانة البحث */}
        <TextField
          value={city}
          onChange={(e) => SetCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          placeholder={lang === "ar" ? "اكتب اسم المدينة" : "Enter city name"}
          variant="outlined"
          sx={{
            mt: 2,
            mb: 2,
            width: "100%",
            bgcolor: "rgba(255,255,255,0.1)",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset, &:hover fieldset, &.Mui-focused fieldset": {
                border: "none",
              },
              color: "white",
            },
            "& input": { color: "white", textAlign: "center" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button sx={{ color: "white" }} onClick={fetchWeather}>
                  <SearchIcon />
                  {lang === "ar" ? "بحث" : "Search"}
                </Button>
              </InputAdornment>
            ),
          }}
        />

        {/* العنوان */}
        <div style={{ display: "flex", direction: lang === "ar" ? "rtl" : "ltr", alignItems: "center" }}>
          <Typography variant="h2" sx={{ ml: "30px" }}>
            {geoData.name}
          </Typography>

          <Typography variant="h5" sx={{ mt: "30px", ml: "auto" }}>
            {date}
          </Typography>
        </div>
        <hr />

        {/* جسم الكارت */}
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            direction: lang === "ar" ? "rtl" : "ltr",
            padding: "10px",
            position: "relative",
          }}
        >
          {/* يمين */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h2">
              {weatherData.temp}
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt="weather"
                style={{ width: "100px" }}
              />
            </Typography>
            <Typography variant="h5">{weatherData.dis}</Typography>

            <Typography variant="p" sx={{ mt: "40px", ml: "40px" }}>
              {lang === "ar"
                ? `الصغرى: ${weatherData.min} | الكبرى: ${weatherData.max}`
                : `Min: ${weatherData.min} | Max: ${weatherData.max}`}
            </Typography>
          </div>

          {/* شمال */}
          <div
            style={{
              position: "absolute",
              right: lang === "ar" ? "63%" : "10%",
              bottom: "60px",
            }}
          >
            <CloudIcon sx={{ fontSize: "120px" }} />
          </div>
        </div>
      </Card>

      {/* زر تغيير اللغة */}
      <Button
        sx={{
          fontFamily: "IBM",
          fontSize: "20px",
          color: "white",
          mt: "10px",
          ml: "20px",
        }}
        variant="text"
        onClick={toggleLang}
      >
        {lang === "ar" ? "English" : "عربي"}
      </Button>
    </Container>
  );
}
