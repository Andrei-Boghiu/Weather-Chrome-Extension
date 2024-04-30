import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Input from '@mui/joy/Input'
import { CardActions } from '@mui/material'

import './options.css'

const newRoot = document.createElement('div')
newRoot.id = 'root'
document.body.appendChild(newRoot)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Typography variant='h2'>Weather App Options</Typography>
		<Box sx={{ marginBottom: 1 }} mx='10%'>
			<Card variant='outlined'>
				<React.Fragment>
					<CardContent>
						<Typography variant='body2'>Option One</Typography>
						<Input placeholder='Type in here…' variant='outlined' />
					</CardContent>
					<CardContent>
						<Typography variant='body2'>Option One</Typography>
						<Input placeholder='Type in here…' variant='outlined' />
					</CardContent>

					<CardActions>
						<Button color='primary' variant='contained'>
							Save
						</Button>
					</CardActions>
				</React.Fragment>
			</Card>
		</Box>
	</React.StrictMode>
)
