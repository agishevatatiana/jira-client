import { Theme } from '@material-ui/core';

export const formsStyles: any = (theme: Theme) => ({
    form: {
        textAlign: 'center'
    },
    textField: {
        width: '100%',
        margin: '15px 0'
    },
    selectField: {
        width: '350px'
    },
    button: {
        margin: '35px 0 15px'
    },
    customError: {
        color: theme.palette.error.main
    },
    smallInfo: {
        padding: '0 0 35px'
    }
});
