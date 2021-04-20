import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import update from 'immutability-helper';
import { DropTarget, DropTargetMonitor } from 'react-dnd';
import { isEqual } from 'lodash';

import { DnDTypes } from '../../models/constants';
import { ProjectColumnProps, Task, TasksMap, taskStatus } from '../../models/models';
import TaskCard from './TaskCard';

type DndTaskCardsState = {
    filteredTasks: Task[]
}

type DndTaskCardsProps = {
    tasks: Task[],
    tasksMap: TasksMap,
    filteredTasks: Task[],
    onTasksChange: Function,
    status: taskStatus,
    classes: any,
    connectDropTarget: any,
    item: Task,
    canDrop: any,
    didDrop: boolean
}

const taskTarget = {
    drop(props: DndTaskCardsProps, monitor: DropTargetMonitor, parent: DndTaskCards) {
        const item = monitor && monitor.getItem();
        if (!item || !props || item.status === props.status) return;

        item.status = props.status;
        const { tasks, onTasksChange } = props;
        let index = tasks.findIndex(t => t.key === item.key);
        item.type = tasks[index].type;

        let newTask = item;
        let oldTask = tasks[index];

        let oldFilteredTasks = tasks
            .filter(t => t.status === oldTask.status && t.key !== oldTask.key)
            .map((t, index) => ({ ...t, sequence: index }));
        let newFilteredTasks = [...tasks, newTask]
            .filter(t => t.status === newTask.status)
            .map((t, index) => ({ ...t, sequence: index }));
        let restFilteredTasks = tasks.filter(t => t.status !== newTask.status && t.status !== oldTask.status)
            .map((t, index) => ({ ...t, sequence: index }));

        const oldStatus = (oldFilteredTasks[0] || {}). status;
        const newStatus = (newFilteredTasks[0] || {}). status;
        const restStatus = (restFilteredTasks[0] || {}). status;

        let tasksMap: TasksMap = {};

        if (oldStatus) tasksMap[oldStatus] = oldFilteredTasks;
        if (newStatus) tasksMap[newStatus] = newFilteredTasks;
        if (restStatus) tasksMap[restStatus] = restFilteredTasks;

        onTasksChange([...oldFilteredTasks, ...newFilteredTasks, ...restFilteredTasks], tasksMap);
    },

    canDrop(props: DndTaskCardsProps, monitor: DropTargetMonitor) {
        const item = monitor.getItem();
        return item && item.key && item.status !== props.status;
    },

    hover(props: DndTaskCardsProps, monitor: DropTargetMonitor) {
        const item = monitor.getItem();
        if (!item || !item.key || item.status !== props.status) return;
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
        item: monitor.getItem(),
        didDrop: monitor.didDrop()
    }
}

class DndTaskCards extends Component <DndTaskCardsProps, DndTaskCardsState> {
    pendingUpdateFn: any;
    requestedFrame: number | undefined;

    constructor(props: DndTaskCardsProps) {
        super(props);
        this.state = {
            filteredTasks: this.props.filteredTasks
        }
    }


    scheduleUpdate(updateFn: any): void {
        this.pendingUpdateFn = updateFn;

        if (!this.requestedFrame) {
            this.requestedFrame = requestAnimationFrame(this.drawFrame);
        }
    }

    drawFrame = (): void => {
        const nextFiltered = update(this.state, this.pendingUpdateFn);
        const { filteredTasks } = nextFiltered;
        const { tasks, onTasksChange } = this.props;
        const rest = tasks.filter(t => t.status !== filteredTasks[0].status);

        onTasksChange([...filteredTasks, ...rest]);

        this.pendingUpdateFn = undefined;
        this.requestedFrame = undefined;
    };

    moveTask = (key: string, afterKey: string): void => {
        const { filteredTasks } = this.state;

        let task = null;
        let taskAfter = null;
        let index = null;
        let afterIndex = null;

        for (let i = 0; i < filteredTasks.length; i++) {
            if (filteredTasks[i].key === key) {
                task = filteredTasks[i];
                index = i;
            }

            if (filteredTasks[i].key === afterKey) {
                taskAfter = filteredTasks[i];
                afterIndex = i;
            }
        }

        if (!task || !taskAfter || index === null || afterIndex === null) return;

        task.sequence = afterIndex;
        taskAfter.sequence = index;

        this.scheduleUpdate({
            filteredTasks: {
                $splice: [
                    [index, 1],
                    [afterIndex, 0, taskAfter],
                ],
            }
        })
    };

    componentDidUpdate(prevProps: Readonly<DndTaskCardsProps>, prevState: Readonly<DndTaskCardsState>, snapshot?: any): void {
        if (!isEqual(prevProps.tasksMap, this.props.tasksMap)) {
            this.setState({ filteredTasks: this.props.filteredTasks });
        }
    }

    componentWillUnmount(): void {
        if (this.requestedFrame !== undefined) {
            cancelAnimationFrame(this.requestedFrame)
        }
    }

    render() {
        const { status, classes, connectDropTarget, canDrop, item } = this.props;
        const { dropArea, flexGrab1 } = classes;
        const showDropCover = (canDrop && item.status !== status) ? dropArea : '';
        const tasksView = this.state.filteredTasks
            .sort((a, b) => a.sequence - b.sequence)
            .map(task => (<TaskCard key={task?.key} task={task} moveTask={this.moveTask} />))
        return (
            connectDropTarget(
                <div className={`${flexGrab1} ${showDropCover}`}>
                    <Grid item container direction="column">
                        {tasksView}
                    </Grid>
                </div>
            )
        );
    }
}

export default DropTarget(DnDTypes.TASK, taskTarget, collectTargets)(DndTaskCards);
