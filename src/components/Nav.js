import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { BiExit } from "react-icons/bi";
import { Link } from "react-router-dom";

import Actions from "../utils/dashboardActions";
import { useAuthContext } from "../utils/useAuthContext";
import { useDashboardContext } from "../utils/useDashboardContext";

export default function Nav({ darkMode, setDarkMode }) {
  const classes = useStyles();
  const context = useAuthContext();
  const {dispatch} = useDashboardContext();

  const logoutOps = () => {
    dispatch({ type: Actions.CLEAR_USER });
    context.logout();
  };

  const userProfile = () => {
    dispatch({ type: Actions.SELECT_USER, payload: context.user });
  };

  return (
    <Paper elevation={3}>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <Typography variant="overline" className={classes.title}>
            <Link to="/" className={classes.link}>
              Ping
            </Link>
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            }
            label={darkMode ? "Light Mode" : "Dark Mode"}
            labelPlacement="start"
          />
          {context.user && (
            <>
              <Link to={`/user/${context.user.id}`} className={classes.link}>
                <Button
                  onClick={userProfile}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Profile
                </Button>
              </Link>
              <Button
                variant="contained"
                color="primary"
                endIcon={<BiExit />}
                size="small"
                onClick={logoutOps}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: theme.palette.primary.main
  },
  title: {
    flexGrow: 1,
    fontSize: "2rem",
    padding: "0 2px",
    margin: "0 0",
  },
  link: {
    color: theme.palette.secondary.dark,
    textDecoration: "none",
    margin: theme.spacing(1),
  },
}));
