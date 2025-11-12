<TextField
  onChange={(e) => {
    SetCity(e.target.value);
  }}
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
    //   textAlign: "center !important",
    },
    input: { color: "white" },
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        {" "}
        <Button sx={{ color: "white" }} onClick={fetchWeather}>
          {" "}
          <SearchIcon /> بحث{" "}
        </Button>{" "}
      </InputAdornment>
    ),
  }}
/>;
