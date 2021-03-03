import { Theme } from "@material-ui/core";

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
    }
});
