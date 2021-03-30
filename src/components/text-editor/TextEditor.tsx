import React, { useEffect, useRef, useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import {
    Divider,
    Grid,
    Theme,
    withStyles
} from "@material-ui/core";

import { blockStyles } from "../../styles/block-styles";
import { textEditorStyles } from "../../styles/text-editor-styles";
import { typographyStyles } from "../../styles/typography";
import ButtonBlockControls from './ButtonBlockControls';
import ButtonInlineControls from './ButtonInlineControls';
import SelectorControls from './SelectorControls';

const TextEditor = (props: any) => {
    const { classes, description, isSubmitAction } = props;
    const { divider, flex, textEditorMenu, textEditorArea } = classes;
    const [editorState, setEditorState] = useState((() =>
        EditorState.createEmpty()),
    );

    const handleBlockStyles = (style: string): void => {
        setEditorState(
            RichUtils.toggleBlockType( // only block available
                editorState,
                style
            )
        );
    };

    const handleInlineStyles = (style: string): void => {
        setEditorState(
            RichUtils.toggleInlineStyle( // only inline available
                editorState,
                style
            )
        );
    };

    const editorRef = useRef(null);
    const focus = () => (((editorRef || {}).current) || { focus: () => {}}).focus();

    // sent data by click on submit
    useEffect(() => {
        if (isSubmitAction) description(editorState.getCurrentContent());

    }, [isSubmitAction]);


    return (
        <Grid container>
            <Grid item xs={12} className={`${flex} ${textEditorMenu}`}>
                <SelectorControls
                    classes={classes}
                    editorState={editorState}
                    onToggle={handleBlockStyles}
                />
                <Divider flexItem orientation="vertical" className={divider} />
                <ButtonBlockControls
                    editorState={editorState}
                    onToggle={handleBlockStyles}
                />
                <ButtonInlineControls
                    editorState={editorState}
                    onToggle={handleInlineStyles}
                />
            </Grid>
            <Grid item xs={12} className={textEditorArea} onClick={focus}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    ref={editorRef}
                    spellCheck={true}
                />
            </Grid>
        </Grid>
    );
};

export default withStyles((theme: Theme) => ({
    ...typographyStyles(theme),
    ...textEditorStyles(theme),
    ...blockStyles
})
)(TextEditor);

