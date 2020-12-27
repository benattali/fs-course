import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
    const [ weather, setWeather ] = useState([])

    const country = props['country']['name']
    const capital = props['country']['capital']
    const weatherAPI = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}, ${country}`

    useEffect(() => {
        axios
          .get(weatherAPI)
          .then(response => {
            setWeather(response.data['current'])
          })
      }, [])
    
    console.log('weather is ', weather)
    const temp = weather['temperature']
    const wind_speed = weather['wind_speed']
    const wind_dir = weather['wind_dir']
    const weather_img = weather['weather_icons']

    return (
        <div>
            <h3>weather in {capital}, {country}</h3>
            <p>temperaure: {temp} celsius</p>
            <img src={weather_img} alt={`weather in ${capital}, ${country}`} height='50'/>
            <p>wind: {wind_speed} mph direction {wind_dir}</p>
        </div>
    )
}

export default Weather
