import React from "react";
import { Route, Redirect, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ auth, children }) => {
  //   console.log(`auth is ${auth.isAuthenticated}`);
  if (auth.isLoading) {
    return <h2>Loading...</h2>;
  } else if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null, null, {
  pure: false,
})(PrivateRoute);

// export default PrivateRoute;
