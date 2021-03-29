import React, {useState, useRef, MouseEvent} from 'react';
import PropTypes from 'prop-types';
import { ClickAwayListener, IconButton, MenuItem, MenuList, Paper, Popper, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { withStyles } from '@material-ui/core';

import { editMenuStyles } from '../styles/edit-menu-styles';

type EditMenuProps = {
    menuItems: string[];
    classes: any
}

const EditMenu = (props: EditMenuProps) => {
    const { menuItems, classes } = props;
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent<EventTarget>) => {
        const target = event.target;
        if (anchorRef.current && target instanceof Node && anchorRef.current.contains(target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <IconButton
                className={open ? classes.openBtn : ''}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                size="small"
                onClick={handleToggle}
            >
                <MoreHorizIcon/>
            </IconButton>
            <Popper className={classes.popper} open={open} anchorEl={anchorRef.current} disablePortal>
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" >
                            {menuItems.map((item, index) => (
                                <MenuItem key={index}>
                                    <Typography variant="body2">{item}</Typography>
                                </MenuItem>
                            ))}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </div>
    );
}

EditMenu.propTypes = {
    menuItems: PropTypes.array.isRequired
};
EditMenu.defaultProps = {};

export default withStyles(editMenuStyles)(EditMenu);
