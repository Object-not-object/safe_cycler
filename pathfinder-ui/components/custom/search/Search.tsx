import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { LatLngExpression } from 'leaflet'
import { useEffect, useState } from 'react'
import useDebounce from '@client/hooks/useDebounce'
import styles from './Search.module.css'
import Image from 'next/image'
import { InputAdornment } from '@mui/material'

interface SearchProps {
    onChange: (coord: LatLngExpression | null) => void
    onClick: () => void
}

interface LocationData {
    value: LatLngExpression
    inputValue: string
}

export default function Search({ onChange, onClick }: SearchProps) {
    const [options, setOptions] = useState<LocationData[]>([])
    const [value, setValue] = useState<LocationData | null>(null)
    const [inputValue, setInputValue] = useState('')
    const debouncedValue = useDebounce<string>(inputValue, 500)

    useEffect(() => {
        if (value) {
            onChange(value.value)
        } else {
            onChange(null)
        }
    }, [value])

    const resetToDefaultLocation = () => {
        onClick()
    }

    useEffect(() => {
        if (debouncedValue.length) {
            fetch(
                `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(
                    debouncedValue
                )}&format=jsonv2`
            )
                .then((res) => res.json())
                .then((res) => {
                    const locations = Array.isArray(res)
                        ? res.map<LocationData>((data) => ({
                              value: [data.lat, data.lon],
                              inputValue: data.display_name,
                          }))
                        : []

                    setOptions(locations)
                })
        }
    }, [debouncedValue])

    return (
        <div className={styles['search-container']}>
            <div
                className={styles['current-location']}
                onClick={resetToDefaultLocation}
            >
                <Image
                    alt='Current location icon'
                    src='/icons/current-location-icon.png'
                    width={20}
                    height={20}
                />
                Your location
            </div>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue)
                }}
                isOptionEqualToValue={(option, value) =>
                    option.inputValue === value.inputValue
                }
                getOptionLabel={(option) => option.inputValue}
                options={options}
                renderOption={(props, option) => {
                    return (
                        <li {...props} key={option.inputValue}>
                            {option.inputValue}
                        </li>
                    )
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder='Where are we going today?'
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderColor: 'transparent',
                                borderRadius: '0px',
                                borderBottomLeftRadius: '15px',
                                borderBottomRightRadius: '15px',
                                backgroundColor: 'white',
                                paddingLeft: '14px',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                {
                                    borderColor: 'transparent', // Customize border color when focused
                                },
                        }}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment>
                                    <Image
                                        alt='Current location icon'
                                        src='/icons/next-location-icon.png'
                                        width={20}
                                        height={20}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
        </div>
    )
}
