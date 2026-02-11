import { useEffect, useState, useRef } from 'react'
import { getLocation, getCountryCode } from './api/weather'
import WeatherBox from './components/WeatherBox'
import WeatherSearchBox from './components/WeatherSearchBox'
import { motion } from "motion/react"

function App() {
  const [error, setError] = useState({ status: false, message: '' })
  const [weatherData, setWeatherData] = useState({})
  const isFirstRender = useRef(true)

  const handleOnSubmit = async (searchTerm) => {
    const country = searchTerm.country.toLowerCase()
    const currentCountryCode = await getCountryCode(country)

    try {

      if ((country === 'united states' && searchTerm.city !== '') || (country === 'united states' && searchTerm.state !== '')) {
        const currentCountryData = await getLocation({ city: searchTerm.city, state: searchTerm.state, country: currentCountryCode })
        setWeatherData(currentCountryData)
      }

      if ((country === 'united states' && searchTerm.city === '') || (country === 'united states' && searchTerm.state === '')) {
        setError({ status: true, message: 'United States requires both, city and state!' })
      }

      if (country !== 'united states' && searchTerm.state === '') {
        const locationData = await getLocation({ city: searchTerm.city, state: '', country: currentCountryCode })
        setWeatherData(locationData)
      }

      if (country !== 'united states' && searchTerm.state !== '') {
        setError({ status: true, message: 'You must delete the state from your search criteria!' })

      }

    } catch (err) {
      setError({ status: true, message: 'Your search criteria is not valid!' })
    }


  }

  useEffect(() => {
    const loadLocation = async () => {
      const data = await getLocation({})
      setWeatherData(data)
    }

    loadLocation()
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setTimeout(() => {
      setError({ status: false, message: '' })
    }, 9000)

  }, [error.status])

  return (
    <div className='h-screen grid grid-cols-[1fr_1fr_1fr] bg-linear-to-b from-[#131862] to-white'>
      <div>
        <img className='ms-8 mt-8' src={'/moon.png'} width={'80'} />
        <img className='ms-25 mt-15' src={'/birds.gif'} width={'180'} />
      </div>

      {
        weatherData?.name && (
          <>
            <div className='col-start-2 flex items-center'>
              <WeatherBox
                icon={weatherData?.weather?.[0].icon}
                temp={weatherData?.main?.temp}
                description={weatherData?.weather?.[0].description}
                city={weatherData?.name}
                country={weatherData?.sys?.country}
                feelsLike={weatherData?.main?.feels_like}
                humidity={weatherData?.main?.humidity}
                visibility={weatherData?.visibility}
              />
            </div>

            <div className='flex flex-col items-center'>
              <img className='mb-10' src={'/helicopter.gif'} width={'180'} />

              <WeatherSearchBox city={'STAMFORD'} state={'CONNECTICUT'} country={'UNITED STATES'} handleOnSubmit={handleOnSubmit} />

              {error.status && (
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 0.6, repeat: 12, ease: 'easeInOut' }} className='border p-1 h-20 w-90 mt-10 rounded bg-white shadow shadow-red-500'>
                  {error.message}
                </motion.div>
              )}
            </div>
          </>)
      }

    </div>
  )
}

export default App
