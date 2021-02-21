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
