import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { WeatherCard } from '../components/WeatherCard/WeatherCard'
import { getStoredOptions, LocalStorageOptions } from '../utils/storage'
import { Card } from '@mui/material'
import { Messages } from '../utils/messages'
import './contentScript.css'

const ContentScript: React.FC<{}> = () => {
	const [options, setOptions] = useState<LocalStorageOptions | null>(null)
	const [showOverlay, setShowOverlay] = useState<boolean>(false)

	useEffect(() => {
		getStoredOptions().then((options) => {
			setOptions(options)
			setShowOverlay(options.overlayEnabled)
		})
	}, [])

	useEffect(() => {
		chrome.runtime.onMessage.addListener((msg) => {
			if (msg === Messages.TOGGLE_OVERLAY) {
				setShowOverlay(!showOverlay)
			}
		})
	}, [showOverlay])

	if (!options) {
		return null
	}

	return (
		<>
			{showOverlay && (
				<Card className='overlay_content_script_2b89b' variant='outlined'>
					<WeatherCard
						city={options?.homeCity.name}
						country={options?.homeCity.country}
						options={options}
						setCities={null}
						isLoading={false}
						actionButton={() => setShowOverlay(false)}
					/>
				</Card>
			)}
		</>
	)
}

const r = document.createElement('div')
r.id = 'content_script_root_n1231p'
document.body.appendChild(r)

const root = ReactDOM.createRoot(document.getElementById('content_script_root_n1231p') as HTMLElement)

root.render(
	<React.StrictMode>
		<ContentScript />
	</React.StrictMode>
)
