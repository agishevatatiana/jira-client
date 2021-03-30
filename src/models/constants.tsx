import {
    Code,
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    Reorder,
    FormatListBulleted,
    FormatListNumbered,
    FormatQuote
} from '@material-ui/icons';
import React, { CElement } from 'react';
import { taskType } from "./models";

export const DnDTypes = {
    COLUMN: 'column',
    TASK: 'task'
};

export const routerPath = {
    defaultPath: '/',
    loginPath: '/login',
    signupPath: '/signup',
    projectPath: '/project/:projectKey'
};

export const issueTypes: taskType[] = ['epic', 'story', 'task', 'improvement', 'bug'];

export type textEditorOption = { value: string, style: string, title?: string, optionClass?: string };
const createOption = (value: string, style: string, title?: string, optionClass?: string): textEditorOption => ({ title, value, optionClass, style });

export const editTextOptions: textEditorOption[] = [
    createOption( 'h1','header-one' , 'Heading 1', 'optH1'),
    createOption( 'h2', 'header-two', 'Heading 2','optH2'),
    createOption( 'h3', 'header-three', 'Heading 3','optH3'),
    createOption( 'h4', 'header-four', 'Heading 4', 'optH4'),
    createOption( 'h5', 'header-five', 'Heading 5', 'optH5'),
    createOption( 'h6', 'header-six', 'Heading 6', 'optH6'),
    createOption( 'p',  'paragraph', 'Normal Text', 'optP')
];

export const editTextIcons: {[key: string]: CElement<any, any>} = {
    bold: <FormatBold/>,
    italic: <FormatItalic/>,
    underline: <FormatUnderlined/>,
    monospace: <Reorder/>,
    code: <Code/>,
    ul: <FormatListBulleted />,
    ol: <FormatListNumbered />,
    blockquote: <FormatQuote />
};

export const editTextButtonsInline: textEditorOption[] = [
    createOption('bold', 'BOLD'),
    createOption('italic', 'ITALIC'),
    createOption('underline', 'UNDERLINE'),
    createOption('monospace', 'CODE'),
];

export const editTextButtonsBlock: textEditorOption[] = [
    createOption('code', 'code-block'),
    createOption('ul', 'unordered-list-item'),
    createOption('ol', 'ordered-list-item'),
    createOption('blockquote', 'blockquote'),
];


