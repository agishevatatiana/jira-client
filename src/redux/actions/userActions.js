import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
import axios from "axios";

export const loginUser = (userData) => async (dispatch, history) => {
    dispatch({ type: LOADING_UI });
    try {
        const token = await axios.post('/login', userData);
        const FBIdToken = `Bearer ${token.data}`;
        localStorage.setItem('JiraToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
       // this.setState({loading: false});
        history.push('/')
    } catch (err) {
        // this.setState({errors: err.response.data, loading: false});
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getUserData = () => async (dispatch) => {
    try {
        const user = await axios.get('/user');
        dispatch({
            type: SET_USER,
            payload: user.data
        });
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
       // this.setState({errors: err.response.data, loading: false});
    }

}
