import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './SearchBar.css'
import Button from '@mui/material/Button'
// import { IconButton } from '@mui/material'
import { useAutocomplete } from '@mui/base/useAutocomplete'
import { Root, Input, Listbox, Option } from './styles'
import { CityOptionInterface } from '../../popup/popup'

export const SearchBar: React.FC<{
	citiesOption: CityOptionInterface[]
	setCities: any
}> = ({ citiesOption, setCities }) => {
	const [value, setValue] = React.useState<(typeof citiesOption)[number] | null>(null)

	const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions, focused } = useAutocomplete({
		id: 'search-bar',
		options: citiesOption,
		getOptionLabel: (option) => option.label,
		value,
		onChange: (event, newValue) => setValue(newValue),
		isOptionEqualToValue: (option, value) => option.label === value.label,
	})

	const handleAddCity = () => {
		console.log(value)

		setCities((prevValue: CityOptionInterface[]) => [...prevValue, value.label])

		setValue(null)
	}

	return (
		<div style={{ marginBottom: 14 }}>
			<Root {...getRootProps()} className={focused ? 'Mui-focused' : ''}>
				<Input placeholder='Add a city' {...getInputProps()} />
				{value && <Button onClick={handleAddCity}>Add</Button>}
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
