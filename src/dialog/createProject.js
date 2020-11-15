import React, {Component} from 'react';
import { random } from 'lodash';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class CreateProject extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
            randomNum: 0,
            newProjectData: {
                name: '',
                project_key: '',
                lead: ''
            },
            isCreateDisabled: true,
            errors: ''
        };
    }
    static defaultProps = {};

    static propTypes = {};

    componentDidMount() {
        this.handleOpen();
    }

    handleClose = () => {
        this.setState({
            open: false
        });
        this.props.close(true);
    };

    handleOpen = () => {
        this.setState({
            open: true
        });
    };

    createRandomNum = () => {
        this.setState({
            randomNum: random(0, 10000000)
        });
    };

    handleNameChange = (event) => {
        if (!!event.target.value) {
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

    handleKeyChange = () => {

    };

    generateKey = (name) => {
        const words = name.split(' ');
        return words.reduce((acc, w) => {
            acc += w.slice(0, 1).toUpperCase();
            return acc;
        }, '');
    };

    handleCreateProject = async() => {
        // try {
        //     const projectRes = await axios.post('/project', this.state.newProjectData);
        // } catch (err) {
        //     console.log('/project failed: ', err);
        //     this.setState({ errors: err.message });
        // }
    };

    render() {
        return (
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
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
                        onFocus={this.createRandomNum}
                        onChange={this.handleNameChange}
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
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleCreateProject} disabled={this.state.isCreateDisabled} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default CreateProject;
