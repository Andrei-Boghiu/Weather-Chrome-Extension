import React from 'react'
import ReactDOM from 'react-dom/client'
import './options.css'
// const test = <p>Helloww mf</p>

const newRoot = document.createElement('div')
newRoot.id = 'root'
document.body.appendChild(newRoot)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<h1>Options Page</h1>
		<p>What a wonderful option</p>
	</React.StrictMode>
)
