import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import MyPost from './MyPost/MyPost';
import useStyles from './styles';

const MyPosts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();


  if (!posts.length && !isLoading) return (<p style={{color:'white'}}>Hittade inga recept &#128059;</p>);

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <MyPost post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default MyPosts;
