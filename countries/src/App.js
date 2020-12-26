import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ShowData from './components/ShowData'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ showAll, setShowAll ] = useState([])

    useEffect(() => {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountries(response.data)
        })
    }, [])
    
  const HandleShow = (event) => {
    const show = countries.filter(country => {
      if (country.name.toLowerCase().includes(event.target.value.toLowerCase())) {
        return country
      }
      return ''
    })
    setShowAll(show)
  }

  return (
    <div>

      <Filter handler={HandleShow}/>

      <ShowData showAll={showAll}/>

    </div>
  )
}

export default App;
