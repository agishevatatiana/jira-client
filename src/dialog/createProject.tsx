import React, { Component } from 'react';
import { random } from 'lodash';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import { CreateProps, Project } from '../models/models';

type CreateProjectState = {
    randomNum: string,
    newProjectData: Project,
    isCreateDisabled: boolean,
    errors: object
}

class CreateProject extends Component<CreateProps, CreateProjectState> {
    defaultState: CreateProjectState = {
        randomNum: '0', // todo I can use Symbol in future
        newProjectData: {
            name: '',
            project_key: '',
            lead: ''
        },
        isCreateDisabled: true,
        errors: {}
    };
    constructor(createProjectProps: CreateProps) {
        super(createProjectProps);
        this.state = this.defaultState;
    }

    handleKeyChange() {

    }

    generateKey(name: string) {
        const words = name.split(' ');
        return words.reduce((acc, w) => {
            acc += w.slice(0, 1).toUpperCase();
            return acc;
        }, '');
    }

    render() {
        const handleNameChange = (event: any) => {
            if (event.target.value) {
                const name = event.target.value;
                this.setState({
                    newProjectData: {
                        ...this.state.newProjectData,
                        name: event.target.value,
                        project_key: `${this.generateKey(name)}-${this.state.randomNum}`
                    },
                    isCreateDisabled: !event.target.value || !this.state.newProjectData.project_key
                });
            }
        };

        const createRandomNum = () => {
            this.setState({
                randomNum: random(0, 10000000).toString()
            });
        };

        const handleClose = () => {
            this.props.onClose(true);
            this.setState(this.defaultState);
        };

        const handleCreateProject = async() => {
            // try {
            //     const projectRes = await axios.post('/project', this.state.newProjectData);
            // } catch (err) {
            //     console.log('/project failed: ', err);
            //     this.setState({ errors: err.message });
            // }
            handleClose();
        };

        return (
            <Dialog open={this.props.isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name='name'
                        type='text'
                        label='Enter project name'
                        value={this.state.newProjectData.name}
                        onFocus={createRandomNum}
                        onChange={handleNameChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="project_key"
                        name='project_key'
                        type='text'
                        label='Project key'
                        value={this.state.newProjectData.project_key}
                        onChange={this.handleKeyChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogContentText>

                </DialogContentText>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateProject} disabled={this.state.isCreateDisabled} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default CreateProject;
