export type taskStatus = 'to_do' | 'in_progress' | 'done';
export type taskType = 'epic' | 'story' | 'task' | 'improvement' | 'bug';

export interface Column {
    key: string,
    title: string,
    sequence: number
}

export interface Project {
    project_key: string; // usually the first letters of words which are used in name
    lead: string;
    name: string;
    key?: string; // generated by db
}

export interface LinkType {
    to: string;
    title: string;
}

export interface Task {
    key?: string; // generated by db
    project_key: string; // Project => key generated by db
    reporter: string; // the key of the user who reported task
    description: string;
    status: taskStatus;
    type: taskType;
    summary: string;
    sequence: number; // sequence of creation, it doesn't change if smth was removed
    assignee?: string; // the key of the user who assigned to do this task
}

export interface User {
    key: string;
    email: string;
    full_name: string;
    project_keys?: {
        [key: string]: boolean
    };
    avatar?: string
}

export interface SignUpUser extends User {
    password: string;
    confirmPassword: string;
}

export interface LogInUser {
    email: string;
    password: string;
}

export type CreateProps = {
    isOpen: boolean,
    onClose: Function,
    projectKey?: string,
    classes?: any;
}

export type MatchProps = {
    match: any;
};

export type WithRouterProps = {
    match: any,
    location: any,
    history: any
}
