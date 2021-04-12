import React, {Component, FormEvent} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme, withStyles } from '@material-ui/core';
import { formsStyles } from '../styles/forms-styles';

type SignUpProps = {
    classes: any;
}

type SignUpErrors = {
    full_name: string;
    message: string;
    password: string;
    confirmPassword: string;
    email: string;
}

type SignUpState = {
    full_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    loading: boolean;
    errors: SignUpErrors | null;
}

class signup extends Component<SignUpProps, SignUpState> {
    constructor(props: SignUpProps) {
        super(props);
        this.state = {
            full_name: '',
            email: '',
            password: '',
            confirmPassword: '',
            loading: false,
            errors: null
        };
    }

    handleSubmit = async(event: FormEvent) => {
        event.preventDefault();
        this.setState({ loading: true });
        const { full_name, email, password, confirmPassword } = this.state;
        const userData = { full_name, email, password, confirmPassword };
        try {
            const token = await axios.post('/signup', userData);
            localStorage.setItem('JiraToken', `Bearer ${token.data}`);
            this.setState({ loading: false });
            // history.push('/') see login actions
        } catch (err) {
            console.log(err.response.data);
            this.setState({ errors: err.response.data, loading: false });
        }

    };

    handleChange = (event: any) => {
        const name = (event.target || {}).name;
        const value = (event.target || {}).value;
        const newState: any = {
            [name]: [value]
        };
        this.setState(newState);
    };

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <div><h1>Sign Up</h1></div>
                    {loading && (<CircularProgress />) ||
                    (<div>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                id='full_name'
                                name='full_name'
                                type='text'
                                label='Full Name'
                                helperText={errors?.full_name}
                                error={!!errors?.full_name}
                                className={classes.textField}
                                value={this.state.full_name}
                                onChange={this.handleChange}
                            />
                            <TextField
                                id='email'
                                name='email'
                                type='email'
                                label='Email'
                                helperText={errors?.email}
                                error={!!errors?.email}
                                className={classes.textField}
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <TextField
                                id='password'
                                name='password'
                                type='password'
                                label='Password'
                                helperText={errors?.password || errors?.message}
                                error={!!errors?.password || !!errors?.message}
                                className={classes.textField}
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <TextField
                                id='confirmPassword'
                                name='confirmPassword'
                                type='password'
                                label='Confirm Password'
                                helperText={errors?.confirmPassword}
                                error={!!errors?.confirmPassword}
                                className={classes.textField}
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                            />
                            {errors?.message && (
                                <Typography variant='body2' className={classes.customError}>
                                    {errors?.message}
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

export default withStyles((theme: Theme) => formsStyles(theme))(signup);
