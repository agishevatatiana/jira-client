import React, {Component} from 'react';

import { columnsType } from '../models/models';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

import EditMenu from './EditMenu';
import { projectColumnStyles } from '../styles/project-column-styles';

type ProjectColumnProps = {
    columns: columnsType,
    classes: any
}
class ProjectColumn extends Component<ProjectColumnProps, {}> {

    render() {
        const columnEditMenu = ['Set column limit', 'Delete'];
        const { columns, classes } = this.props;
        return (
            Object.keys(columns).map((col, index) => {
                return (
                    <Grid key={index} item container direction="column" xs>
                        <Paper className={classes.paper}>
                            <Grid className={classes.columnHeader} item container direction="row" justify="space-between">
                                <Grid item>
                                    <Typography variant="overline">{columns[col]}</Typography>
                                </Grid>
                                <Grid item>
                                    <EditMenu menuItems={columnEditMenu} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )})
        );
    }
}

export default withStyles(projectColumnStyles)(ProjectColumn);
