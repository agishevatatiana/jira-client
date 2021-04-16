import React, { Component } from 'react';
import { Grid, Paper, Theme, Typography, withStyles } from '@material-ui/core';
import { DragLayerMonitor, DragSource, DropTarget, DropTargetMonitor } from 'react-dnd';
import { flow } from 'lodash';

import { ProjectColumnProps, taskStatus } from '../../models/models';
import { DnDTypes } from '../../models/constants';
import EditMenu from '../EditMenu';
import { indentsStyles, projectColumnStyles } from '../../styles';
import DndTaskCards from '../task-cards-view/DndTaskCards';

// todo: 1) fix problem with strange shadow behavior with dnd
//  2) fix cursor handlerMove using react-dnd effects
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
        const { key, title, task_number } = column;
        const { handlerMove, handlerClass, columnHeader, columnTitle, paper } = classes;
        const handler = (title: string, task_number: number) => connectDragSource(
            <div className={isDragging ? handlerMove : handlerClass}>
                <Typography variant="overline" className={columnTitle}>{title}</Typography>
                <Typography variant="overline">{task_number}</Typography>
            </div>
        );
        const opacity = isDragging ? 0 : 1;
        const preview = (key: taskStatus, title: string) => {
            return connectDragPreview(connectDropTarget(
                <div key={key} style={ {opacity, height: '100%'} }>
                    <Paper className={paper}>
                        <Grid className={columnHeader} item container direction="row" justify="space-between">
                            <Grid item>
                                {handler(title, task_number)}
                            </Grid>
                            <Grid item>
                                <EditMenu menuItems={columnEditMenu}/>
                            </Grid>
                        </Grid>
                        <DndTaskCards status={key} classes={classes} />
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
    withStyles((theme: Theme) => ({
        ...projectColumnStyles(theme),
        ...indentsStyles(theme)
    }))
)(ProjectColumn);
