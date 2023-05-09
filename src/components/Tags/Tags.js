import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Tag from './Tag/Tag';
import useStyles from './styles';

const Tags = ({ setCurrentId }) => {
  const { tags } = useSelector((state) => state.tags);
  const classes = useStyles();

  return (
    <Grid style={{ paddingTop: '25px' }} className={classes.container} container alignItems="stretch" spacing={3}>
      Test
      {/*{tags?.map((tag) => (
        <Grid key={tag._id} item xs={12} sm={12} md={6} lg={3}>
          <Tag tag={tag} setCurrentId={setCurrentId} />
        </Grid>
      ))}*/}
    </Grid>
  );
};

export default Tags;
