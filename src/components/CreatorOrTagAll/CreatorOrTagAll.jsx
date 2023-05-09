import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../Posts/Post/Post';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  const location = useLocation();

  const listItems = posts?.map((post) => <li key={post._id}>{post._id}</li>)

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getPostsBySearch());
    } else {
      dispatch(getPostsByCreator());
    }
  }, []);

  if (!posts.length && !isLoading) return 'No posts';

  // Sida för onclick tagg, här listas alla med samma tagg
  return (
    <div>
      <div style={{ margin:'100px'}}></div>
      <Typography variant="h2">{name}</Typography>
      <Divider style={{ margin: '0px 0 10px 0' }} />
      { listItems }
      {isLoading ? <CircularProgress /> : (
      
        <Grid container alignItems="stretch" spacing={2}>
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTag;
