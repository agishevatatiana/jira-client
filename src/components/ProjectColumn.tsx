import React, { Component } from "react";

import { Column } from "../models/models";
import { DnDTypes } from "../models/constants";
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { DragLayerMonitor, DragSource, DropTarget, DropTargetMonitor } from "react-dnd"
import { flow } from 'lodash';

import EditMenu from './EditMenu';
import { projectColumnStyles } from '../styles/project-column-styles';

// todo: 1) fix problem with strange shadow behavior with dnd
//  2) fix cursor handlerMove using react-dnd effects

type ProjectColumnProps = {
    column: Column,
    key: string,
    classes: any,
    moveColumn: (key: string, afterKey: string) => void,
    connectDragSource: any,
    connectDragPreview: any,
    connectDropTarget: any,
    isDragging: boolean
}

const columnSource = {
    beginDrag(props: ProjectColumnProps) {
        const item = {
            ...props.column,
            type: DnDTypes.COLUMN,
            id: props.key,
        };
        return item;
    }
};

const columnTarget = {
    canDrop(props: ProjectColumnProps, monitor: DropTargetMonitor) {
        const item = monitor.getItem();
        return item && item.key && item.key !== props.column.key;
    },

    hover(props: ProjectColumnProps, monitor: DropTargetMonitor) {
        const item = monitor.getItem();
        if (!item || !item.key || item.key === props.column.key) {
            return;
        }
        props.moveColumn(item.key, props.column.key);
    }
};

function collectTargets(connect: any, monitor: DropTargetMonitor) {
    return {
        accept: DnDTypes.COLUMN,
        connectDropTarget: connect.dropTarget(),

        // unused, figure out if it is possible to fix 1), 2) using this properties
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
    }
}

function collect(connect: any, monitor: DragLayerMonitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

class ProjectColumn extends Component<ProjectColumnProps, {}> {
    render() {
        const columnEditMenu = ['Set column limit', 'Delete'];
        const { column, classes, connectDragSource, connectDragPreview, connectDropTarget, isDragging } = this.props;
        const { key, title } = column;
        const handler = (title: string) => connectDragSource(
            <div className={isDragging ? classes.handlerMove : classes.handler}>
                <Typography variant="overline">{title}</Typography>
            </div>
        );
        const opacity = isDragging ? 0 : 1;
        const preview = (key: string, title: string) => {
            return connectDragPreview(connectDropTarget(
                <div key={key} style={ {opacity} }>
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
                </div>
            ))
        };
        return (
            <Grid item container direction="column" xs>
                {preview(key, title)}
            </Grid>
        );
    }
}

export default flow(
    DragSource(DnDTypes.COLUMN, columnSource, collect),
    DropTarget(DnDTypes.COLUMN, columnTarget, collectTargets),
    withStyles(projectColumnStyles)
)(ProjectColumn);
