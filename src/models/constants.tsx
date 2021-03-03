// dnd
import { string } from "prop-types";
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

type textEditorOptions = { title: string, value: string, classStr: string };
const createOption = (title: string, value: string, classStr: string): textEditorOptions => ({ title, value, classStr });

export const editTextOptions: textEditorOptions[] = [
    createOption('Heading 1', 'h1', 'optH1'),
    createOption('Heading 2', 'h2', 'optH2'),
    createOption( 'Heading 3', 'h3', 'optH3'),
    createOption( 'Heading 4', 'h4', 'optH4'),
    createOption( 'Heading 5', 'h5', 'optH5'),
    createOption( 'Heading 6', 'h6', 'optH6'),
    createOption( 'Normal Text', 'p', 'optP'),
];

// export const editColorOptions: textEditorOptions[] = {
//
// };

// export const editFormatOptions
