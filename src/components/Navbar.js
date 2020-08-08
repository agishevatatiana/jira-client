import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// https://material-ui.com/components/app-bar/
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class Navbar extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <AppBar position='fixed'>
                <Toolbar>
                    <div className='position-container'>
                        <div className='position-start'>
                            <Button color='inherit' component={Link} to='/login'>Log In</Button>
                            <Button color='inherit' component={Link} to='/signup'>Sign Up</Button>
                            <Button color='inherit' component={Link} to='/'>Projects</Button>
                        </div>
                        <div className='position-end'>
                            <Fab color='primary' variant='extended' size='medium'>
                                <AddIcon/>
                                Create Project
                            </Fab>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navbar;
