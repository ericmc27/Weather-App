const getCoordinates = async ({city, state, country}) => {
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${import.meta.env.VITE_OPEN_WEATHER_API}`)
  const [{ lat, lon }] = await response.json()
  return { lat, lon }
}

const getLocation = async ({city='Stamford', state='Connecticut', country='United States'}) => {
  const {lat, lon} = await getCoordinates({city, state, country})
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${import.meta.env.VITE_OPEN_WEATHER_API}`)
  const data = await response.json()
  return data
}

const getCountryCode = async (submittedCountry)=>{
  const countriesCode =  await (await fetch('/countries-code.json')).json()
  const countryCode = countriesCode.find(country => country.name.toLowerCase().includes(submittedCountry.trim()))
  return countryCode['alpha-2']
}

export {getLocation, getCountryCode}