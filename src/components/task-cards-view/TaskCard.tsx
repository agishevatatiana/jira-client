import React, { Component, Fragment } from 'react';
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    Theme,
    Typography,
    withStyles
} from '@material-ui/core';
import { DragLayerMonitor, DragSource, DropTarget, DropTargetMonitor } from 'react-dnd';
import { flow } from 'lodash';

import { getUserById } from '../../mocks/mocks';
import { DnDTypes, priorityIcons, taskTypeIcons } from '../../models/constants';
import { TaskCardProps } from '../../models/models';
import { blockStyles, indentsStyles, taskCardStyles, typographyStyles } from '../../styles';

const taskSource = {
    beginDrag(props: TaskCardProps) {
        const item = {
            ...props.task,
            type: DnDTypes.TASK,
            id: props.key,
        };
        return item;
    }
};

const taskTarget = {
    canDrop(props: TaskCardProps, monitor: DropTargetMonitor) {
        const item = monitor.getItem();
        return item && item.key && item.key !== props.task.key;
    },

    hover(props: TaskCardProps, monitor: DropTargetMonitor) {
        const item = monitor.getItem();
        if (!item || !item.key || item.key === props.task.key) {
            return;
        }
        props.moveTask(item.key, props.task.key);
    }
};

function collectTargets(connect: any, monitor: DropTargetMonitor) {
    return {
        accept: DnDTypes.TASK,
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

class TaskCard extends Component<TaskCardProps, {}> {
    constructor(props: TaskCardProps) {
        super(props);
    }

    render() {
        const { task, classes, connectDragPreview, connectDropTarget, connectDragSource, isDragging } = this.props;
        const { mBMiddle, flex, spaceBetween, avatarMiddle, mLSmall } = classes;
        console.log(task);
        const { key, type, summary, priority, project_key_title, assignee, status, sequence, task_number } = task;
        return (
            connectDragPreview(connectDropTarget(connectDragSource(
                <div className={mBMiddle}>
                    <Card key={key}>
                        <CardActions><Typography>{summary}</Typography></CardActions>
                        <CardActions className={`${flex} ${spaceBetween}`} disableSpacing>
                            <div className={flex}>
                                <img src={taskTypeIcons[type]} />
                                <Fragment>{priorityIcons(classes[`priority${priority}`])[priority]}</Fragment>
                            </div>

                            <div className={flex}>
                                <Typography>{project_key_title}-{task_number}</Typography>
                                <Fragment>{
                                    assignee ? (
                                        <Avatar
                                            alt={getUserById(assignee)?.full_name}
                                            src={getUserById(assignee)?.avatar}
                                            className={`${avatarMiddle} ${mLSmall}`}
                                        />
                                    ) : ''
                                }</Fragment>
                            </div>
                        </CardActions>
                    </Card>
                </div>
            )))
        );
    }
}

export default flow(
    DragSource(DnDTypes.TASK, taskSource, collect),
    DropTarget(DnDTypes.TASK, taskTarget, collectTargets),
    withStyles((theme: Theme) => ({...taskCardStyles, ...blockStyles, ...typographyStyles(theme), ...indentsStyles(theme)}))
)(TaskCard);


