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

import { createMockUsers } from '../mocks/mocks';
import { priorityType, taskStatus, taskType } from './models';

export const publicUrl = process.env.PUBLIC_URL;

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

export const issueTypes: taskType[] = ['Epic', 'Story', 'Task', 'Bug'];
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

export const priorityIcons = (type: string, setIndents?: string): {[key: string]: CElement<any, any>} => ({
    Highest: <ArrowUpward className={`${setIndents} ${type}`} />,
    High: <ArrowUpward className={`${setIndents} ${type}`} />,
    Medium: <ArrowUpward className={`${setIndents} ${type}`} />,
    Low: <ArrowDownward className={`${setIndents} ${type}`} />,
    Lowest: <ArrowDownward className={`${setIndents} ${type}`} />,
});

export const taskTypeIcons: {[key: string]: string} = {
    Epic: `${publicUrl}/epic.svg`,
    Story: `${publicUrl}/story.svg`,
    Task: `${publicUrl}/task.svg`,
    Bug: `${publicUrl}/bug.svg`
};
