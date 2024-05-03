import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css'
import './popup.css'
import { WeatherCard } from '../components/WeatherCard/WeatherCard'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { getStoredCities, getStoredOptions, LocalStorageOptions, removeStoredCity } from '../utils/storage'
import { AddCityCTA } from '../components/AddCityCTA/AddCityCTA'
import { cityOptionList } from '../utils/cityOptionList'
import { City } from '../utils/cityOptionList'

const App: React.FC<{}> = () => {
	const [cities, setCities] = useState<City[]>([])
	const [options, setOptions] = useState<LocalStorageOptions | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		getStoredCities().then((cities) => setCities(cities))
		getStoredOptions().then((options) => setOptions(options))
	}, [])

	const handleRemove = async (city) => {
		setIsLoading(true)
		try {
			await removeStoredCity(city)
			const newCities = await getStoredCities()
			setCities(newCities)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	if (!options) {
		return null
	}

	return (
		<>
			<SearchBar citiesOption={cityOptionList} setCities={setCities} options={options} setOptions={setOptions} />
			{cities.length > 0 ? (
				cities.map((cityObj, index) => (
					<WeatherCard
						city={cityObj.name}
						country={cityObj.country}
						key={index}
						setCities={setCities}
						options={options}
						actionButton={handleRemove}
						isLoading={isLoading}
					/>
				))
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
