import { Theme } from "@material-ui/core";

export const textEditorStyles: any = (theme: Theme) => ({
    textEditorMenu: {
        border: `1px solid ${theme.palette.divider}`,
        flexWrap: 'wrap',
        borderRadius: '4px 4px 0 0'
    },

    textEditorArea: {
        border: `1px solid ${theme.palette.divider}`,
        borderTop: 0,
        flexWrap: 'wrap',
        borderRadius: '0 0 4px 4px',
        minHeight: '200px',
        padding: '10px',
        cursor: 'text',
    },

    selectControlsList: {
        left: '-60px !important'
    }
});
