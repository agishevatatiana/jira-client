import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import ProjectColumn from "./ProjectColumn";
import { Column } from "../models/models";
import { defaultColumns } from "../mocks/mocks";


type DndProjectColumnsState = {
    columns: Column[]
}
//
// const columnSource = {
//     beginDrag(props: any, monitor: any, component: Component) {
//         console.log('props: ', props);
//         console.log('monitor: ', monitor);
//         console.log('component: ', component);
//     }
// };
//
// const columnTarget = {
//     canDrop(props: any, monitor: any) {
//         const item = monitor.getItem();
//         console.log(item);
//         return true;
//     },
//
//     hover(props: any, monitor: any, component: any) {
//         console.log('hover');
//     }
// };
//
// const Types = {
//     COLUMN: 'column'
// };
//
// function collect(connect: any, monitor: any) {
//     return {
//         // Call this function inside render()
//         // to let React DnD handle the drag events:
//         connectDragSource: connect.dragSource(),
//         // You can ask the monitor about the current drag state:
//         isDragging: monitor.isDragging()
//     }
// }
//
// function collectTargets(connect: any, monitor: any) {
//     return {
//         // Call this function inside render()
//         // to let React DnD handle the drag events:
//         connectDropTarget: connect.dropTarget(),
//         // You can ask the monitor about the current drag state:
//         isOver: monitor.isOver(),
//         isOverCurrent: monitor.isOver({ shallow: true }),
//         canDrop: monitor.canDrop(),
//         itemType: monitor.getItemType()
//     }
// }

class DndProjectColumns extends Component<{}, DndProjectColumnsState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            columns: defaultColumns
        }
    }

    render() {
        const { columns } = this.state;
        const columnsView = columns.map((col, index) => (<ProjectColumn key={col.key} column={col} />));
        return (
            <Grid container spacing={2}>
                {columnsView}
            </Grid>
        );
    }
}

export default DndProjectColumns;
