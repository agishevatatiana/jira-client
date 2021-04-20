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
const createProjectColumn = (key: taskStatus, title: string, sequence: number, task_number: number): Column => ({key, title, sequence, task_number});
export const defaultColumns: Column[] = [
    createProjectColumn('to_do', 'TO DO', 0, 4),
    createProjectColumn('in_progress', 'IN PROGRESS', 1, 0),
    createProjectColumn('done', 'DONE', 2, 0),
];

// tasks
export const createMockTask = (
    key: string,
    project_key: string,
    project_key_title: string,
    reporter: string,
    description: object,
    type: taskType,
    summary: string,
    sequence: number,
    task_number: number,
    priority: priorityType,
    assignee?: string,
    status?: taskStatus
): Task => ({key, project_key, project_key_title, reporter, description, type, summary, sequence, task_number, priority, assignee, status: status || 'to_do'});

export const tasksMock: Task[] = [
    createMockTask('000', '0', 'MP', '03', {
        "blocks": [
            {
                "key": "5eamj",
                "text": "Lorem Ipsum ",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": [
                    {
                        "offset": 0,
                        "length": 11,
                        "style": "BOLD"
                    }
                ],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "brl9s",
                "text": "is simply dummy text of the printing and typesetting industry. ",
                "type": "ordered-list-item",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "25pp9",
                "text": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
                "type": "ordered-list-item",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "dpe6k",
                "text": "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of ",
                "type": "ordered-list-item",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "fot8i",
                "text": "Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "type": "ordered-list-item",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            }
        ],
        "entityMap": {}
    }, 'Task', 'test summary 1', 0, 2,'Medium', '01'),
    createMockTask('001', '0', 'MP','01', {
        "blocks": [
            {
                "key": "55gh7",
                "text": "",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            }
        ],
        "entityMap": {}
    }, 'Task', 'test summary 2', 1, 1,'High'),
    createMockTask('002', '0', 'MP','01', {
        "blocks": [
            {
                "key": "3fota",
                "text": "constructor(createTaskProps: CreateProps) {\n    super(createTaskProps);\n    this.state = this.defaultState;\n}",
                "type": "code-block",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "avekv",
                "text": "test1",
                "type": "unordered-list-item",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "br958",
                "text": "test2",
                "type": "unordered-list-item",
                "depth": 0,
                "inlineStyleRanges": [
                    {
                        "offset": 0,
                        "length": 5,
                        "style": "UNDERLINE"
                    }
                ],
                "entityRanges": [],
                "data": {}
            }
        ],
        "entityMap": {}
    }, 'Task', 'test summary 3', 2, 0, 'Medium'),
    createMockTask('003', '0', 'MP', '01', {
        "blocks": [
            {
                "key": "41rnb",
                "text": "Why do we use it?",
                "type": "header-one",
                "depth": 0,
                "inlineStyleRanges": [],
                "entityRanges": [],
                "data": {}
            },
            {
                "key": "ao7k1",
                "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                "type": "blockquote",
                "depth": 0,
                "inlineStyleRanges": [
                    {
                        "offset": 239,
                        "length": 374,
                        "style": "UNDERLINE"
                    },
                    {
                        "offset": 239,
                        "length": 374,
                        "style": "CODE"
                    },
                    {
                        "offset": 254,
                        "length": 359,
                        "style": "ITALIC"
                    }
                ],
                "entityRanges": [],
                "data": {}
            }
        ],
        "entityMap": {}
    }, 'Bug', 'test summary 4', 3, 3, 'Low')
];
