import React, { Component } from 'react';
import { Grid, Paper, Theme, Typography, withStyles } from '@material-ui/core';
import { DragLayerMonitor, DragSource, DropTarget, DropTargetMonitor } from 'react-dnd';
import { flow, isEqual } from 'lodash';

import { ProjectColumnProps, Task, TasksMap, taskStatus } from '../../models/models';
import { DnDTypes } from '../../models/constants';
import EditMenu from '../EditMenu';
import { blockStyles, indentsStyles, projectColumnStyles } from '../../styles';
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

type DndTaskCardsState = {
    tasksMap: TasksMap
}

class ProjectColumn extends Component<ProjectColumnProps, DndTaskCardsState> {

    constructor(props: ProjectColumnProps) {
        super(props);
        this.state = {
            tasksMap: {}
        }
    }

    onTasksStateChange = (tasks: Task[], tasksMap?: TasksMap): void => {
        this.props.onTasksListChange(tasks);
        if (tasksMap) this.setState({ tasksMap });
    };

    filterTasks = ():void => {
        let tasksMapUpd: TasksMap = {};
        this.props.tasks.forEach(t => {
            if(!tasksMapUpd[t.status]) tasksMapUpd[t.status] = [];
            tasksMapUpd[t.status].push(t);
        });

        this.setState({ tasksMap: tasksMapUpd });
    };

    componentDidUpdate(prevProps: Readonly<ProjectColumnProps>, prevState: Readonly<DndTaskCardsState>, snapshot?: any): void {
        if(!isEqual(prevProps.tasks, this.props.tasks)) {
            this.filterTasks();
        }
    }

    componentDidMount(): void {
        this.filterTasks();
    }

    render() {
        const columnEditMenu = ['Set column limit', 'Delete'];
        const { column, classes, connectDragSource, connectDragPreview, connectDropTarget, isDragging, tasks } = this.props;
        const { key, title } = column;
        const { handlerMove, handlerClass, columnTitle, paper, opacity0, opacity1, height100p } = classes;
        const { tasksMap } = this.state;

        const handler = (title: string, key: taskStatus) => connectDragSource(
            <div className={isDragging ? handlerMove : handlerClass}>
                <Typography variant="overline" className={columnTitle}>{title}</Typography>
                <Typography variant="overline">{(tasksMap[key] || []).length}</Typography>
            </div>
        );

        const opacity = isDragging ? opacity0 : opacity1;
        const preview = (key: taskStatus, title: string) => {
            return connectDragPreview(connectDropTarget(
                <div key={key} className={`${opacity} ${height100p}`}>
                    <Paper className={paper}>
                        <Grid item container direction="row" justify="space-between">
                            <Grid item>
                                {handler(title, column.key)}
                            </Grid>
                            <Grid item>
                                <EditMenu menuItems={columnEditMenu}/>
                            </Grid>
                        </Grid>
                        <DndTaskCards
                            status={column.key}
                            classes={classes}
                            tasks={tasks}
                            tasksMap={tasksMap}
                            filteredTasks={tasksMap[column.key] || []}
                            onTasksChange={this.onTasksStateChange}
                        />
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
        ...indentsStyles(theme),
        ...blockStyles
    }))
)(ProjectColumn);
