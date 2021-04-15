import { Column, priorityType, Project, Task, taskStatus, taskType, User } from '../models/models';

// projects
const createMockProjects = (key: string | undefined, project_key: string, lead: string, name: string): Project => ({
    key, project_key, lead, name
});
export const projectsMock: Project[] = [
    createMockProjects('0', 'MP', 'creatorId', 'Mock Project'),
    createMockProjects('1', 'MP1', 'creatorId', 'Mock Project 1'),
    createMockProjects('2', 'MP2', 'creatorId', 'Mock Project 2'),
    createMockProjects('3', 'MP3', 'creatorId', 'Mock Project 3')
];

export const getProjectByKey = (key: string | null) => projectsMock.find(project => project.key === key);
// *** projects

// users
export const createMockUsers = (
    key: string,
    email: string,
    full_name: string,
    project_keys: {[key: string] : boolean},
    avatar?: string
): User => ({
    key, email, full_name, project_keys, avatar
});
export const usersMock = [
    createMockUsers(
        '00',
        'test1@.gmail.com',
        'test1 test',
        { '0': true, '3': true },
        'https://on-style.com.ua/wp-content/uploads/2012/11/serdechko.jpg'
    ),
    createMockUsers(
        '01',
        'test2@.gmail.com',
        'test2 test',
        { '1': true, '3': true, '0': true },
        'https://ss.metronews.ru/userfiles/materials/133/1335122/858x540.jpg'
        ),
    createMockUsers(
        '02',
        'test3@.gmail.com',
        'test3 test',
        { '1': true, '3': true, '0': true },
        'https://fs.kinomania.ru/file/person/7/ea/7eabe3a1649ffa2b3ff8c02ebfd5659f.jpeg'),
    createMockUsers('03', 'test4@.gmail.com', 'test4 test', { '2': true, '3': true, '0': true }),
    createMockUsers('04', 'test5@.gmail.com', 'test5 test', { '0': true, '2': true }),
    createMockUsers('05', 'test6@.gmail.com', 'test6 test', { '0': true, '1': true, '2': true }),
];

export const getUserById = (key: string | undefined, users: (User | undefined)[] = usersMock): User | undefined => {
    return (users || []).find((user: any) => user.key === key);
};

export const getUsersByProjectKey = (key: string): User[] => usersMock.filter(user => (user.project_keys || {})[key]);
// *** users

// columns
const createProjectColumn = (key: string, title: string, sequence: number, task_number: number): Column => ({key, title, sequence, task_number});
export const defaultColumns: Column[] = [
    createProjectColumn('to_do', 'TO DO', 0, 4),
    createProjectColumn('in_progress', 'IN PROGRESS', 1, 0),
    createProjectColumn('done', 'DONE', 2, 0),
];

// tasks
export const createMockTask = (
    key: string,
    project_key: string,
    reporter: string,
    description: string,
    type: taskType,
    summary: string,
    sequence: number,
    priority: priorityType,
    status?: taskStatus
): Task => ({key, project_key, reporter, description, type, summary, sequence, priority, status: status || 'to_do'});

export const tasksMock: Task[] = [
    createMockTask('000', '0', '03', 'test description 1', 'Task', 'test summary 1', 0, 'Medium'),
    createMockTask('001', '0', '01', 'test description 2', 'Task', 'test summary 2', 1, 'High'),
    createMockTask('002', '0', '01', 'test description 3', 'Task', 'test summary 3', 2, 'Medium'),
    createMockTask('003', '0', '01', 'test description 4', 'Bug', 'test summary 4', 3, 'Low')
];
