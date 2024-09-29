import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import useDebounce from '@client/hooks/useDebounce';

interface SearchProps {
  onChange: (coord: LatLngExpression) => void;
}

interface LocationData {
  value: LatLngExpression;
  inputValue: string;
}

export default function Search({ onChange }: SearchProps) {
  const [options, setOptions] = useState<LocationData[]>([]);
  const [value, setValue] = useState<LocationData | null>(null);
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce<string>(inputValue, 500);

  useEffect(() => {
    if (value) {
      onChange(value.value);
    }
  }, [value]);

  useEffect(() => {
    if (debouncedValue.length) {
      fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(debouncedValue)}&format=jsonv2`,
      )
        .then((res) => res.json())
        .then((res) => {
          const locations = Array.isArray(res)
            ? res.map<LocationData>((data) => ({
                value: [data.lat, data.lon],
                inputValue: data.display_name,
              }))
            : [];

          setOptions(locations);
          console.log({ locations });
        });
    }
  }, [debouncedValue]);

  return (
    <div>
      <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        isOptionEqualToValue={(option, value) =>
          option.inputValue === value.inputValue
        }
        getOptionLabel={(option) => option.inputValue}
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Search location" />
        )}
      />
    </div>
  );
}
