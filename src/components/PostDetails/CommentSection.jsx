import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Grid, ListItem, ListItemText, List, Divider, Paper } from '@material-ui/core/';

import { makeStyles } from '@material-ui/core/styles';


import { withStyles } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';

import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';
//import useStyles from './styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    padding: '0px 0px 0px 5px',
    marginBottom: '5px',
    width: '100%'
  },
}));

const CommentSection = ({ post, props }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();


  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item md={6} sm={12} style={{width:'100%'}}>
          <Typography style={{color:'rgb(255, 222, 89)'}} gutterBottom variant="h6">Skriv en kommentar</Typography>
          <TextField className='textArea' fullWidth rows={4} variant="outlined" label="Kommentera" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{marginTop: '10px'}} fullWidth disabled={!comment.length} variant="contained" onClick={handleComment}>
            Skicka
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography style={{color:'rgb(255, 222, 89)'}} gutterBottom variant="h6">Kommentarer</Typography>
          <List style={{height:'145px', overflow: 'auto', paddingTop:'0px'}}>

          {comments?.map((c, i) => (
            <ListItem style={{padding:'0px',margin:'0px', top:0}}>
              <Paper /*className={classes.paper}*/>
              <Grid container>
                <Grid item xs={12}>
                  <Typography key={i} variant="subtitle1"><strong>{c.split(': ')[0]}</strong>{/*<small> | 2022-12-22</small>*/}</Typography>
                </Grid>
                <Typography style={{whiteSpace: 'pre-line', marginBottom:'15px'}} key={i} gutterBottom variant="subtitle1">
                  {c.split(':')[1]}
                </Typography>
              </Grid>
              </Paper>
            </ListItem>
          ))}
          </List>
          <div ref={commentsRef} />
        </Grid>
      </Grid>
    </div>
  );
};

export default CommentSection;
