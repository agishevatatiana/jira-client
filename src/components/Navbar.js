import React, {useContext, Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// https://material-ui.com/components/app-bar/
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CreateProject from "../pages/createProject";

class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            authenticated: false,
            isCreateProjectOpen: false
        };
    }
    static defaultProps = {};

    static propTypes = {};

    getAuthState = async() => {
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
    };

    componentDidMount() {
        this.getAuthState()
    }

    handleCreateProjectOpen = () => {
        this.setState({ isCreateProjectOpen: true });
    };

    handleCreateProjectClose = (isOpen) => {
        this.setState({ isCreateProjectOpen: !isOpen });
    };

    render() {
        let showNavButtons = this.state.authenticated
            ?
            <div className='position-container'>
                <div className='position-start'><Button color='inherit' component={Link} to='/'>Projects</Button></div>
                <div className='position-end'>
                    <Fab color='primary' variant='extended' size='medium' onClick={this.handleCreateProjectOpen}>
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
        return (
            this.state.isCreateProjectOpen
                ?
                <CreateProject open={this.state.isCreateProjectOpen} close={this.handleCreateProjectClose}/>
                :
                <AppBar position='fixed'>
                    <Toolbar>
                        {showNavButtons}
                    </Toolbar>
                </AppBar>
        );
    }
}

export default Navbar;
