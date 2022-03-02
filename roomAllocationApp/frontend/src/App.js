import React, { Component } from "react";
import "./App.css";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import AuthScreen from "./components/authScreen/AuthScreen";
import Dashboard from "./components/dashboard/Dashboard";
import ResgisterScreen from "./components/registerScreen/ResgisterScreen";
import Alerts from "./components/layout/Alerts";
import { Provider } from "react-redux";
import store from "./store";
import {
  HashRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import { loadUser } from "./actions/auth";

const alertOptions = {
  timeout: 5000,
  position: "top center",
};

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Alerts />
            <div className="App">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route exact path="/register" element={<ResgisterScreen />} />
                <Route exact path="/login" element={<AuthScreen />} />
              </Routes>
            </div>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}
