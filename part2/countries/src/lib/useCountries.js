import axios from 'axios'
import { useState, useEffect } from 'react'

const useCountries = () => {
  const [countries, setCountries] = useState(null)
  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {
    const saved = localStorage.getItem('countries')

    if (saved) {
      setCountries(JSON.parse(saved))
    } else {
      axios
        .get(url)
        .then((response) => response.data)
        .then((data) => {
          setCountries(data)
          localStorage.setItem('countries', JSON.stringify(data))
        })
    }
  }, [])

  return countries
}

export default useCountries
