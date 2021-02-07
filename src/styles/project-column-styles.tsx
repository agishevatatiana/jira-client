import { Styles } from '@material-ui/styles/withStyles';
import grey from "@material-ui/core/colors/grey";

export const projectColumnStyles: Styles<any, any> = {
    paper: {
        minHeight: '200px',
        backgroundColor: grey.A100
    },
    columnHeader: {
        padding: '8px'
    }
};
