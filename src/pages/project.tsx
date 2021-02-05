import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

import { Project, User } from '../models/models';
import { getProjectByKey, getUsersByProjectKey } from '../mocks/mocks';

type ProjectProps = {
    match: any;
};

type ProjectState = {
    project: Project | null;
    users: User[],
    errors: any;
}

class project extends Component<ProjectProps, ProjectState> {

    constructor(props: any) {
        super(props);
        this.state = {
            project: null,
            users: [],
            errors: null
        };
    }

    async getDataByProjectKey(projectKey: string) {
        this.setState({
            project: getProjectByKey(projectKey) || null,
            users: getUsersByProjectKey(projectKey) || []
        });
    }

    componentDidMount() {
        const { match : { params } } = this.props;
        const { projectKey } = params;
        this.getDataByProjectKey(projectKey);
    }

    render() {
        const { project, users } = this.state;
        const breadcrumbs = (
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" component={RouterLink} to="/">
                    Projects
                </Link>
                <Typography color="textPrimary">{project?.name} board</Typography>
            </Breadcrumbs>
        );

        // parse users of project
        const mapUsers = users.map((user) =>{
            return user.avatar
                ? <Fab key={user.key}><Avatar alt={user.full_name} src={user.avatar}></Avatar></Fab>
                : <Fab key={user.key}><Avatar alt={user.full_name}>{user.full_name.substring(0, 1)}</Avatar></Fab>
        });
        const addUserBtn = (
            <Fab key="addUserBtn" >
                <Tooltip title="Add people (currently not available)">
                    <Avatar>
                        <GroupAddIcon />
                    </Avatar>
                </Tooltip>
            </Fab>
        );
        mapUsers.push(addUserBtn);
        // ---parse users of project

        return (
            <div>
                {breadcrumbs}
                {mapUsers}
            </div>
        );
    }
}

export default project;
