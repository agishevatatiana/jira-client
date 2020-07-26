import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const styles = {
    form: {
        textAlign: 'center'
    },
    textField: {
        width: '100%',
        margin: '15px 0'
    },
    button: {
        margin: '35px 0 0'
    }
};

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

    handleSubmit = async(event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const userData = { email, password };
        try {
            const token = await axios.post('/login', userData);
            this.setState({ loading: false });
          //  this.props.history.push('/')
        } catch (err) {
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
                    <div><h1>Log In</h1></div>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            helperText={errors.email}
                            error={!!errors.email}
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            helperText={errors.password}
                            error={!!errors.password}
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <Button variant="contained" color="primary" type="submit" className={classes.button}>Log In</Button>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(login);
