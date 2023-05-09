import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Modal, Backdrop, Fade } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';

import clsx from 'clsx';
//import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
//import CardMedia from '@material-ui/core/CardMedia';
//import CardContent from '@material-ui/core/CardContent';
//import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
//import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

//import useStyles from './styles';
import { makeStyles } from '@material-ui/core/styles';

//import Form from '../../Form/Form';

const useStyles = makeStyles((theme) => ({
  content: {
    whiteSpace: 'pre-line',
    minHeight: '100px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Tag = ({ tag, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Modal start
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Modal end


  const openTag = (e) => {

    history.push(`/tags/${tag._id}`);
  };

  return (
    <div>
      

      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              B
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={(e) => {
              handleOpen();
              e.stopPropagation();
              setCurrentId(tag._id);
            }}>
              <MoreVertIcon />
            </IconButton>
          }
          title={`${tag.title}`}
          //subheader={`${moment(post.createdAt).fromNow()}`}
          subheader={`${moment(tag.createdAt).format("YYYY-MM-DD")}`}
        />
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">react-transition-group animates me.</p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(tag._id);
                }}
                style={{ color: 'white' }}
                size="small"
              >
                <MoreHorizIcon fontSize="default" />
              </Button>

              {/*<Form currentId={currentId} setCurrentId={setCurrentId} />*/}
            </div>
          </Fade>
        </Modal>
        <CardMedia
          className={classes.media}
          image={tag.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
          title={`${tag.message}`}
          onClick={openTag}
        />
        <CardContent>
          
          <div className={classes.details}>
            {tag.tags.map((tag) => (
              <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                {` #${tag} `}
              </Link>
            ))}
            {/*<Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>*/}
          </div>
          <Typography className={classes.content} variant="body2" color="textSecondary" component="p">
            {tag.message.split(' ').splice(0, 20).join(' ')}...
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tag;
