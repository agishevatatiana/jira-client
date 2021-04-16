import { Theme } from '@material-ui/core';

export const projectColumnStyles: any = (theme: Theme) => ({
    paper: {
        minHeight: '200px',
        backgroundColor: theme.palette.primary.light,
        position: 'relative',
        height: '100%'
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
});
