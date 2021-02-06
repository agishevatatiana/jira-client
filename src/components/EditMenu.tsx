import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {IconButton, Menu, MenuItem, MenuList, Paper} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

type EditMenuProps = {
    columnOptions: string[];
}

// todo: rewrite: replace Menu with Popper (https://material-ui.com/components/menus/#menulist-composition)
function EditMenu(props: EditMenuProps) {
    const { columnOptions } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="edit-menu"
                aria-haspopup="true"
                size="small"
                onClick={handleClick}
            >
                <MoreHorizIcon/>
            </IconButton>
            <Menu
                id="edit-menu"
                anchorEl={anchorEl}
                keepMounted
                open={!!open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: 25 * 4.5,
                        width: '15ch'
                    },
                }}
            >
                {columnOptions.map((option) => (
                    <MenuItem key={option}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

EditMenu.propTypes = {
    columnOptions: PropTypes.array.isRequired
};
EditMenu.defaultProps = {};

export default EditMenu;
