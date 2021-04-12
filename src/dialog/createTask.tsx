import Avatar from '@material-ui/core/Avatar';
import React, { Component, Fragment } from "react";
import {
    FormControl,
    InputLabel,
    Select,
    Button,
    DialogContent,
    DialogTitle,
    Dialog,
    DialogContentText,
    DialogActions,
    withStyles,
    TextField,
    Theme
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { convertToRaw } from 'draft-js';

import { CreateProps, priorityType, Project, Task, taskType, User } from '../models/models';
import { getUserById, getUsersByProjectKey, projectsMock } from '../mocks/mocks';
import { issueTypes, priorities, priorityIcons, unassignedUser } from '../models/constants';
import { formsStyles } from "../styles/forms-styles";
import { blockStyles } from "../styles/block-styles";
import { indentsStyles } from "../styles/indents";
import { typographyStyles } from "../styles/typography";
import TextEditor from "../components/text-editor/TextEditor";
import SearchInSelect from '../components/SearchInSelect';

type CreateTaskState = {
    newTaskData: Task,
    projects: Project[],
    isCreateDisabled: boolean,
    isSubmitAction: boolean,
    users: User[],
    errors: object
}

// TODO:
//  1) validate data and unblock submit
// -------------- Lowest priority
//  2) icons for
//  - project selector, (divide for groups)
//  - issue type selector
class CreateTask extends Component<CreateProps, CreateTaskState> {
    defaultState: CreateTaskState = {
        newTaskData: {
            project_key: '',
            reporter: '', // the key of the user who reported task
            description: '',
            assignee: '',
            status: 'to_do',
            type: 'Task',
            summary: '',
            priority: 'Medium',
            sequence: 0,
        },
        isSubmitAction: false,
        projects: projectsMock,
        isCreateDisabled: true,
        users: [],
        errors: {}
    };

    constructor(createTaskProps: CreateProps) {
        super(createTaskProps);
        this.state = this.defaultState;
    }

    getUsersByProjectKey(projectKey: string) {
        const { newTaskData } = this.state;
        const { currentUser } = this.props;
        this.setState({
            users: getUsersByProjectKey(projectKey) || [],
            newTaskData: {
                ...newTaskData,
                reporter: (currentUser || {}).key || '',
                assignee: unassignedUser.key,
                project_key: projectKey
            }
        });
    }

    componentDidMount() {
        const { projectKey } = this.props;
        this.getUsersByProjectKey(projectKey);
    }

    render() {
        const { newTaskData, projects, isCreateDisabled, isSubmitAction, users } = this.state;
        const { isOpen, onClose, projectKey, classes, currentUser } = this.props;
        const {
            selectField,
            block,
            lineMb,
            toCapitalize,
            avatarSmall,
            hide,
            mLNegative,
            textMb,
            mRSmall,
            mTSmall,
            mBSmall,
            mRMid
        } = classes;
        const { project_key, reporter, summary, description, assignee, priority, type } = newTaskData;

        // combined styles
        const rowClass = `${block} ${lineMb}`;
        const selectClass = `${toCapitalize} ${selectField}`;

        const avatarMargin = `${mRSmall} ${mBSmall} ${mTSmall}`;
        const avatar = `${avatarSmall} ${avatarMargin}`;
        const avatarOption = `${avatar} ${mLNegative} ${mRMid}`;

        const handleClose = () => {
            onClose(true);
            this.setState(this.defaultState);
        };

        const handleCreateTask = async() => {
            this.setState({ isSubmitAction: true });

            setTimeout(() => {
                this.setState({ isSubmitAction: false });
                console.log('newTaskData: ', newTaskData, this.state);
            }, 3000);


            // try {
            //     const projectRes = await axios.post('/task', this.state.newTaskData);
            // } catch (err) {s
            //     console.log('/task failed: ', err);
            //     this.setState({ errors: err.message });
            // }
         //   ;
        };

        const handleGetDescription = (event: any): any => {
            this.setState({
                newTaskData: {
                    ...newTaskData,
                    description: convertToRaw(event)
                }
            });
        };

        const handleReporterChange = (value: User | null): any => {
            this.setState({
                newTaskData: {
                    ...newTaskData,
                    reporter: (value || {}).key || ''
                }
            });
        };

        const handleAssigneeChange = (value: User | null | undefined): any => {
            this.setState({
                newTaskData: {
                    ...newTaskData,
                    assignee: (value || {}).key || ''
                }
            });
        };

        const handlePriorityChange = (value: priorityType | null): any => {
            this.setState({
                newTaskData: {
                    ...newTaskData,
                    priority: value || 'Medium'
                }
            });
        };

        const handleIssueTypeChange = (value: taskType | null): void => {
            this.setState({
                newTaskData: {
                    ...newTaskData,
                    type: value || 'Task'
                }
            });
        };

        const handleProjectChange = (value: Project | null | undefined): any => {
            this.setState({
                newTaskData: {
                    ...newTaskData,
                    project_key: (value || {}).key || ''
                }
            });
        };

        const handleSummaryChange = (event: any): void => {
            const value = event.target.value;
            this.setState({
                newTaskData: {
                    ...newTaskData,
                    summary: value
                }
            });
        };

        const setOptions = (): (User | undefined)[] => {
            let withUnassigned = [unassignedUser, ...users];
            return withUnassigned || [];
        };

        return (
            <Dialog fullWidth maxWidth="md" open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Issue</DialogTitle>
                <DialogContent>

                    {/* project selector */}
                    <SearchInSelect
                        id={'project'}
                        label={'Project'}
                        data={projects}
                        defaultValue={projects.find(p => p.key === project_key)}
                        getOptionLabel={(option: Project) => `${option.name} (${option.project_key})`}
                        renderOptionFragment={
                            (option: Project) => (
                                <Fragment>
                                    {`${option.name} (${option.project_key})`}
                                </Fragment>
                            )
                        }
                        boxStyles={rowClass}
                        inputStyles={selectClass}
                        onChange={handleProjectChange}
                    />

                    {/* issue type selector */}
                    <SearchInSelect
                        id={'issue-type'}
                        label={'Issue Type'}
                        data={issueTypes}
                        defaultValue={type}
                        getOptionLabel={(option: taskType) => option}
                        renderOptionFragment={
                            (option: taskType) => (
                                <Fragment>
                                    {option}
                                </Fragment>
                            )
                        }
                        boxStyles={rowClass}
                        inputStyles={selectClass}
                        onChange={handleIssueTypeChange}
                    />

                    {/* summary text field

                        onFocus={createRandomNum}
                        onChange={handleNameChange}
                    */}
                    <FormControl required className={rowClass}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="summary"
                            name='summary'
                            type='text'
                            label='Summary'
                            onChange={handleSummaryChange}
                            fullWidth
                        />
                    </FormControl>

                    {/*  Description - text editor  */}
                    <div className={lineMb} >
                        <InputLabel className={textMb}>Description</InputLabel>
                        <TextEditor isSubmitAction={isSubmitAction} description={handleGetDescription} />
                    </div>

                    {/*  Reporter - reporter  */}
                    <SearchInSelect
                        id={'reporter'}
                        label={'Reporter'}
                        data={users}
                        defaultValue={getUserById(reporter)}
                        getOptionLabel={(option: User) => option?.full_name || ''}
                        renderOptionFragment={
                            (option: User) => (
                                <Fragment>
                                    <Avatar alt={option?.full_name} src={option?.avatar} className={avatarOption} />
                                    {option?.full_name}
                                </Fragment>
                            )
                        }
                        startAdornmentFragment={
                            <Avatar
                                alt={getUserById(reporter)?.full_name}
                                src={getUserById(reporter)?.avatar}
                                className={!reporter ? hide : avatar}
                            />
                        }
                        boxStyles={rowClass}
                        onChange={handleReporterChange}
                    />

                    {/*  Assignee - selector with users  */}
                    <SearchInSelect
                        id={'assignee'}
                        label={'Assignee'}
                        data={setOptions()}
                        defaultValue={getUserById(assignee, setOptions())}
                        getOptionLabel={(option: User) => option?.full_name || ''}
                        renderOptionFragment={
                            (option: User) => (
                                <Fragment>
                                    <Avatar alt={option?.full_name} src={option?.avatar} className={avatarOption} />
                                    {option?.full_name}
                                </Fragment>
                            )
                        }
                        startAdornmentFragment={
                            <Avatar
                                alt={getUserById(assignee, setOptions())?.full_name}
                                src={getUserById(assignee, setOptions())?.avatar}
                                className={!assignee ? hide : avatar}
                            />
                        }
                        boxStyles={rowClass}
                        onChange={handleAssigneeChange}
                    />

                    {/*  Priority* - selector with priority type */}
                    <SearchInSelect
                        id={'priority'}
                        label={'Priority'}
                        data={priorities}
                        defaultValue={priority}
                        getOptionLabel={(option: string) => option}
                        renderOptionFragment={
                            (option: priorityType) => (
                                <Fragment>
                                    {priorityIcons(avatarMargin)[option]}
                                    {option}
                                </Fragment>
                            )
                        }
                        startAdornmentFragment={
                            (<Fragment> {priorityIcons(avatarMargin)[priority]} </Fragment>)
                        }
                        boxStyles={rowClass}
                        inputStyles={selectClass}
                        onChange={handlePriorityChange}
                    />
                </DialogContent>
                <DialogContentText>

                </DialogContentText>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={isCreateDisabled} onClick={handleCreateTask} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles((theme: Theme) => (
    {   ...formsStyles(theme),
        ...blockStyles,
        ...indentsStyles(theme),
        ...typographyStyles(theme)
    })
)(CreateTask);
