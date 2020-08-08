import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import axios from 'axios';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { formsStyles } from '../styles/forms-styles';

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const {email, password} = this.state;
        const userData = {email, password};
        try {
            const token = await axios.post('/login', userData);
            localStorage.setItem('JiraToken', `Bearer ${token.data}`);
            this.setState({loading: false});
            this.props.history.push('/')
        } catch (err) {
            this.setState({errors: err.response.data, loading: false});
        }

    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        const {classes} = this.props;
        const {errors, loading} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <div><h1>Log In</h1></div>
                    {this.state.loading && (<CircularProgress/>) ||
                    (<div>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <TextField
                                    id='email'
                                    name='email'
                                    type='email'
                                    label='Email'
                                    helperText={errors.email}
                                    error={!!errors.email}
                                    className={classes.textField}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    id='password'
                                    name='password'
                                    type='password'
                                    label='Password'
                                    helperText={errors.password}
                                    error={!!errors.password}
                                    className={classes.textField}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                {errors.message && (
                                    <Typography variant='body2' className={classes.customError}>
                                        {errors.message}
                                    </Typography>
                                )}
                                <Button variant='contained' color='primary' type='submit' className={classes.button}>Log
                                    In</Button>
                            </form>
                            <small className={classes.smallInfo}>If you don't have an account, go to <Link to='/signup'>Sign Up Page</Link></small>
                        </div>
                    )}
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(formsStyles)(login);
