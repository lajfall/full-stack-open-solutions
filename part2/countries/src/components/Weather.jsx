import axios from 'axios'
import { useState, useEffect } from 'react'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const [lat, lon] = country.capitalInfo.latlng
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
    const url = `${baseUrl}?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`
    axios.get(url).then((response) => {
      setWeather(response.data)
    })
  }, [country])

  if (!weather) {
    return null
  }

  return (
    <div>
      <div>temperature {weather.main.temp} Celsius</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
        height="100"
      />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather
