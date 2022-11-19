import React, { useState, useEffect } from "react";

import { AppBar, Button, Toolbar, Typography, Avatar } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import * as actionType from "../../constants/actionTypes";

import useStyles from "./styles";

import bSocial from "../../images/BSocial.png";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const authenticate = () => history.push("/auth");

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/posts");

    setUser(null);
  };

  const login = () => {
    // console.log("auth page");
    authenticate();
  };

  useEffect(() => {
    const token = user?.token;

    // gives information when the token expires
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        {/* typography in material is for any textual element h2, p etc */}
        <img className={classes.image} src={bSocial} alt="" height="40" />
      </Link>

      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            className={classes.login}
            variant="contained"
            color="primary"
            onClick={login}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
