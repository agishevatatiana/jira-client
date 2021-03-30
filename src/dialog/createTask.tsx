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
import { convertToRaw } from 'draft-js';

import { CreateProps, Project, Task } from "../models/models";
import { projectsMock } from "../mocks/mocks";
import { issueTypes } from "../models/constants";
import { formsStyles } from "../styles/forms-styles";
import { blockStyles } from "../styles/block-styles";
import { indentsStyles } from "../styles/indents";
import { typographyStyles } from "../styles/typography";
import TextEditor from "../components/text-editor/TextEditor";

type CreateTaskState = {
    newTaskData: Task,
    projects: Project[],
    isCreateDisabled: boolean,
    isSubmitAction: boolean,
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
        isSubmitAction: false,
        projects: projectsMock,
        isCreateDisabled: true,
        errors: {}
    };

    constructor(createTaskProps: CreateProps) {
        super(createTaskProps);
        this.state = this.defaultState;
    }

    render() {
        const { newTaskData, projects, isCreateDisabled, isSubmitAction } = this.state;
        const { isOpen, onClose, projectKey, classes } = this.props;
        const { selectField, block, textMb, lineMb, toCapitalize } = classes;
        const { project_key, reporter, summary, description } = newTaskData;


        const handleClose = () => {
            onClose(true);
            this.setState(this.defaultState);
        };

        const handleCreateTask = async() => {
            this.setState({ isSubmitAction: true });

            setTimeout(() => {
                this.setState({ isSubmitAction: false });
            }, 3000);
           // console.log();
            // try {
            //     const projectRes = await axios.post('/task', this.state.newTaskData);
            // } catch (err) {
            //     console.log('/task failed: ', err);
            //     this.setState({ errors: err.message });
            // }
         //   ;
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
        const rowClass = `${block} ${lineMb}`;
        const selectClass = `${toCapitalize} ${selectField}`;

        const handleGetDescription = (event: any): any => {
            console.log('description update: ', convertToRaw(event));
        };

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
                    <FormControl required className={rowClass}>
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
                    </FormControl>

                    {/*  Description - text editor  */}
                    <InputLabel className={textMb}>Description</InputLabel>
                    <TextEditor isSubmitAction={isSubmitAction} description={handleGetDescription} />


                    {/*  Assignee - selector with users  */}
                    {/*  Reporter - reporter  */}
                    {/*  Priority* - selector with priority type
                    */}
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

// todo: send classes to text editor as props
export default withStyles({ ...formsStyles, ...blockStyles, ...indentsStyles, ...typographyStyles })(CreateTask);
