import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css'
import './popup.css'
import { WeatherCard } from '../components/WeatherCard/WeatherCard'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { getStoredCities } from '../utils/storage'
import { AddCityCTA } from '../components/AddCityCTA/AddCityCTA'
import { cityOptionList } from '../utils/cityOptionList'
import { City } from '../utils/cityOptionList'

const App: React.FC<{}> = () => {
	const [cities, setCities] = useState<City[]>([])

	useEffect(() => {
		getStoredCities().then((cities) => setCities(cities))
	}, [])

	return (
		<>
			<SearchBar citiesOption={cityOptionList} setCities={setCities} />
			{cities.length > 0 ? (
				cities.map((cityObj, index) => <WeatherCard city={cityObj.name} country={cityObj.country} key={index} setCities={setCities} />)
			) : (
				<AddCityCTA />
			)}
		</>
	)
}

const newRoot = document.createElement('div')
newRoot.id = 'root'
document.body.appendChild(newRoot)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
