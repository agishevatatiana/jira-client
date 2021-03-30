import React, { useState } from 'react';
import { ToggleButton } from '@material-ui/lab';

import { editTextButtonsBlock, editTextIcons, textEditorOption } from '../../models/constants';
import { StyledToggleButtonGroup } from '../../utils/StyledToggleButtonGroup';

const ButtonBlockControls = (props: any) => {
    const { onToggle, editorState } = props;
    const [formats] = useState((): textEditorOption[] => []);

    const handleOnToggle = (event: React.MouseEvent<HTMLElement>, style: string): void => {
        onToggle(style);
    };

    const isSelected = (style: string):boolean => {
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        return blockType === style;
    };

    return <StyledToggleButtonGroup value={formats} size="small" aria-label="text formatting">
        {editTextButtonsBlock.map((buttonData: textEditorOption) => {
            const { value, style } = buttonData;
            return (
                <ToggleButton
                    key={value}
                    value={value}
                    selected={isSelected(style)}
                    aria-label={value}
                    onClick={(event) =>  handleOnToggle(event, style)}
                >
                    {editTextIcons[value]}
                </ToggleButton>
            );
        })}
    </StyledToggleButtonGroup>;
};

export default ButtonBlockControls;
