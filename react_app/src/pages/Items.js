import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Items = () => {
  const [items, setItems] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch('http://dev.login.localhost/api/items')
      .then(response => response.json())
      .then(data => {
        setItems(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} md={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <h1>Item List</h1>
          <ul>
            {items.map(item => (
              <li key={item.name}>Name: {item.name}, Description: {item.description}</li>
            ))}
          </ul>
        </div>
      </Grid>
    </Grid>
  );
};

export default Items;