import { GLOBAL_LOADING, GLOBAL_LOADING_END } from "../../_reducer/loading/loading_type"

export const GlobalLoading = () => {
    return {
        type : GLOBAL_LOADING,
        payload : 'now loading'
    }
}

export const GlobalLoadingEnd = () => {
    return {
        type: GLOBAL_LOADING_END,
        payload : 'loading end' 
    }
}