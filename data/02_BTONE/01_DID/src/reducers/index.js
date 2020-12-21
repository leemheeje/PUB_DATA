import { LOGIN } from'../actions';
import { combineReducers } from 'redux';

const loginState = {
    userId: '',
    userPw: '',
};

const loginApp = (state = loginState, action) => {
    
    switch(action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                userId: action.userId,
                userPw: action.userPw,
            });
        default:
            return state; //
    }
}

const did_client = combineReducers({
    loginApp
});
 
export default did_client;