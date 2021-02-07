import React, {Component} from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Typography, Grid, Paper } from '@material-ui/core';

import { Project, User, columnsType } from '../models/models';
import { getProjectByKey, getUsersByProjectKey, defaultColumns } from '../mocks/mocks';
import Breadcrumbs from '../components/Breadcrumbs';
import UsersList from '../components/UsersList';
import EditMenu from "../components/EditMenu";
import ProjectColumn from "../components/ProjectColumn";

type ProjectProps = {
    match: any;
};

type ProjectState = {
    project: Project | null;
    users: User[];
    errors: any;
    columns: columnsType
}

class project extends Component<ProjectProps, ProjectState> {

    constructor(props: any) {
        super(props);
        this.state = {
            project: null,
            users: [],
            errors: null,
            columns: defaultColumns
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
        const { project, users, columns } = this.state;
        const breadcrumbsLinks = [{ to: '/', title: 'Projects' }];
        return (
            <div>
                <Breadcrumbs links={breadcrumbsLinks} current={project?.name} />
                <UsersList users={users} />
                <DndProvider backend={HTML5Backend}>
                    <Grid container spacing={2}>
                        <ProjectColumn columns={columns} />
                    </Grid>
                </DndProvider>
            </div>
        );
    }
}

export default project;
