import {combineReducers} from 'redux';
import {HYDRATE} from 'next-redux-wrapper';
import loading from '../_reducer/loading/loading_reducer';

const rootReducer = (state={}, action) => {
    switch (action.type) {
        case HYDRATE:
            return action.payload;
        default:
            return combineReducers({ loading })(state, action);
    }
};

export default rootReducer;