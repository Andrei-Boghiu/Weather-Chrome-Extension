import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './popup.css'
import { fetchWeather } from '../utils/api'

const App: React.FC<{}> = () => {
	useEffect(() => {
		fetchWeather('London')
			.then((data) => console.log(data))
			.catch((err) => console.log(err))
	}, [])

	return (
		<>
			<h2>App</h2>
		</>
	)
}

const newRoot = document.createElement('div')
newRoot.id = 'root'
document.body.appendChild(newRoot)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<div>
			<h1>Weather App</h1>
			<p>Feel free to customize it as per your needs.</p>
			<App />
		</div>
	</React.StrictMode>
)
