import React, {Component} from 'react';
import { Link } from 'react-router-dom';

// https://material-ui.com/components/app-bar/
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import CreateProject from "../dialog/createProject";

type NavbarState = {
    authenticated: boolean;
    isCreateProjectOpen: boolean;
}

class Navbar extends Component<{}, NavbarState> {

    constructor(props: any) {
        super(props);
        this.state = {
            authenticated: false,
            isCreateProjectOpen: false
        };
    }

    getAuthState() {
        // authentication code
        let authenticated = true;
        // const token = localStorage.getItem('JiraToken');
        // if (token) {
        //     const decodeToken = jwtDecode(token);
        //
        //     // does token expired
        //     if (decodeToken.exp * 1000 < Date.now()) {
        //         window.location.href = '/login';
        //         authenticated = false;
        //     } else {
        //         authenticated = true;
        //     }
        // }
        this.setState({
            authenticated
        });
    }

    componentDidMount() {
        this.getAuthState()
    }

    render() {
        const handleCreateProjectOpen = () => {
            this.setState({ isCreateProjectOpen: true });
        };

        const handleCreateProjectClose = (isOpen: boolean) => {
            this.setState({ isCreateProjectOpen: !isOpen });
        };

        const showNavButtons = this.state.authenticated
            ?
            <div className='position-container'>
                <div className='position-start'><Button color='inherit' component={Link} to='/'>Projects</Button></div>
                <div className='position-end'>
                    <Fab color='primary' variant='extended' size='medium' onClick={handleCreateProjectOpen}>
                        <AddIcon/>
                        Create Project
                    </Fab>
                </div>
            </div>
            :
            <div className='position-container'>
                <div className='position-start'>
                    <Button color='inherit' component={Link} to='/login'>Log In</Button>
                    <Button color='inherit' component={Link} to='/signup'>Sign Up</Button>
                </div>
            </div>;
        const createProjectModal = this.state.isCreateProjectOpen ?
            <CreateProject isOpen={this.state.isCreateProjectOpen} onClose={handleCreateProjectClose}/>
            : '';
        return (
            <div>
                {createProjectModal}
                <AppBar position='fixed'>
                    <Toolbar>
                        {showNavButtons}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navbar;
