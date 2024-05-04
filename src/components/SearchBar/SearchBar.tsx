import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { IconButton } from '@mui/joy'
import { useAutocomplete } from '@mui/base/useAutocomplete'
import Box from '@mui/joy/Box'
import { Root, Input, Listbox, Option } from './styles'
import { City, CityOption } from '../../utils/cityOptionList'
import { addStoredCity, getStoredCities } from '../../utils/storage'
import { LocalStorageOptions, setStoredOptions } from '../../utils/storage'
import { PictureInPicture } from '../svg/svgs'
import { Messages } from '../../utils/messages'
import './SearchBar.css'

export const SearchBar: React.FC<{
	citiesOption: CityOption[]
	setCities: React.Dispatch<React.SetStateAction<City[]>>
	setOptions: React.Dispatch<React.SetStateAction<LocalStorageOptions>>
	options: LocalStorageOptions
}> = ({ citiesOption, options, setCities, setOptions }) => {
	const [value, setValue] = useState<CityOption | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions, focused } = useAutocomplete({
		id: 'search-bar',
		options: citiesOption,
		getOptionLabel: (option) => option.label,
		value,
		onChange: (event, newValue) => setValue(newValue),
		isOptionEqualToValue: (option, value) => option.label === value?.label,
	})

	const handleAddCity = async () => {
		setIsLoading(true)
		try {
			if (value) {
				const cityToAdd: City = {
					name: value.label,
					country: value.country,
				}
				await addStoredCity(cityToAdd)
				const newCities = await getStoredCities()
				setCities(newCities)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setValue(null)
			setIsLoading(false)
		}
	}

	const handleTempScaleChange = () => {
		const updatedOptions: LocalStorageOptions = {
			...options,
			tempScale: options.tempScale === 'imperial' ? 'metric' : 'imperial',
		}

		setStoredOptions(updatedOptions).then(() => {
			setOptions(updatedOptions)
		})
	}

	const handleOverlayChange = () => {
		chrome.tabs.query({ active: true }, (tabs) => {
			if (tabs.length > 0) {
				chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY)
			}
		})
	}

	return (
		<div style={{ marginBottom: 14 }}>
			<Box display='flex' sx={{ justifyContent: 'space-between' }}>
				<Root {...getRootProps()} className={`${focused ? 'Mui-focused' : ''} m-4`} sx={{ width: 270 }}>
					<Input placeholder='Add a city' {...getInputProps()} />
					{value && (
						<Button disabled={isLoading} onClick={handleAddCity} variant='text' color='primary'>
							{isLoading ? '...' : 'Add'}
						</Button>
					)}
				</Root>
				<IconButton color='primary' variant='solid' onClick={handleTempScaleChange} className='m-4'>
					{options.tempScale === 'metric' ? '\u2103' : '\u2109'}
				</IconButton>
				<IconButton color='primary' variant='solid' onClick={handleOverlayChange} className='m-4'>
					<PictureInPicture />
				</IconButton>
			</Box>
			{groupedOptions.length > 0 && (
				<Listbox {...getListboxProps()}>
					{groupedOptions.map((option, index) => (
						<Option key={index} {...getOptionProps({ option, index })}>
							{option.label} ({option.country})
						</Option>
					))}
				</Listbox>
			)}
		</div>
	)
}
