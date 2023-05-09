import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Modal, Backdrop, Fade, Collapse, IconButton, Tooltip, Grid } from '@material-ui/core/';
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
import Avatar from '@material-ui/core/Avatar';
//import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PeopleIcon from '@material-ui/icons/People';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CloseIcon from '@material-ui/icons/Close';

import { likePost, deletePost } from '../../../actions/posts';
//import useStyles from './styles';
import { makeStyles } from '@material-ui/core/styles';

import Form from '../../Form/Form';

const useStyles = makeStyles((theme) => ({
  content: {
    whiteSpace: 'pre-line',
    //minHeight: '100px'
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
    backgroundColor: '#A52A2A',
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

const Post = ({ post, setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  // Modal start
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Modal end


  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Favorites = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <div style={{display:'inline-flex', alignItems: 'center', paddingBottom:'6px'}}><FavoriteIcon style={{color:'red'}} /><p style={{color:'white', margin:'0px', paddingTop:'0px', paddingBottom:'0px', fontSize:'60%'}}>&nbsp;{likes.length > 2 ? `${likes.length - 1}` : `${likes.length} ${likes.length > 1 ? '' : ''}` }</p></div>
        ) : (
          <div style={{display:'inline-flex', alignItems: 'center', paddingBottom:'6px'}}><FavoriteIconBorder style={{color:'white'}} /><p style={{color:'white', margin:'0px', paddingTop:'0px', paddingBottom:'0px', fontSize:'60%'}}>&nbsp;{likes.length} {likes.length === 1}</p></div>
        );
    }

    return <div style={{ color:'white', paddingTop:'0px', paddingBottom:'0px'}}><FavoriteIconBorder /></div>;
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };

  return (
    <div>
      

      <Card className='card'>
        <div className='cardHeader'>
        {/*<CardHeader
          
          avatar={
            <IconButton component={Link} to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              <Tooltip disableFocusListener title={`Klicka för att se ${post.name}s uppladdade recept`}>
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {` ${post.name.split(' ').splice(0, 1).join(' ')}`}
                  {`${post.name.charAt(0).toUpperCase()}`}{`${post.name.split(' ').splice(1, 1).join(' ').charAt(0).toUpperCase()}`}
                </Avatar>
              </Tooltip>
            </IconButton>
          }
          action={
            <IconButton aria-label="settings" onClick={(e) => {
              handleOpen();
              e.stopPropagation();
              setCurrentId(post._id);
            }}>
              <MoreVertIcon />
            </IconButton>
          }
          title={`${post.name}`}
          //subheader={`${moment(post.createdAt).fromNow()}`}
          subheader={`${moment(post.createdAt).format("YYYY-MM-DD")}`}
        />*/}
        <div style={{ textDecoration: 'none', width:'100%', justifyContent:'left', display:'inline-flex'}}>
          <Button component={Link} to={`/creators/${post.name}`}>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {`${post.name.charAt(0).toUpperCase()}`}{`${post.name.split(' ').splice(1, 1).join(' ').charAt(0).toUpperCase()}`}
            </Avatar>
          </Button>
          <div style={{textDecoration: 'none', display:'block', verticalAlign: 'middle', lineHeight:'0px'}}>
            <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', width:'100%', justifyContent:'left'}}>
              <h4 style={{margin:'17px', textDecoration: 'none', color: 'white', fontSize:'15px' }}>{post.name}</h4>
            </Link>
            <h6 style={{margin:'15px', textDecoration: 'none', color: 'gray'}}>{moment(post.createdAt).format("YYYY-MM-DD")}</h6>
          </div>
        </div>
        </div>
        {/*<Modal
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
                  setCurrentId(post._id);
                }}
                style={{ color: 'white' }}
                size="small"
              >
                <MoreHorizIcon fontSize="default" />
              </Button>

              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </div>
          </Fade>
        </Modal>*/}
        <CardMedia
          className={classes.media}
          image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
          title={`${post.title}`}
          onClick={openPost}
        />
        <CardContent style={{paddingBottom:'0px'}}>
          
          <div className={classes.details}>
            {post.tags.map((tag) => (
              <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#A52A2A', fontSize:'80%'}}>
                {` #${tag} `}
              </Link>
            ))}
            {/*<Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>*/}
          </div>
          <Typography variant="h3" style={{ textDecoration: 'none', color: '#ffb400', display:'block', fontSize:'15px', marginBottom:'10px' }}>{post.title}</Typography>
              <Typography style={{display: 'inline-flex', alignItems: 'center', marginRight:'20px'}} variant="subtitle1">
              <PeopleIcon />{post.portions}
              </Typography>
              <Typography style={{display: 'inline-flex', alignItems: 'center'}} variant="subtitle1">
                <ScheduleIcon />{post.time}
              </Typography>
        </CardContent>
        <CardActions style={{paddingLeft:''}} disableSpacing>
          <IconButton style={{paddingLeft:'6px'}} aria-label="add to favorites" disabled={!user?.result} onClick={handleLike}>
            <Favorites />
          </IconButton>
          <IconButton aria-label="share">
            {/*<ShareIcon style={{color:'white'}} />*/}
          </IconButton>
          <IconButton
            style={{color:'rgb(255, 222, 89)'}}
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{paddingTop:'2px'}} >
            <h4 style={{color:'rgb(255, 222, 89)', marginTop:'0px', marginBottom:'2px'}}>Beskrivning:</h4>
            <Typography style={{marginBottom:'20px'}} className={classes.content} variant="body2" color="textSecondary" component="p">
              {post.message}
              {/*{post.message.split(' ').splice(0, 20).join(' ')}...*/}
            </Typography>
            <h4 style={{color:'rgb(255, 222, 89)', marginBottom:'2px'}}>Ingredienser:</h4>
            <Typography style={{whiteSpace: 'pre-line'}} paragraph>
              {post.ingr}
            </Typography>
                <IconButton
                  style={{padding:'0px', marginTop:'0', display:'inline-flex', color:'rgb(255, 222, 89)'}}
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <CloseIcon />
                </IconButton>
                <Button onClick={openPost} style={{paddingLeft:'20px',display:'inline-flex', color:'rgb(255, 222, 89)'}}>Läs mer</Button>
          </CardContent>
        </Collapse>
      </Card>

      {/*
      <Card className={classes.card} raised elevation={6}>
        <ButtonBase
          component="span"
          name="test"
          className={classes.cardAction}
          onClick={openPost}
        >
          <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
          <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          </div>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={handleOpen}
              style={{ color: 'white' }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
            
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
                      setCurrentId(post._id);
                    }}
                    style={{ color: 'white' }}
                    size="small"
                  >
                    <MoreHorizIcon fontSize="default" />
                  </Button>
                </div>
              </Fade>
            </Modal>
          </div>
          )}
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          </div>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
          <CardContent>
            <Typography style={{whiteSpace: 'pre-line'}} variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
          </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
            <Likes />
          </Button>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize="small" /> &nbsp; Delete
            </Button>
          )}
        </CardActions>
      </Card>
      */}
    </div>
  );
};

export default Post;
