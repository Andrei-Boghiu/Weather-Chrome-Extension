import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
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

export const AddCityCTA: React.FC<{}> = () => {
	return (
		<WeatherCardContainer>
			<Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }} gutterBottom variant='h3'>
				Add A City 🎉
			</Typography>
			<Typography variant='body1'>Use the above search field to add a city!</Typography>
		</WeatherCardContainer>
	)
}
