import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import update from 'immutability-helper';

import ProjectColumn from './ProjectColumn';
import { Column, Task } from '../../models/models';
import { defaultColumns, tasksMock } from '../../mocks/mocks';

type DndProjectColumnsState = {
    columns: Column[],
    tasks: Task[]
}

class DndProjectColumns extends Component<{}, DndProjectColumnsState> {
    pendingUpdateFn: any;
    requestedFrame: number | undefined;
    constructor(props: {}) {
        super(props);
        this.state = {
            columns: defaultColumns,
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

    moveColumn = (key: string, afterKey: string): void => {
        const { columns } = this.state;

        let column = null;
        let columnAfter = null;
        let index = null;
        let afterIndex = null;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].key === key) {
                column = columns[i];
                index = i;
            }

            if (columns[i].key === afterKey) {
                columnAfter = columns[i];
                afterIndex = i;
            }
        }

        if (!column || !columnAfter || index === null || afterIndex === null) return;

        column.sequence = afterIndex;
        columnAfter.sequence = index;

        this.scheduleUpdate({
            columns: {
                $splice: [
                    [index, 1],
                    [afterIndex, 0, column],
                ],
            }
        })
    };

    tasksListChange = (tasks: Task[]): void => {
        this.setState({tasks});
    };

    render() {
        const { columns, tasks } = this.state;
        const columnsView = columns
            .sort((a, b) => a.sequence - b.sequence)
            .map((col, index) => (
                <ProjectColumn
                    key={col.key}
                    column={col}
                    tasks={tasks}
                    moveColumn={this.moveColumn}
                    onTasksListChange={this.tasksListChange}
                />));
        return (
            <Grid container spacing={2}>
                {columnsView}
            </Grid>
        );
    }
}

export default DndProjectColumns;
