import React, { useState } from 'react';
import { ToggleButton } from '@material-ui/lab';

import { editTextButtonsInline, editTextIcons, textEditorOption } from '../../models/constants';
import { StyledToggleButtonGroup } from '../../utils/StyledToggleButtonGroup';

const ButtonInlineControls = (props: any) => {
    const { onToggle, editorState } = props;
    const [formats] = useState((): textEditorOption[] => []);

    const handleOnToggle = (event: React.MouseEvent<HTMLElement>, style: string) => {
        onToggle(style);
    };

    return <StyledToggleButtonGroup value={formats} size="small" aria-label="text formatting">
        {editTextButtonsInline.map((buttonData: textEditorOption) => {
            const { value, style } = buttonData;
            return (
                <ToggleButton
                    key={value}
                    value={value}
                    selected={editorState.getCurrentInlineStyle().has(style)}
                    aria-label={value}
                    onClick={(event) =>  handleOnToggle(event, style)}
                >
                    {editTextIcons[value]}
                </ToggleButton>
            );
        })}
    </StyledToggleButtonGroup>;
};

export default ButtonInlineControls;
