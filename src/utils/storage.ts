import { City } from './cityOptionList'

export interface LocalStorage {
	cities?: City[]
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredCities(cities: City[]): Promise<void> {
	const values: LocalStorage = { cities }
	return new Promise((resolve) => {
		chrome.storage.local.set(values, () => {
			resolve()
		})
	})
}

export function getStoredCities(): Promise<City[]> {
	const keys: LocalStorageKeys[] = ['cities']
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) => {
			resolve(res.cities ?? [])
		})
	})
}

export async function addStoredCity(newCity: City): Promise<void> {
	const cities: City[] = await getStoredCities()
	const newCities = [...cities, newCity]
	await setStoredCities(newCities)
}

export async function removeStoredCity(cityName: string): Promise<void> {
	const cities = await getStoredCities()
	const filteredCities = cities.filter((city) => city.name !== cityName)
	await setStoredCities(filteredCities)
}
