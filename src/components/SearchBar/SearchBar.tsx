import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { IconButton } from '@mui/joy'
import { useAutocomplete } from '@mui/base/useAutocomplete'
import Box from '@mui/joy/Box'
import { Root, Input, Listbox, Option } from './styles'
import { City, CityOption } from '../../utils/cityOptionList'
import { addStoredCity, getStoredCities } from '../../utils/storage'
import { LocalStorageOptions, setStoredOptions } from '../../utils/storage'

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

	return (
		<div style={{ marginBottom: 14 }}>
			<Box display='flex' sx={{ justifyContent: 'space-between' }}>
				<Root {...getRootProps()} className={focused ? 'Mui-focused' : ''} sx={{ width: 270 }}>
					<Input placeholder='Add a city' {...getInputProps()} />
					{value && (
						<Button disabled={isLoading} onClick={handleAddCity}>
							{isLoading ? '...' : 'Add'}
						</Button>
					)}
				</Root>
				<IconButton color='primary' variant='soft' onClick={handleTempScaleChange}>
					{options.tempScale === 'metric' ? '\u2103' : '\u2109'}
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
