import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import update from 'immutability-helper';

import { tasksMock } from '../../mocks/mocks';
import { Task, taskStatus } from '../../models/models';
import TaskCard from './TaskCard';

type DndTaskCardsState = {
    tasks: Task[]
}

type DndTaskCardsProps = {
    status: taskStatus,
    classes: any
}

class DndTaskCards extends Component <DndTaskCardsProps, DndTaskCardsState> {
    pendingUpdateFn: any;
    requestedFrame: number | undefined;
    constructor(props: DndTaskCardsProps) {
        super(props);
        this.state = {
            tasks: tasksMock
        }
    }

    componentWillUnmount(): void {
        if (this.requestedFrame !== undefined) {
            cancelAnimationFrame(this.requestedFrame)
        }
    }

    scheduleUpdate(updateFn: any) {
        this.pendingUpdateFn = updateFn;

        if (!this.requestedFrame) {
            this.requestedFrame = requestAnimationFrame(this.drawFrame);
        }
    }

    drawFrame = (): void => {
        const nextState = update(this.state, this.pendingUpdateFn);
        this.setState(nextState);

        this.pendingUpdateFn = undefined;
        this.requestedFrame = undefined;
    };

    moveTask = (key: string, afterKey: string): void => {
        const { tasks } = this.state;

        let task = null;
        let taskAfter = null;
        let index = null;
        let afterIndex = null;

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].key === key) {
                task = tasks[i];
                index = i;
            }

            if (tasks[i].key === afterKey) {
                taskAfter = tasks[i];
                afterIndex = i;
            }
        }

        if (!task || !taskAfter || index === null || afterIndex === null) return;

        task.sequence = afterIndex;
        taskAfter.sequence = index;

        this.scheduleUpdate({
            columns: {
                $splice: [
                    [index, 1],
                    [afterIndex, 0, task],
                ],
            }
        })
    };

    render() {
        const { tasks } = this.state;
        const { status, classes } = this.props;
        const { pSmall, pTopZero } = classes;
        const tasksView = tasks
            .filter(task => task.status === status)
            .sort((a, b) => a.sequence - b.sequence)
            .map(t => (<TaskCard key={t.key} task={t} moveTask={this.moveTask}/>));
        return (
            <Grid item container direction="column" className={`${pSmall} ${pTopZero}`}>
                {tasksView}
            </Grid>
        );
    }
}

export default DndTaskCards;
