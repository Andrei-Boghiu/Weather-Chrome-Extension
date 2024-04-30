import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css'
import './popup.css'
import { WeatherCard } from '../components/WeatherCard/WeatherCard'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { getStoredCities } from '../utils/storage'
import { AddCityCTA } from '../components/AddCityCTA/AddCityCTA'

export interface CityOptionInterface {
	label: string
}

const App: React.FC<{}> = () => {
	const [cities, setCities] = useState<string[]>([])
	const citiesOption: CityOptionInterface[] = [{ label: 'Iasi' }, { label: 'London' }] // TO BE Changed with an API

	useEffect(() => {
		getStoredCities().then((cities) => setCities(cities))
	}, [])

	return (
		<>
			<SearchBar citiesOption={citiesOption} setCities={setCities} />
			{cities.length > 0 ? cities.map((city, index) => <WeatherCard city={city} key={index} setCities={setCities} />) : <AddCityCTA />}
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
