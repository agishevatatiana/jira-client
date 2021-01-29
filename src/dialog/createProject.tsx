import React, {Component} from 'react';
import {random} from 'lodash';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type CreateProjectProps = {
    isOpen: boolean,
    onClose: Function,
}

type CreateProjectState = {
    randomNum: string;
    newProjectData: {
        name: string,
        project_key: string,
        lead: string
    },
    isCreateDisabled: boolean,
    errors: {}
}

const defaultState = {
    randomNum: '0',
    newProjectData: {
        name: '',
        project_key: '',
        lead: ''
    },
    isCreateDisabled: true,
    errors: {}
};

class CreateProject extends Component<CreateProjectProps, CreateProjectState> {

    constructor(createProjectProps: CreateProjectProps) {
        super(createProjectProps);
        this.state = defaultState;
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
            this.setState(defaultState);
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
