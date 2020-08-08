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

class signup extends Component {
    constructor() {
        super();
        this.state = {
            full_name: '',
            email: '',
            password: '',
            confirmPassword: '',
            loading: false,
            errors: {}
        };
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const { full_name, email, password, confirmPassword } = this.state;
        const userData = { full_name, email, password, confirmPassword };
        try {
            const token = await axios.post('/signup', userData);
            localStorage.setItem('JiraToken', `Bearer ${token.data}`);
            this.setState({ loading: false });
            this.props.history.push('/')
        } catch (err) {
            console.log(err.response.data);
            this.setState({ errors: err.response.data, loading: false });
        }

    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <div><h1>Sign Up</h1></div>
                    {this.state.loading && (<CircularProgress />) ||
                    (<div>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                id='full_name'
                                name='full_name'
                                type='text'
                                label='Full Name'
                                helperText={errors.full_name}
                                error={!!errors.full_name}
                                className={classes.textField}
                                value={this.state.full_name}
                                onChange={this.handleChange}
                            />
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
                                helperText={errors.password || errors.message}
                                error={!!errors.password || !!errors.message}
                                className={classes.textField}
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <TextField
                                id='confirmPassword'
                                name='confirmPassword'
                                type='password'
                                label='Confirm Password'
                                helperText={errors.confirmPassword}
                                error={!!errors.confirmPassword}
                                className={classes.textField}
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                            />
                            {errors.message && (
                                <Typography variant='body2' className={classes.customError}>
                                    {errors.message}
                                </Typography>
                            )}
                            <Button variant='contained' color='primary' type='submit' className={classes.button}>Sign Up</Button>
                        </form>
                        <small className={classes.smallInfo}>If you have an account, go to <Link to='/login'>Log In Page</Link></small>
                    </div>)}
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(formsStyles)(signup);
