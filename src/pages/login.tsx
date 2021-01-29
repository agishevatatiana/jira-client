import React, {Component, FormEvent} from 'react';
import {Link} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { loginUser } from '../redux/actions/userActions';

type LoginProps = {
    formsStyles: any;
}

type LoginErrors = {
    password: string;
    email: string;
    message: string;
}

type LoginState = {
    email: string;
    password: string;
    loading: boolean;
    errors: LoginErrors | null;
};

class login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: null
        };
    }

    async handleSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({loading: true});
        const {email, password} = this.state;
        const userData = {email, password};
        try {
            await loginUser(userData);
            this.setState({loading: false});
        } catch (err) {
            this.setState({loading: false});
        }

    }

    handleChange(event: any) {
        const name = (event.target || {}).name;
        const value = (event.target || {}).value;
        const newState: any = {
            [name]: [value]
        };
        this.setState(newState);
    }

    render() {
        const { formsStyles } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={formsStyles.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <div><h1>Log In</h1></div>
                    {loading && (<CircularProgress/>) ||
                    (<div>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <TextField
                                    id='email'
                                    name='email'
                                    type='email'
                                    label='Email'
                                    helperText={errors?.email}
                                    error={!!errors?.email}
                                    className={formsStyles.textField}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    id='password'
                                    name='password'
                                    type='password'
                                    label='Password'
                                    helperText={errors?.password}
                                    error={!!errors?.password}
                                    className={formsStyles.textField}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                {errors?.message && (
                                    <Typography variant='body2' className={formsStyles.customError}>
                                        {errors?.message}
                                    </Typography>
                                )}
                                <Button variant='contained' color='primary' type='submit' className={formsStyles.button}>Log
                                    In</Button>
                            </form>
                            <small className={formsStyles.smallInfo}>If you don&apos;t have an account, go to <Link to='/signup'>Sign Up Page</Link></small>
                        </div>
                    )}
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        );
    }
}

export default login;
