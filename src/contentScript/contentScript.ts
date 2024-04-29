console.log('content script:')

chrome.runtime.sendMessage('This is a message from content script to background', (res) => {
	console.log(res)
})
