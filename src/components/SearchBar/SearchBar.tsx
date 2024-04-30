import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './SearchBar.css'
import Button from '@mui/material/Button'
// import { IconButton } from '@mui/material'
import { useAutocomplete } from '@mui/base/useAutocomplete'
import { Root, Input, Listbox, Option } from './styles'
import { CityOptionInterface } from '../../popup/popup'
import { addStoredCity, getStoredCities } from '../../utils/storage'

export const SearchBar: React.FC<{
	citiesOption: CityOptionInterface[]
	setCities: any
}> = ({ citiesOption, setCities }) => {
	const [value, setValue] = React.useState<(typeof citiesOption)[number] | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions, focused } = useAutocomplete({
		id: 'search-bar',
		options: citiesOption,
		getOptionLabel: (option) => option.label,
		value,
		onChange: (event, newValue) => setValue(newValue),
		isOptionEqualToValue: (option, value) => option.label === value.label,
	})

	const handleAddCity = async () => {
		setIsLoading(true)
		try {
			await addStoredCity(value.label)

			const newCities = await getStoredCities()
			setCities(newCities)
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
					{(groupedOptions as typeof citiesOption).map((option, index) => (
						<Option {...getOptionProps({ option, index })}>{option.label}</Option>
					))}
				</Listbox>
			)}
		</div>
	)
}
