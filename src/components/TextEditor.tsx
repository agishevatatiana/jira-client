import useTheme from "@material-ui/core/styles/useTheme";
import React, { useMemo, createContext, useRef, useState, useCallback, createRef } from "react";

import Draft, { CompositeDecorator, ContentBlock, Editor, EditorState, Modifier } from "draft-js";
import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    Divider,
    Grid,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper, Theme,
    withStyles
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    FormatColorFill,
    ArrowDropDown
} from "@material-ui/icons";

import { editTextOptions } from "../models/constants";
import { displayStyles } from "../styles/displays";
import { textEditorStyles } from "../styles/text-editor-styles";
import { typographyStyles } from "../styles/typography";

const TextEditor = (props: any) => {
    const { classes } = props;
    const { divider, flex, textEditorMenu, textEditorArea } = classes;
    const StyledToggleButtonGroup = withStyles((theme) => ({
        grouped: {
            margin: theme.spacing(0.5),
            border: 'none',
            '&:not(:first-child)': {
                borderRadius: theme.shape.borderRadius,
            },
            '&:first-child': {
                borderRadius: theme.shape.borderRadius,
            },
        },
    }))(ToggleButtonGroup);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

    const [formats, setFormats] = React.useState(() => ['bold', 'italic', 'underlined', 'color']);

    const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
        setFormats(newFormats);
    };

    // text size/format select
    const options = editTextOptions;
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (
        event: any,
        index: number,
    ) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: any) => {
        const target: any = event.target;
        if (anchorRef.current && anchorRef.current.contains(target)) {
            return;
        }

        setOpen(false);
    };
    const textEditSelector = (
        <StyledToggleButtonGroup size="small" ref={anchorRef} aria-label="split button">
            <ToggleButton value="selected" onClick={handleClick}>{options[selectedIndex].title}</ToggleButton>
            <ToggleButton
                value="selected-arrow"
                aria-controls={open ? "split-button-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
            >
                <ArrowDropDown/>
            </ToggleButton>
            <Popper open={open} anchorEl={anchorRef.current} disablePortal>
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu">
                            {options.map((option, index) => (
                                <MenuItem
                                    key={index}
                                    selected={index === selectedIndex}
                                    onClick={(event) => handleMenuItemClick(event, index)}
                                >
                                    <span className={classes[option.classStr]}>{option.title}</span>
                                </MenuItem>
                            ))}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </StyledToggleButtonGroup>
    );
    const textStyle = (
        <StyledToggleButtonGroup value={formats} size="small" onChange={handleFormat} aria-label="text formatting">
            <ToggleButton value="bold" aria-label="bold">
                <FormatBold/>
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
                <FormatItalic/>
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
                <FormatUnderlined/>
            </ToggleButton>
            <ToggleButton value="color" aria-label="color" disabled>
                <FormatColorFill/>
                <ArrowDropDown/>
            </ToggleButton>
        </StyledToggleButtonGroup>
    );

   // const editorStyleFn = (block: ContentBlock): string => for part of textarea;

    return (
        <Grid container>
            <Grid item xs={12} className={`${flex} ${textEditorMenu}`}>
                {textEditSelector}
                <Divider flexItem orientation="vertical" className={divider} />
                {textStyle}
            </Grid>
            <Grid item xs={12} className={textEditorArea}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    spellCheck={true}
                />
            </Grid>
        </Grid>
    );
};

export default withStyles((theme: Theme) => ({
    ...typographyStyles(theme),
    ...textEditorStyles(theme),
    ...displayStyles
})
)(TextEditor);

