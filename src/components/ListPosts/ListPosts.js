import React from 'react';
import { Grid, CircularProgress, Card } from '@material-ui/core';
import { useSelector } from 'react-redux';

import ListPost from './ListPost/ListPost';
import useStyles from './styles';


import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PeopleIcon from '@material-ui/icons/People';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ScheduleIcon from '@material-ui/icons/Schedule';



  /*
const ListPosts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();


  if (!posts.length && !isLoading) return 'Hittade inga recept';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12}>
            <ListPost post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};*/

  const ListPosts = ({ setCurrentId, props }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();


  if (!posts.length && !isLoading) return 'Hittade inga recept';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={1}>
        <Card className={classes.root} style={{padding:'10px 10px', width:'100%', margin:'4px', background:'#333333'}}>
          <Grid container>
            <Grid item xs={6}>
              <div style={{display: 'inline-flex', padding:'0px 0px 0px 5px'}}></div>
              <Typography style={{display: 'inline-flex', alignItems: 'center', verticalAlign: 'top', marginTop:'0', top:'0px', color:'#FFDE59'}} variant="subtitle1">
              Namn
              </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography style={{display: 'flex', alignItems: 'center', color:'#FFDE59'}} variant="subtitle1">
                  <ScheduleIcon />
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography style={{display: 'flex', alignItems: 'center', color:'#FFDE59'}} variant="subtitle1">
                  <PeopleIcon />
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography style={{display: 'flex', alignItems: 'center', color:'#FFDE59'}} variant="subtitle1">
                  <FavoriteIcon />
                </Typography>
            </Grid>
            </Grid>
        </Card>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12}>
            <ListPost post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default ListPosts;
