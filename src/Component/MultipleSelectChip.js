
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';


export default function MultipleSelectChip({ options, onSelect, selectedValue, label }) {
  /**
* @Variables and @Hooks
*/

  const [value, setValue] = useState([]);

  /**
* @Functions
*/

  useEffect(() => {
    if (selectedValue)
      setValue(selectedValue);
  }, [value, selectedValue]);

  const filter = createFilterOptions();

  return (
    <div>
      <Autocomplete
        value={value}
        multiple
        limitTags={5}
        id="multiple-limit-tags"
        options={options}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        sx={{ width: '100%' }}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              title: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              title: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
          onSelect(newValue);
        }}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} />
        )}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.title);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}

      />
    </div>
  );
}

