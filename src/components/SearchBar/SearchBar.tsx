import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { useAutocomplete } from '@mui/base/useAutocomplete'
import { Root, Input, Listbox, Option } from './styles'
import { City, CityOption } from '../../utils/cityOptionList'
import { addStoredCity, getStoredCities } from '../../utils/storage'

export const SearchBar: React.FC<{
	citiesOption: CityOption[]
	setCities: React.Dispatch<React.SetStateAction<City[]>>
}> = ({ citiesOption, setCities }) => {
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

	return (
		<div style={{ marginBottom: 14 }}>
			<Root {...getRootProps()} className={focused ? 'Mui-focused' : ''}>
				<Input placeholder='Add a city' {...getInputProps()} />
				{value && (
					<Button disabled={isLoading} onClick={handleAddCity}>
						{isLoading ? '...' : 'Add'}
					</Button>
				)}
			</Root>
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
