import { Theme } from '@material-ui/core';

export const indentsStyles: any = (theme: Theme) => ({
    lineMb: {
        marginBottom: '35px'
    },
    textMb: {
        marginBottom: '5px'
    },
    mTSmall: {
        marginTop: theme.spacing(0.3)
    },
    mBSmall: {
        marginBottom: theme.spacing(0.3)
    },
    mLSmall: {
        marginLeft: theme.spacing(0.3)
    },
    mRSmall: {
        marginRight: theme.spacing(0.3)
    },
    mRMid: {
        marginRight: theme.spacing(1)
    },
    mLNegative: {
        marginLeft: theme.spacing(-1)
    }
});
