import { Styles } from '@material-ui/styles/withStyles';
import grey from '@material-ui/core/colors/grey';

export const projectColumnStyles: Styles<any, any> = {
    paper: {
        minHeight: '200px',
        backgroundColor: grey[100],
        position: 'relative'
    },
    columnHeader: {
        padding: '8px'
    },
    columnTitle: {
        marginRight: '5px'
    },
    handlerClass: {
        cursor: 'grab !important'
    },
    handlerMove: {
        cursor: 'grabbing !importants'
    }
};
