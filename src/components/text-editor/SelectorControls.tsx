import React, { useRef, useState } from 'react';
import {
    Button,
    ClickAwayListener,
    IconButton,
    MenuItem,
    MenuList,
    Paper,
    Popper
} from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';

import { editTextOptions, textEditorOption } from '../../models/constants';
import { StyledToggleButtonGroup } from '../../utils/StyledToggleButtonGroup';

const SelectorControls = (props: any) => {
    const { classes, onToggle, editorState } = props;
    const { relative, selectControlsList } = classes;
    const anchorRef = useRef<HTMLButtonElement>(null);

    // text size/format select
    const options = editTextOptions;
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(6);

    // text size/format events
    const handleMenuItemToggle = (
        event: any,
        index: number,
        option: textEditorOption
    ): void => {
        onToggle(option.style);
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (event: any): void => {
        const target: any = event.target;
        if (anchorRef.current && anchorRef.current.contains(target)) {
            return;
        }

        setOpen(false);
    };

    // todo: catch the event when cursor change line on the editor and update selected value regarding data
    const setSelected = (option: textEditorOption, index: number): void => {
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        if (blockType === 'unstyled') return;

        if (option.style === blockType) setSelectedIndex(index);
    };

    return (
        <StyledToggleButtonGroup className={relative}>
            <Button
                onClick={handleOpen}
            >
                {options[selectedIndex].title}
            </Button>
            <IconButton
                className={open ? classes.openBtn : ''}
                ref={anchorRef}
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-haspopup="true"
                size="small"
                onClick={handleOpen}
            >
                <ArrowDropDown/>
            </IconButton>
            <Popper className={selectControlsList} open={open} anchorEl={anchorRef.current} disablePortal>
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu">
                            {options.map((option, index) => (
                                <MenuItem
                                    key={index}
                                    selected={index === selectedIndex}
                                    onClick={(event) => handleMenuItemToggle(event, index, option)}
                                >
                                    <span className={classes[option.optionClass || '']}>{option.title}</span>
                                </MenuItem>
                            ))}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </StyledToggleButtonGroup>
    );
};

export default SelectorControls;
