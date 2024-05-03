import { setStoredCities, setStoredOptions } from '../utils/storage'

console.log('background worker')

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log(message)
	console.log(sender)
	sendResponse('Received!')
})

chrome.runtime.onInstalled.addListener(() => {
	setStoredCities([])
	setStoredOptions({
		overlayEnabled: false,
		tempScale: 'metric',
		homeCity: { name: 'Munich', country: 'DE' },
	})
})
