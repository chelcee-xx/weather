import { useEffect, useState } from "react";
import "./styles.css";
import { Icon } from "@iconify/react";

function App() {
  const appId = `ae4f8f618394c49b023bdb243bd52dd9`;
  const [country, setCountry] = useState();
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [id, setId] = useState();
  const [img, setImg] = useState();
  const [temp, setTemp] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });

      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appId}&units=${unit}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCountry(data.name);
          setDescription(data.weather[0].description);
          setId(data.weather[0].id);
          setTemp(data.main.temp);
          setWind(data.wind.speed);
          setHumidity(data.main.humidity);
          check();
          if (unit ==="metric"){
            document.getElementById("unit").innerHTML="°C"
            document.getElementById("speed").innerHTML="m/s"
          }else{
            document.getElementById("speed").innerHTML="mph"
            document.getElementById("unit").innerHTML="F"
          }
        });
    };
    fetchData();
  },[country,unit,latitude,longitude]);

  // this gets current location of user
  function check() {
    if (id >= 200 && id <= 232) {
      setImg(
        "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/scattered-thunderstorms.svg"
      );
    } else if (id >= 300 && id <= 321) {
      setImg(
        "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rainy-2.svg"
      );
    } else if (id >= 500 && id <= 531) {
      setImg(
        "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rainy-3.svg"
      );
    } else if (id >= 600 && id <= 622) {
      setImg(
        "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/snowy-2.svg"
      );
    } else if (id === 741) {
      setImg(
        "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/fog.svg"
      );
    } else if (id === 761) {
      setImg(
        "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/dust.svg"
      );
    } else if (id >= 701 && id <= 781) {
      setImg(
        "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/haze.svg"
      );
    } else if (id === 800) {
      setImg(
        "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/clear-day.svg"
      );
    } else if (id >= 801 && id <= 804) {
      setImg(
        "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/cloudy.svg"
      );
    } else {
      setImg();
    }
  }

  return (
    <div className="container">
      <div className="app">
        <h3 className="center">
          Right now in {country}, it's {description}
        </h3>
        <div className="flex content">
          <img className="pic" src={img} alt="weather"></img>
          <div className="flex values">
            <h2>
              <Icon icon="mdi:temperature-high" />
              {temp}
              <span id="unit" >°C</span>
            </h2>
            <h2>
              <Icon icon="ph:wind" />
              {wind} <span id="speed">m/s</span>
            </h2>
            <h2>
              <Icon icon="carbon:humidity" />
              {humidity}%
            </h2>
          </div>
        </div>
        <footer className="center">
          <span
            className="unit active"
            id="cel"
            onClick={() => {
              setUnit("metric");
              document.getElementById("cel").classList.add("active");
              document.getElementById("far").classList.remove("active");
            }}
          >
            {" "}
            °C{" "}
          </span>
          |
          <span
            className="unit"
            id="far"
            onClick={() => {
              setUnit("imperial");
              document.getElementById("far").classList.add("active");
              document.getElementById("cel").classList.remove("active");
            }}
          >
            {" "}
            F{" "}
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;
