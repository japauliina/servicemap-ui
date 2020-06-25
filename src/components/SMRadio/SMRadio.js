import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
} from '@material-ui/core';

const SMRadio = ({
  classes, controls, initialValue, label, onChange,
}) => {
  console.log('imitialValue', initialValue);
  const [value, setValue] = useState(initialValue);
  return (
    <FormControl component="fieldset" className={classes.formControl}>
      {
        label
        && (
          <FormLabel component="legend">{label}</FormLabel>
        )
      }
      <RadioGroup
        aria-label="Gender"
        name="gender1"
        className={classes.group}
        defaultValue={initialValue}
        value={value}
        onChange={(event, value) => {
          setValue(value);
          if (onChange) {
            onChange(event, value);
          }
        }}
      >
        {
          controls.map(control => (
            <FormControlLabel
              control={<Radio />}
              disabled={!!control.disabled}
              key={control.value}
              value={control.value}
              label={control.label}
            />

          ))
        }
      </RadioGroup>
    </FormControl>
  );
};

SMRadio.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  controls: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  initialValue: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onChange: PropTypes.func,
};

SMRadio.defaultProps = {
  initialValue: null,
  label: null,
  onChange: null,
};

export default SMRadio;
