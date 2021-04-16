import { Theme } from '@material-ui/core';

export const editMenuStyles: any = (theme: Theme) => ({
    popper: {
        top: '36px !important',
        left: 'auto !important',
        right: '8px !important',
        transform: 'none !important'
    },
    openBtn: {
        backgroundColor: theme.palette.primary.light
    }
});
