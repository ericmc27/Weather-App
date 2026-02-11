const WeatherBox = ({ icon, temp, description, city, country, feelsLike, humidity, visibility}) => {

  return (
    <>
      <div style={{ backgroundImage: "url(clouds.jpg)" }} className="shadow-2xl rounded h-150 w-150 flex flex-col items-center bg-cover">
        <img src={`https://openweathermap.org/payload/api/media/file/${icon}.png`} height={'50'} width={'100'} />
        <div className='flex items-center bg-red gap-2.5'>
          <h1 className='text-3xl text-red-700'>{Math.trunc(temp)}{'\u00B0'}F</h1>
          <span className='text-[18px]'>{'\u007C'}</span>
          <span className='text-blue-600'>{description}</span>
        </div>
        <h1 className='text-2xl text-amber-500'>{city}, {country}</h1>

        <div className='h-full w-full mt-20 flex'>

          <div className='flex h-19 items-center ms-10 gap-4'>
            <img className='h-15 w-15'  src={'wind.png'}  />
            {feelsLike}
          </div>

          <div className='flex h-19 items-center ms-10 gap-4'>
            <img className='h-15 w-15' src={'humidity.png'}  />
            {humidity}
          </div>

          <div className='flex h-19 items-center ms-10 gap-4'>
            <img className='h-15 w-15' src={'pressure.png'}  />
            {humidity}
          </div>

          <div className='flex h-19 items-center ms-10 gap-4'>
            <img className='h-15 w-15' src={'visibility.png'}  />
            {visibility}
          </div>
        </div>
      </div>
    </>
  )
}

export default WeatherBox