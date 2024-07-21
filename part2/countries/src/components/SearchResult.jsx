import CountryDetails from './CountryDetails'

const SearchResult = ({ countries, countryToShow, setCountryToShow }) => {
  if (countries === null) {
    return null
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length > 1) {
    if (countryToShow) {
      return <CountryDetails country={countryToShow} />
    }

    return (
      <div>
        {countries.map((c) => (
          <div key={c.name.common}>
            {c.name.common}{' '}
            <button onClick={() => setCountryToShow(c)}>show</button>
          </div>
        ))}
      </div>
    )
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  }

  return <div>No matches</div>
}

export default SearchResult
