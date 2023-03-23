// HOC/withAuth.jsx
import React from 'react';
import useAuth from "./useAuth";
export default function WithAuth(WrappedComponent) {
    
    return (props) => {
    const isAuthenticated = useAuth(true);
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {

      return (

      <> 
      {isAuthenticated ? 
        <WrappedComponent {...props} />
        : null
      }
      </>
      );
      
    }
    // If we are on server, return null
    return null;
  };
};
