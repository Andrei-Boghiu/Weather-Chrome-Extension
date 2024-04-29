import React from 'react'
import ReactDOM from 'react-dom/client'
import './options.css'

const newRoot = document.createElement('div')
newRoot.id = 'root'
document.body.appendChild(newRoot)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<h1>Weather App Options</h1>
		<p>What a wonderful option</p>
	</React.StrictMode>
)
