import React from 'react'
import ReactDOM from 'react-dom/client'
import './popup.css'

const newRoot = document.createElement('div')
newRoot.id = 'root'
document.body.appendChild(newRoot)

const test = <p>Test</p>

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<div>
			<h1>Weather App</h1>
			<p>Feel free to customize it as per your needs.</p>
		</div>
	</React.StrictMode>
)
