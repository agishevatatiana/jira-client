import { Styles } from '@material-ui/styles/withStyles';
import grey from '@material-ui/core/colors/grey';

export const editMenuStyles: Styles<any, any> = {
    popper: {
        top: '36px !important',
        left: 'auto !important',
        right: '8px !important',
        transform: 'none !important'
    },
    openBtn: {
        backgroundColor: grey.A100
    }
};
