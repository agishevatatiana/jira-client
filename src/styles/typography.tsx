import { Theme } from '@material-ui/core';

export const typographyStyles: any = (theme: Theme) => ({
    toCapitalize: {
        textTransform: 'capitalize'
    },
    optH1: {
        fontSize: '2em',
    },
    optH2: {
        fontSize: '1.5em',
    },
    optH3: {
        fontSize: '1.17em',
    },
    optH4: {
        fontSize: '1em',
    },
    optH5: {
        fontSize: '0.83em',
    },
    optH6: {
        fontSize: '0.67em',
    },
    optP: {
        fontSize: '14px',
    },
    divider: {
        margin: theme.spacing(1, 0.5)
    },
    priorityHighest: {
        color: theme.palette.error.dark
    },
    priorityHigh: {
        color: theme.palette.error.main
    },
    priorityMedium: {
        color: theme.palette.warning.main
    },
    priorityLow: {
        color: theme.palette.success.main
    },
    priorityLowest: {
        color: theme.palette.success.dark
    },
    avatarSmall: {
        width: theme.spacing(2.5),
        height: theme.spacing(2.5),
    },
    avatarMiddle: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    lineThrough: {
        textDecoration: 'line-through'
    }
});
