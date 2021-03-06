import React, {Component} from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Project, User } from '../models/models';
import { getProjectByKey, getUsersByProjectKey } from '../mocks/mocks';
import Breadcrumbs from '../components/Breadcrumbs';
import UsersList from '../components/UsersList';
import DndProjectColumns from "../components/DndProjectColumns";

type ProjectProps = {
    match: any;
};

type ProjectState = {
    project: Project | null;
    users: User[];
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
        const breadcrumbsLinks = [{ to: '/', title: 'Projects' }];
        return (
            <div>
                <Breadcrumbs links={breadcrumbsLinks} current={project?.name} />
                <UsersList users={users} />
                <DndProvider backend={HTML5Backend}>
                    <DndProjectColumns />
                </DndProvider>
            </div>
        );
    }
}

export default project;
