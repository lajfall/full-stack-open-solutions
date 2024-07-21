import axios from 'axios'
import { useState, useEffect } from 'react'

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

    if (name) {
      axios
        .get(`${baseUrl}/${name}`)
        .then((response) => response.data)
        .then((data) => {
          const name = data.name.common
          const capital = data.capital[0]
          const population = data.population
          const flag = data.flags.svg
          setCountry({
            found: true,
            data: { name, capital, population, flag },
          })
        })
        .catch(() => {
          setCountry({ found: false })
        })
    }
  }, [name])

  return country
}

export default useCountry
