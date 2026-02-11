import { useState } from "react"
import { getLocation } from "../api/weather"

const WeatherSearchBox = ({ city, state, country, handleOnSubmit }) => {
  const [searchTerm, setSearchTerm] = useState({ city, state, country })

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSearchTerm((prev) => ({ ...prev, [name]: value.toUpperCase() }))
  }

  const onSubmit = async () => {
    handleOnSubmit(searchTerm)
  }


  return (
    <div className="flex flex-col items-center">
      <label className="font-[Bebas_Neue] text-4xl">Country</label>
      <input name='country' className="border h-10 w-60 ps-1 rounded shadow-sm shadow-red-500 focus:outline-0 mb-5" value={searchTerm.country} onChange={handleOnChange} />

      <label className="font-[Bebas_Neue] text-4xl">City</label>
      <input name='city' className="border h-10 w-60 ps-1 rounded shadow-sm shadow-red-500 mb-5" value={searchTerm.city} onChange={handleOnChange} />

      <label className="font-[Bebas_Neue] text-4xl">State</label>
      <input name='state' placeholder="Only for USA" className="border h-10 w-60 ps-1 rounded shadow-sm shadow-red-500 mb-5" value={searchTerm.state} onChange={handleOnChange} />

      <button type="button" className="border w-fit font-[Bebas_Neue] bg-yellow-400 p-4 rounded" onClick={onSubmit}>New Coordinates</button>
    </div>

  )
}

export default WeatherSearchBox