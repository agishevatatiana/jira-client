import React, {Component, createRef} from 'react';
import Fab from "@material-ui/core/Fab";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

import { User } from '../models/models';
import { usersListStyles } from '../styles/users-list-styles';

type UsersListProps = {
    users: User[],
    classes: any
}

class UsersList extends Component<UsersListProps, {}> {
    refT = createRef(); // todo: figure out how to get rid of warning which required refs
    constructor(props: UsersListProps) {
        super(props);
    }


    render() {
        const { users, classes } = this.props;
        const mapUsers = users.map((user) =>{
            return user.avatar
                ?
                    <Fab className={classes.fab} key={user.key}>
                        <Avatar alt={user.full_name} src={user.avatar}></Avatar>
                    </Fab>
                :
                    <Fab className={classes.fab} key={user.key}>
                        <Avatar alt={user.full_name}>{user.full_name.substring(0, 1)}</Avatar>
                    </Fab>
        });
        const tooltipMessage = "Add people (currently not available)";
        const addBtn = (
            <Fab className={classes.fab}>
                <Avatar><GroupAddIcon /></Avatar>
            </Fab>
        );
        return (
            <div>
                {mapUsers}
                <Tooltip placement="top" title={tooltipMessage} arrow innerRef={this.refT}>
                    {addBtn}
                </Tooltip>
            </div>
        );
    }
}

export default withStyles(usersListStyles)(UsersList);
