import { GLOBAL_LOADING, GLOBAL_LOADING_END } from "./loading_type";

const Loading_Reducer = (state={}, action) => {

    switch (action.type) {
        case GLOBAL_LOADING:
            return {...state, start: action.payload}
        case GLOBAL_LOADING_END :
            return {...state, end : action.payload}
        default:
            return state;
    }
}
export default Loading_Reducer;