import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Project } from "../models/models";
import { projectsMock } from "../mocks/mocks";

type ProjectsProps = {

}

type ProjectsState = {
    projects: Project[];
    errors: any;
}

class projects extends Component <ProjectsProps, ProjectsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            projects: [],
            errors: null
        };
    }

    async getRows() {
        this.setState({
            projects: projectsMock
        });
        // try {
        //     const projectsRes = await axios.get('/projects');
        //     this.setState({
        //         projects: projectsRes.data
        //     });
        // } catch (err) {
        //     console.log('/projects failed: ', err);
        //     this.setState({ errors: err.message });
        // }
    }

    componentDidMount() {
        this.getRows();
    }

    render() {
        // parse table data
        const tableData = (this.state.projects || []).map((rowData) => {
            const row = {
                ...rowData,
                link: <Link color="primary" component={RouterLink} to={`project/${rowData.key}`}>{rowData.name}</Link>
            };
            return (
                <TableRow key={row.name}>
                    <TableCell component='th' scope='row'>
                        {row.link}
                    </TableCell>
                    <TableCell align='left'>{row.project_key}</TableCell>
                    <TableCell align='left'>{row.lead}</TableCell>
                </TableRow>
            )});

        const tableErrors = (this.state.errors
                ? <TableRow><TableCell align='left'>{this.state.errors}</TableCell></TableRow>
                : <TableRow><TableCell align='left'>Loading...</TableCell></TableRow>
        );
        const projects = this.state.projects ? tableData : tableErrors;
        // - parse table data

        // create table components using table data
        const tableHead = (
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Key</TableCell>
                    <TableCell>Lead</TableCell>
                </TableRow>
            </TableHead>
        );
        const tableBody = (
            <TableContainer component={Paper}>
                <Table>
                    {tableHead}
                    <TableBody>
                        {projects}
                    </TableBody>
                </Table>
            </TableContainer>
        );
        return (
            <div>
                <h1>Projects</h1>
                {tableBody}
            </div>
        );
    }
}

export default projects;
