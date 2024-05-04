import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Input from '@mui/joy/Input'
import { CardActions, Switch } from '@mui/material'
import { LocalStorageOptions, getStoredOptions, setStoredOptions } from '../utils/storage'

import './options.css'
import { City } from '../utils/cityOptionList'

type FormState = 'ready' | 'saving'

const Options: React.FC<{}> = () => {
	const [homeCity, setHomeCity] = useState<City | null>(null)
	const [options, setOptions] = useState<LocalStorageOptions | null>(null)
	const [formState, setFormState] = useState<FormState>('ready')

	useEffect(() => {
		getStoredOptions().then((options) => setOptions(options))
	}, [])

	const handleOverlaySwitch = (overlayEnabled: boolean) => {
		setOptions({
			...options,
			overlayEnabled,
		})
	}

	const handleHomeCityNameChange = (name: string) => {
		setOptions({
			...options,
			homeCity: {
				...options.homeCity,
				name,
			},
		})
	}

	const handleHomeCityCountryChange = (country: string) => {
		setOptions({
			...options,
			homeCity: {
				...options.homeCity,
				country,
			},
		})
	}

	const handleSaveOptions = () => {
		setFormState('saving')
		setStoredOptions(options).then(() => {
			setTimeout(() => {
				setFormState('ready')
			}, 500)
		})
	}

	if (!options) {
		return null
	}

	return (
		<>
			<Typography variant='h2'>Weather App Options</Typography>
			<Box sx={{ marginBottom: 1 }} mx='10%'>
				<Card variant='outlined'>
					<React.Fragment>
						<CardContent className='flex-row'>
							<Box>
								<Typography variant='body2'>Home City Name</Typography>
								<Input
									placeholder='Type in here…'
									variant='outlined'
									value={options.homeCity.name}
									onChange={(e) => {
										handleHomeCityNameChange(e.target.value)
									}}
									disabled={formState === 'saving'}
								/>
							</Box>
							<Box>
								<Typography variant='body2'>Home City Country Code</Typography>
								<Input
									placeholder='Type in here…'
									variant='outlined'
									value={options.homeCity.country}
									onChange={(e) => handleHomeCityCountryChange(e.target.value)}
									disabled={formState === 'saving'}
								/>
							</Box>
						</CardContent>

						<CardContent>
							<Typography variant='body2'>Overlay Enabled</Typography>
							<Switch
								color='primary'
								checked={options.overlayEnabled}
								onChange={(e, checked) => handleOverlaySwitch(checked)}
								disabled={formState === 'saving'}
							/>
						</CardContent>

						<CardActions>
							<Button color='primary' variant='contained' onClick={handleSaveOptions} disabled={formState === 'saving'}>
								{formState === 'ready' ? 'SAVE' : 'SAVING...'}
							</Button>
						</CardActions>
					</React.Fragment>
				</Card>
			</Box>
		</>
	)
}

const newRoot = document.createElement('div')
newRoot.id = 'root'
document.body.appendChild(newRoot)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Options />
	</React.StrictMode>
)
