import React, { useMemo, createContext, useRef, useState, useCallback, createRef } from "react";

import Draft, { CompositeDecorator, Editor, EditorState, Modifier } from "draft-js";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    FormatColorFill,
    ArrowDropDown
} from "@material-ui/icons";

import { editTextOptions } from "../models/constants";

const TextEditor = (props: any) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

    const [formats, setFormats] = React.useState(() => ['bold', 'italic', 'underlined', 'color']);

    const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
        setFormats(newFormats);
    };
    const options = editTextOptions;
    return (
        <Grid container>
            <Grid item xs={12}>
                {/*<ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">*/}
                {/*    <Button onClick={handleClick}>{options}</Button>*/}
                {/*    <Button*/}
                {/*        color="primary"*/}
                {/*        size="small"*/}
                {/*        aria-controls={open ? 'split-button-menu' : undefined}*/}
                {/*        aria-expanded={open ? 'true' : undefined}*/}
                {/*        aria-label="select merge strategy"*/}
                {/*        aria-haspopup="menu"*/}
                {/*        onClick={handleToggle}*/}
                {/*    >*/}
                {/*        <ArrowDropDown />*/}
                {/*    </Button>*/}
                {/*</ButtonGroup>*/}
                <ToggleButtonGroup value={formats} size="small" onChange={handleFormat} aria-label="text formatting">
                    <ToggleButton value="bold" aria-label="bold">
                        <FormatBold />
                    </ToggleButton>
                    <ToggleButton value="italic" aria-label="italic">
                        <FormatItalic />
                    </ToggleButton>
                    <ToggleButton value="underlined" aria-label="underlined">
                        <FormatUnderlined />
                    </ToggleButton>
                    <ToggleButton value="color" aria-label="color">
                        <FormatColorFill />
                        <ArrowDropDown />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                />
            </Grid>
        </Grid>
    );
};

export default TextEditor;

