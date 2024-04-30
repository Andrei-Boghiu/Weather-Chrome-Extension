const WEATHER_API_KEY = process.env.WEATHER_API_KEY

export async function fetchWeather(city: string): Promise<any> {
	const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${WEATHER_API_KEY}`)

	if (!res.ok) {
		throw new Error('API ERROR')
	}

	const data = await res.json()
	return data
}
