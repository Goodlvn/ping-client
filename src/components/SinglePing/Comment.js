import React from "react";
import { Grid, Typography, Avatar, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";

import Actions from "../../utils/dashboardActions";
import { useAuthContext } from "../../utils/useAuthContext";
import { useDashboardContext } from "../../utils/useDashboardContext";

export default function Comment({ createdAt, body, author }) {
  const classes = useStyles();
  const {dispatch} = useDashboardContext();
  const { user } = useAuthContext();

  function displayProfile(selectedUser) {
    if (user) {
      dispatch({ type: Actions.SELECT_USER, payload: selectedUser });
    }
  }

  function authorPic(author) {
    return author.imageUrl ? (
      <Avatar
        src={author.imageUrl}
        alt={author.username}
        className={classes.profilePic}
      />
    ) : (
      <Avatar className={classes.missingPic}>
        <FaUser />
      </Avatar>
    );
  }

  return (
    <Paper className={classes.root}>
      <Grid container wrap="nowrap" spacing={2} alignItems="center">
        <Grid item>{authorPic(author)}</Grid>
        <Grid item xs>
          <Link
            to={`/user/supported/${author.id}`}
            className={classes.username}
          >
            <Typography
              variant="subtitle2"
              onClick={() => displayProfile(author)}
            >
              {author.username}
            </Typography>
          </Link>
          <Typography variant="subtitle2" className={classes.meta}>
            {moment(Number(createdAt)).fromNow()}
          </Typography>
          <Typography variant="body2">{body}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5px 8px",
    marginTop: "0.7rem",
    backgroundColor: theme.palette.primary.light
  },
  username: {
    "&:hover": {
      cursor: "pointer",
      color: "#DC143C",
    },
    textDecoration: "none",
    color: "black",
  },
  missingPic: {
    width: "3rem",
    height: "3rem",
    "& > *": {
      width: "1.5rem",
      height: "1.5rem",
    },
  },
  profilePic: {
    width: "3rem",
    height: "3rem",
  },
  meta: {
    color: theme.palette.text.secondary,
    fontSize: 12,
    "& > * ": {
      textDecoration: "none",
      color: "grey",
    },
  },
}));
