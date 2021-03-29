import React, { useState } from 'react';
import { ToggleButton } from '@material-ui/lab';

import { editTextButtons, editTextIcons, textEditorOption } from '../../models/constants';
import { StyledToggleButtonGroup } from '../../utils/StyledToggleButtonGroup';

const ButtonControls = (props: any) => {
    const [formats, setFormats] = useState(() => ['']);

    const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
        setFormats(newFormats);
    };
    const {  } = props;
    return <StyledToggleButtonGroup value={formats} size="small" onChange={handleFormat} aria-label="text formatting">
        {editTextButtons.map((buttonData: textEditorOption) => {
            const { value } = buttonData;
            return (
                <ToggleButton key={value} value={value} aria-label={value}>
                    {editTextIcons[value]}
                </ToggleButton>
            );
        })}

        {/*<ToggleButton value="color" aria-label="color" disabled>*/}
        {/*    <FormatColorFill/>*/}
        {/*    <ArrowDropDown/>*/}
        {/*</ToggleButton>*/}
    </StyledToggleButtonGroup>;
};

export default ButtonControls;
