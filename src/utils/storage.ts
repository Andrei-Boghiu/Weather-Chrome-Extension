import { City } from './cityOptionList'
import { OpenWeatherTempScale } from './api'

export interface LocalStorage {
	cities?: City[]
	options?: LocalStorageOptions
}

export interface LocalStorageOptions {
	homeCity: City
	tempScale: OpenWeatherTempScale
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

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
	const values: LocalStorage = { options }
	return new Promise((resolve) => {
		chrome.storage.local.set(values, () => {
			resolve()
		})
	})
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
	const keys: LocalStorageKeys[] = ['options']
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (value: LocalStorage) => {
			resolve(value.options)
		})
	})
}
