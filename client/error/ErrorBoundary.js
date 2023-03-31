import { Router, useRouter } from "next/router";
import { AuthError, isInstanceOfApiError } from "../middleware/isInstanceOfApiError";
import React from 'react';
import NotFoundPage from "../pages/error/404";
import ErrorPage from "../pages/error/error";
import { signOut } from "next-auth/react";
import { Dialog, DialogContent, DialogContentText, DialogTitle, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

const errorBoundaryState = {
  error: null
}

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = errorBoundaryState
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  resetState = () => {
    this.setState(errorBoundaryState)
  }

  setError = (error) => {
    this.setState({ error })
  }

  // 전역 에러 중 캐치하지 못한 에러
  handleError = (event) => {
    this.setError(event.error)
    event.preventDefault?.()
  }

  // promise 중 캐치하지 못한 rejection
  handleRejectedPromise = (event) => {
    event?.promise?.catch?.(this.setError)
    event.preventDefault?.()
  }

  componentDidMount() {
    window.addEventListener('error', this.handleError)
    window.addEventListener('unhandledrejection', this.handleRejectedPromise)

    Router.events.on('routeChangeStart', this.resetState)
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleError)
    window.removeEventListener('unhandledrejection', this.handleRejectedPromise)

    Router.events.off('routeChangeStart', this.resetState)
  }

  render() {
      const { error } = this.state;
      console.log('error Boundary : ', error)
      
      let hasError = false;
      if(error) hasError = true;
      if (isInstanceOfApiError(error)) {
        return (
          <>
          {error && 
          <Dialog
            // open={()=>{return new Boolean(this.state.error)}}
            open={hasError}
            onClose={() => this.resetState()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
                {error?.title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {error?.message}
              </DialogContentText>
            </DialogContent>
          </Dialog>
          }
          </>
        )
      } else if(error) {
        window.location.href = '/';
      }
  
      return this.props.children;
    }
}