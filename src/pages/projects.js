// https://github.com/minwe/jetbrains-react

import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class projects extends Component {
    static
    defaultProps = {};

    static
    propTypes = {};

    state = {
        projects: null,
        errors: null
    };

    getRows = async() => {
        try {
            const projectsRes = await axios.get('/projects');
            this.setState({
                projects: projectsRes.data
            });
        } catch (err) {
            console.log('/projects faild: ', err);
            this.setState({ errors: err.message });
        }
    };

    componentDidMount() {
        this.getRows()
    }

    render()
    {
        let projectRows = this.state.projects
            ? this.state.projects.map((row) => (
                <TableRow key={row.name}>
                    <TableCell component='th' scope='row'>
                        {row.name}
                    </TableCell>
                    <TableCell align='left'>{row.key}</TableCell>
                    <TableCell align='left'>{row.lead}</TableCell>
                </TableRow>
            ))
            : (this.state.errors
                ? <TableRow><TableCell align='left'>{this.state.errors}</TableCell></TableRow>
                : <TableRow><TableCell align='left'>Loading...</TableCell></TableRow>);
        return (
            <div>
                <h1>Projects</h1>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Key</TableCell>
                                <TableCell>Lead</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projectRows}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default projects;
