import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './WeatherCard.css'
import { fetchWeather, WeatherData } from '../../utils/api'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const WeatherCardContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Box sx={{ minWidth: 275, marginBottom: 1.5 }}>
			<Card variant='outlined'>
				<React.Fragment>
					<CardContent>{children}</CardContent>
				</React.Fragment>
			</Card>
		</Box>
	)
}

type WeatherCardState = 'loading' | 'error' | 'ready'

export const WeatherCard: React.FC<{ city: string; setCities: any }> = ({ city, setCities }) => {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
	const [cardState, setCardState] = useState<WeatherCardState>('loading')

	useEffect(() => {
		fetchWeather(city)
			.then((data) => {
				setWeatherData(data)
				setCardState('ready')
			})
			.catch((err) => {
				console.log(err)
				setCardState('error')
			})
	}, [city])

	if (cardState === 'loading' || cardState === 'error') {
		return (
			<WeatherCardContainer>
				<Typography>{cardState === 'loading' ? 'Loading...' : "Error: couldn't provide data for this city"}</Typography>
			</WeatherCardContainer>
		)
	}

	const handleRemove = () => {
		console.log(weatherData.name)
	}

	return (
		<WeatherCardContainer>
			<Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }} gutterBottom variant='h5'>
				{weatherData.name}
			</Typography>
			<Typography variant='body2'>{weatherData?.weather[0].description}</Typography>
			<Typography color='text.secondary'>Temp: {weatherData.main.temp}°C</Typography>
			<Typography color='text.secondary'>Feels Like: {weatherData.main.feels_like}°C</Typography>
			<Button style={{ marginTop: 8 }} size='small' variant='outlined' color='error' onClick={handleRemove}>
				Remove
			</Button>
		</WeatherCardContainer>
	)
}
