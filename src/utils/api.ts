import { WEATHER_API_KEY } from '../private/private'

export interface CoordinatesData {
	name: string
	country: string
	lat: number
	lon: number
}

export interface WeatherData {
	name: string
	main: {
		feels_like: number
		humidity: number
		pressure: number
		temp: number
		temp_max: number
		temp_min: number
	}
	weather: {
		description: string
		icon: string
		id: number
		main: string
	}[]
	wind: {
		deg: number
		speed: number
	}
}

export type OpenWeatherTempScale = 'metric' | 'imperial'

export async function fetchWeather(city: string, country: string, tempScale: OpenWeatherTempScale): Promise<WeatherData> {
	const coordinates = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${WEATHER_API_KEY}`)
	if (!coordinates.ok) {
		throw new Error('COORDINATES API ERROR')
	}

	const coordinatesData: CoordinatesData[] = await coordinates.json()
	const { lat, lon, name } = coordinatesData[0]

	const weather = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${tempScale}&appid=${WEATHER_API_KEY}`
	)
	if (!weather.ok) {
		throw new Error('WEATHER API ERROR')
	}

	const weatherData: WeatherData = await weather.json()

	weatherData['name'] = name

	return weatherData
}
