import { useEffect, useState } from "react";
import "./styles.css";
import rain from "./img/rain.jpg";

function App() {
  const appId = `ae4f8f618394c49b023bdb243bd52dd9`;
  const [country, setCountry] = useState();
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [id, setId] = useState();
  const [img, setImg] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCountry(data.name);
        setDescription(data.weather[0].description);
        setId(data.weather[0].id);
      });
  });

  // this gets current location of user
  function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
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
      setImg(rain);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCountry(e.target[0].value);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${appId}&q=${country}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.weather[0].description);

        setDescription(data.main.description);
        console.log(description);
      })
      .catch((err) => {
        console.log(err.message);
      });

    console.log(description);
  };

  return (
    <div className="container">
      <div className="app">
        <h3>
          Right now in {country}, it's {description}
        </h3>
        <img className="yay" src={img} alt="weather"></img>
        <form onSubmit={handleSubmit}>
          <input type="text" className="" placeholder="Country name" />{" "}
          <button className="">Check weather</button>
        </form>
      </div>
    </div>
  );
}

export default App;
