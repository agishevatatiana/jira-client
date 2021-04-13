import React, { CElement } from 'react';
import {
    Code,
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    Reorder,
    FormatListBulleted,
    FormatListNumbered,
    FormatQuote,
    ArrowUpward,
    ArrowDownward
} from '@material-ui/icons';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';

import { createMockUsers } from '../mocks/mocks';
import { priorityType, taskStatus, taskType } from './models';

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

export const issueTypes: taskType[] = ['Epic', 'Story', 'Task', 'Improvement', 'Bug'];
export const taskStatuses: {status: taskStatus, name: string}[] = [
    { status: 'to_do', name: 'To Do' },
    { status: 'in_progress', name: 'In Progress' },
    { status: 'done', name: 'Done' }
    ];

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

export const unassignedUser = createMockUsers('000000', 'Unassigned', 'Unassigned', {});

export const priorities: priorityType[] = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];

export const priorityIcons = (setIndents: string): {[key: string]: CElement<any, any>} => ({
    Highest: <ArrowUpward className={setIndents} style={{ color: red[700] }} />,
    High: <ArrowUpward className={setIndents} style={{ color: red[400] }} />,
    Medium: <ArrowUpward className={setIndents} style={{ color: orange[600] }} />,
    Low: <ArrowDownward className={setIndents} style={{ color: green[700] }} />,
    Lowest: <ArrowDownward className={setIndents} style={{ color: green[400] }} />,
});
