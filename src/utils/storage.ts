export interface LocalStorage {
	cities?: string[]
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredCities(cities: string[]): Promise<void> {
	const values: LocalStorage = { cities }
	return new Promise((resolve, reject) => {
		chrome.storage.local.set(values, () => {
			resolve()
		})
	})
}

export function getStoredCities(): Promise<string[]> {
	const keys: LocalStorageKeys[] = ['cities']
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) => {
			resolve(res.cities ?? [])
		})
	})
}

export async function addStoredCity(newCity: string): Promise<void> {
	const cities = await getStoredCities()
	const newCities = [...cities, newCity]
	await setStoredCities(newCities)
}

export async function removeStoredCity(city: string): Promise<void> {
	const cities = await getStoredCities()
	console.log(cities)
	const indexToRemove = cities.indexOf(city)
	console.log(`index to remove: ${indexToRemove}`)

	const newCities = [...cities]
	newCities.splice(indexToRemove, 1)

	console.log(newCities)
	await setStoredCities(newCities)
}
