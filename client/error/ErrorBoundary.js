import { Router } from "next/router";
import { AuthError, isInstanceOfApiError } from "../middleware/isInstanceOfApiError";
import React from 'react';
import NotFoundPage from "../pages/error/404";
import ErrorPage from "../pages/error/error";
import { signOut } from "next-auth/react";

/*
error boundary 사용시 component 에서 catch 를 사용하면 안된다. 해당 componenet 에서 error 처리가 완료되어버림.

*/
const errorBoundaryState = {
    error : null,
}
export default class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = errorBoundaryState;   
    }


    static getDerivedStateFromError(error) {
        console.error(error);
        return {error};
    }
    resetState = () => {
        this.setState(errorBoundaryState);
    }
    setError = (error) => {
        console.error('error found ',error);
        this.setState({error});
    }
    //전역 에러 중 캐치하지 못한에러
    handleError = (event) => {
        this.setError(event.error)
        event.preventDefault?.()
    }

    //promise 중 캐치하지 못한 rejection
    handleRejectedPromise = (event) => {
        console.log('errrrrr' , event)
        event?.promise?.catch?.(this.setError(event.err))
        event.preventDefault?.()
    }
    componentDidMount(){
        window.addEventListener('error', this.handleError)
        window.addEventListener('unhandledrejection', this.handleRejectedPromise)
        Router.events.on('routeChangeStart', this.resetState)
    }
    componentWillUnmount() {
        window.removeEventListener('error', this.handleError)
        window.removeEventListener('unhandledrejection', this.handleRejectedPromise)
        Router.events.off('routeChangeStart', this.resetState)
    }

    render(){
        const {error} = this.state;
        if(isInstanceOfApiError(error)) {
            const {redirectUrl, notFound, message} = error;
            if(notFound) {
                return <NotFoundPage />
            }
            if(redirectUrl && !(error instanceof AuthError)) {
                window.location.href = redirectUrl;
                return;
            }
            console.log(message)
            return (
            <>
                <ErrorPage errorMessage={message}/>
            </>
            ) 
        }
        return this.props.children;
        // return <ErrorPage />
    }

}