import React, { Component, Fragment } from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { SearchInSelectProps } from '../models/models';

class SearchInSelect extends Component<any, SearchInSelectProps> {

    constructor(searchInSelectProps: SearchInSelectProps) {
        super(searchInSelectProps);
    }

    componentDidMount(): void {
        const { defaultValue, onChange } = this.props;

        // init default value for selectors
        onChange(defaultValue);
    }

    render() {
        const { id, label, data, defaultValue, getOptionLabel, renderOptionFragment, startAdornmentFragment, boxStyles, inputStyles, onChange } = this.props;
        return (
            <FormControl className={boxStyles}>
                <Autocomplete
                    id={id}
                    options={data}
                    autoHighlight
                    getOptionLabel={getOptionLabel}
                    value={defaultValue}
                    onChange={(event, value, reason) => {
                        onChange(value);
                    }}
                    renderOption={renderOptionFragment}
                    renderInput={(params) => {
                        const { InputProps, ...restParams } = params;
                        const { startAdornment, ...restInputProps } = InputProps;
                        return (
                            <Fragment>
                                <TextField
                                    { ...restParams }
                                    className={inputStyles}
                                    required
                                    label={label}
                                    InputProps={{
                                        ...restInputProps,
                                        startAdornment: startAdornmentFragment || <br />
                                    }}
                                />
                            </Fragment>
                        )}}
                />
            </FormControl>
        );
    }
}

export default SearchInSelect;
