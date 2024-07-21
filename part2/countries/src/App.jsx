import { useState } from 'react'
import Filter from './components/Filter'
import useCountries from './lib/useCountries'
import SearchResult from './components/SearchResult'

const App = () => {
  const countries = useCountries()
  const [filter, setFilter] = useState('')
  const [countryToShow, setCountryToShow] = useState(null)

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    setCountryToShow(null)
  }

  const filteredCountries = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : null

  if (!countries) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <SearchResult
        countries={filteredCountries}
        countryToShow={countryToShow}
        setCountryToShow={setCountryToShow}
      />
    </>
  )
}

export default App
