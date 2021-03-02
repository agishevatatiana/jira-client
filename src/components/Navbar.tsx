import React, { Component, createRef } from "react";
import { Link } from 'react-router-dom';
import { withRouter, matchPath } from 'react-router';

// https://material-ui.com/components/app-bar/
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import CreateProject from "../dialog/createProject";
import { WithRouterProps } from "../models/models";
import { routerPath } from "../models/constants";
import CreateTask from "../dialog/createTask";

type NavbarState = {
    authenticated: boolean;
    isCreateOpened: boolean;
    projectKey: string;
}

class Navbar extends Component<WithRouterProps, NavbarState> {

    constructor(props: WithRouterProps) {
        super(props);
        this.state = {
            authenticated: false,
            isCreateOpened: false,
            projectKey: ''
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

    setIsOnProjectPage(): void {
        const { location, history } = this.props;
        const { projectPath } = routerPath;

        const updateIsMathByLocation = (location: any): void => {
            const { pathname } = location;
            const { projectKey } = this.state;
            const match: any = matchPath(pathname, {path: projectPath}) || {};
            const { params } = match;
            let projectKeyCurrent = params && params.projectKey || '';
            if (projectKeyCurrent !== projectKey) {
                this.setState({
                    projectKey: projectKeyCurrent
                });
            }
        };

        updateIsMathByLocation(location);
        history.listen(updateIsMathByLocation);
    }

    componentDidMount() {
        this.getAuthState();
        this.setIsOnProjectPage();
    }

    render() {
        const { authenticated, isCreateOpened, projectKey } = this.state;
        const handleCreateProjectOpen = () => {
            this.setState({ isCreateOpened: true });
        };

        const handleCreateProjectClose = (isOpen: boolean) => {
            this.setState({ isCreateOpened: !isOpen });
        };
        const btnText = projectKey ? 'Create Issue' : 'Create Project';

        const showNavButtons = authenticated
            ?
            <div className='position-container'>
                <div className='position-start'><Button color='inherit' component={Link} to='/'>Projects</Button></div>
                <div className='position-end'>
                    <Fab color='primary' variant='extended' size='medium' onClick={handleCreateProjectOpen}>
                        <AddIcon/>
                        {btnText}
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

        // open create forms in dialog windows
        // todo: rewrite this dialogs to react refs, might help to read
        // https://github.com/styled-components/styled-components/issues/2154
        // https://medium.com/trabe/getting-rid-of-finddomnode-method-in-your-react-application-a0d7093b2660
        const dialogByRoute = projectKey
            ? <CreateTask isOpen={isCreateOpened} projectKey={projectKey} onClose={handleCreateProjectClose} />
            : <CreateProject isOpen={isCreateOpened} onClose={handleCreateProjectClose}/>;

        const createDialog = isCreateOpened ? dialogByRoute : '';
        // ----open create forms in dialog windows

        return (
            <div>
                {createDialog}
                <AppBar position='fixed'>
                    <Toolbar>
                        {showNavButtons}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(Navbar);
