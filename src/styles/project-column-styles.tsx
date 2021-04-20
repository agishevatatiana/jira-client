import { Theme } from '@material-ui/core';

export const projectColumnStyles: any = (theme: Theme) => ({
    paper: {
        minHeight: '200px',
        backgroundColor: theme.palette.primary.light,
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px'
    },

    dropArea: {
        border: '2px dashed',
        borderColor: theme.palette.success.main,
        borderRadius: '2px'
    },

    columnTitle: {
        marginRight: '5px'
    }
});
