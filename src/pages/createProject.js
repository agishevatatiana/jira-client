import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const styles = {
    card: {
        display: 'flex'
    }
};

class createProject extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        const { classes } = this.props;
        return (
            <div></div>
        );
    }
}

export default withStyles(styles)(createProject);
