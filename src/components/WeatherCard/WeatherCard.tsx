import React, { useEffect, useState } from 'react'
import { fetchWeather, WeatherData } from '../../utils/api'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { removeStoredCity, getStoredCities, LocalStorageOptions } from '../../utils/storage'

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

export const WeatherCard: React.FC<{
	city: string
	country: string
	setCities: any | null
	options: LocalStorageOptions
	actionButton: Function
	isLoading: boolean
}> = ({ city, country, setCities, options, actionButton, isLoading }) => {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
	const [cardState, setCardState] = useState<WeatherCardState>('loading')

	useEffect(() => {
		fetchWeather(city, country, options.tempScale)
			.then((data) => {
				setWeatherData(data)
				setCardState('ready')
			})
			.catch((err) => {
				console.log(err)
				setCardState('error')
			})
	}, [city, options.tempScale])

	if (cardState === 'loading' || cardState === 'error') {
		return (
			<WeatherCardContainer>
				<Typography>{cardState === 'loading' ? 'Loading...' : "Error: couldn't provide data for this city"}</Typography>
			</WeatherCardContainer>
		)
	}

	const scale = options.tempScale === 'metric' ? '\u2103' : '\u2109'
	return (
		<WeatherCardContainer>
			<Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }} gutterBottom variant='h5'>
				{weatherData.name}
			</Typography>
			<Typography variant='body2'>{weatherData?.weather[0].description}</Typography>
			<Typography color='text.secondary'>
				Temp: {weatherData.main.temp} {scale}
			</Typography>
			<Typography color='text.secondary'>
				Feels Like: {weatherData.main.feels_like} {scale}
			</Typography>
			<Button
				disabled={isLoading}
				style={{ marginTop: 8 }}
				size='small'
				variant='outlined'
				color='error'
				onClick={() => actionButton(city)}
			>
				{isLoading ? 'REMOVING' : 'REMOVE'}
			</Button>
		</WeatherCardContainer>
	)
}
