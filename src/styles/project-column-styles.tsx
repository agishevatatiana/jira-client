import { Styles } from '@material-ui/styles/withStyles';
import grey from "@material-ui/core/colors/grey";

export const projectColumnStyles: Styles<any, any> = {
    paper: {
        minHeight: '200px',
        backgroundColor: grey.A100,
        position: 'relative'
    },
    columnHeader: {
        padding: '8px'
    },
    handler: {
        cursor: 'grab !important'
    },
    handlerMove: {
        cursor: 'grabbing !importants'
    }
};
