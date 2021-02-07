import React, {Component} from 'react';

import { Column, ItemTypes } from "../models/models";
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { DragSource, useDrag } from "react-dnd"
import { flow } from 'lodash';

import EditMenu from './EditMenu';
import { projectColumnStyles } from '../styles/project-column-styles';

type ProjectColumnProps = {
    column: Column,
    key: string,
    classes: any,
    connectDragSource: any,
    connectDragPreview: any
}

const columnSource = {
    beginDrag(props: any, monitor: any, component: Component) {
        console.log('props: ', props);
        console.log('monitor: ', monitor);
        console.log('component: ', component);
        const item = { id: props.key };
        return item;
    }
};
const Types = {
    COLUMN: 'column'
};

function collect(connect: any, monitor: any) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging(),
        opacity: monitor.isDragging() ? 0 : 1
    }
}
class ProjectColumn extends Component<ProjectColumnProps, {}> {

    render() {
        const columnEditMenu = ['Set column limit', 'Delete'];
        const {column, classes, connectDragSource, connectDragPreview} = this.props;
        const {key, title, sequence} = column;
        console.log(this.props);
        const handler = (title: string) => connectDragSource(<div><Typography variant="overline">{title}</Typography></div>);
        const preview = (key: string, title: string, index: number) => {
            return connectDragPreview(
                <div key={key}>
                        <Paper className={classes.paper}>
                            <Grid className={classes.columnHeader} item container direction="row"
                                  justify="space-between">
                                <Grid item>
                                    {handler(title)}
                                </Grid>
                                <Grid item>
                                    <EditMenu menuItems={columnEditMenu}/>
                                </Grid>
                            </Grid>
                        </Paper>
                </div>)
        };
        return (
            <Grid item container direction="column" xs>
                {preview(key, title, sequence)}
            </Grid>
        );
    }
}

export default flow(DragSource(Types.COLUMN, columnSource, collect), withStyles(projectColumnStyles))(ProjectColumn);
