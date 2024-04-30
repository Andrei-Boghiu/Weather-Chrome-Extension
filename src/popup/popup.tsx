import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css'
import './popup.css'
import { fetchWeather } from '../utils/api'
import { WeatherCard } from '../components/WeatherCard/WeatherCard'
import { SearchBar } from '../components/SearchBar/SearchBar'

export interface CityOptionInterface {
	label: string
}

const App: React.FC<{}> = () => {
	const [cities, setCities] = useState<string[]>(['London', 'adasdasdas'])
	const citiesOption: CityOptionInterface[] = [{ label: 'Iasi' }, { label: 'London' }] // TO BE Changed with an API

	return (
		<>
			<SearchBar citiesOption={citiesOption} setCities={setCities} />

			{cities.map((city, index) => (
				<WeatherCard city={city} key={index} setCities={setCities} />
			))}
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
