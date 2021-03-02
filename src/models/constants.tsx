// dnd
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

type textEditorOptions = { title: string, value: string };
const createOption = (title: string, value: string): textEditorOptions => ({ title, value });

export const editTextOptions: textEditorOptions[] = [
    createOption(`<h1>Heading 1</h1>`, 'h1'),
    createOption(`<h2>Heading 2</h2>`, 'h2'),
    createOption(`<h3>Heading 3</h3>`, 'h3'),
    createOption(`<h4>Heading 4</h4>`, 'h4'),
    createOption(`<h5>Heading 5</h5>`, 'h5'),
    createOption(`<h6>Heading 6</h6>`, 'h6'),
    createOption(`<p>Normal Text</p>`, 'p'),
];

// export const editColorOptions: textEditorOptions[] = {
//
// };

// export const editFormatOptions
