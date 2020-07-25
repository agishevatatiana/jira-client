// https://github.com/minwe/jetbrains-react

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(name, key, lead) {
    return { name, key, lead };
}

const rows = [
    createData('proj name', 'proj key', 'me')
];

class projects extends Component {
    static
    defaultProps = {};

    static
    propTypes = {};

    state = {};

    render()
    {
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
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.key}</TableCell>
                                    <TableCell align="left">{row.lead}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default projects;
