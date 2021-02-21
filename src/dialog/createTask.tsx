import React, { Component } from "react";
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
    TextField
} from "@material-ui/core";

import { CreateProps, Project, Task } from "../models/models";
import { projectsMock } from "../mocks/mocks";
import { issueTypes } from "../models/constants";
import { formsStyles } from "../styles/forms-styles";
import { displayStyles } from "../styles/displays";
import { indentsStyles } from "../styles/indents";
import { typographyStyles } from "../styles/typography";

type CreateTaskState = {
    newTaskData: Task,
    projects: Project[],
    isCreateDisabled: boolean,
    errors: object
}
class CreateTask extends Component<CreateProps, CreateTaskState> {
    defaultState: CreateTaskState = {
        newTaskData: {
            project_key: '',
            reporter: '', // the key of the user who reported task
            description: '',
            status: 'to_do',
            type: 'task',
            summary: '',
            sequence: 0,
        },
        projects: projectsMock,
        isCreateDisabled: true,
        errors: {}
    };

    constructor(createTaskProps: CreateProps) {
        super(createTaskProps);
        this.state = this.defaultState;
    }

    render() {
        const { newTaskData, projects, isCreateDisabled } = this.state;
        const { isOpen, onClose, projectKey, classes } = this.props;
        const { selectField, block, marginBottom, toCapitalize } = classes;
        const { project_key, reporter, summary, description } = newTaskData;


        const handleClose = () => {
            onClose(true);
            this.setState(this.defaultState);
        };

        const handleCreateTask = async() => {
            // try {
            //     const projectRes = await axios.post('/task', this.state.newTaskData);
            // } catch (err) {
            //     console.log('/task failed: ', err);
            //     this.setState({ errors: err.message });
            // }
            handleClose();
        };

        const handleEditorChange = (event: any) => {
            console.log('event: ', event);
        };

        const projectsSelect = projects.map((project) => (
            <option key={project.key} value={project.key}>{project.name}({project.project_key})</option>
        ));
        const issueTypeSelect = issueTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
        ));
        const rowClass = `${block} ${marginBottom}`;
        const selectClass = `${toCapitalize} ${selectField}`;

        return (
            <Dialog fullWidth maxWidth="md" open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Issue</DialogTitle>
                <DialogContent>

                    {/* project selector */}
                    <FormControl required className={rowClass}>
                        <InputLabel htmlFor="grouped-native-select">Project</InputLabel>
                        <Select autoWidth={false} classes={ {select: selectClass} } native defaultValue={projectKey} id="grouped-native-select">
                            <optgroup label="Recent Projects">
                                {projectsSelect}
                            </optgroup>
                            <optgroup label="All Projects">
                                {projectsSelect}
                            </optgroup>
                        </Select>
                    </FormControl>

                    {/* issue type selector */}
                    <FormControl required className={rowClass}>
                        <InputLabel htmlFor="grouped-native-select">Issue Type</InputLabel>
                        <Select autoWidth={false} classes={ {select: selectClass} } native defaultValue="task" id="grouped-native-select">
                            {issueTypeSelect}
                        </Select>
                    </FormControl>

                    {/* summary text field

                        onFocus={createRandomNum}
                        onChange={handleNameChange}
                    */}
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="summary"
                        name='summary'
                        type='text'
                        label='Summary'
                        value={summary}
                        fullWidth
                    />

                    {/*  Description - text editor  */}
                    {/*  Assignee - selector with users  */}
                    {/*  Reporter - reporter  */}
                    {/*  Priority* - selector with priority type  */}
                </DialogContent>
                <DialogContentText>

                </DialogContentText>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateTask} disabled={isCreateDisabled} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles({ ...formsStyles, ...displayStyles, ...indentsStyles, ...typographyStyles })(CreateTask);
