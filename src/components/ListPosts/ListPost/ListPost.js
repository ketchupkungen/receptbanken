import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Modal, Backdrop, Fade, Collapse, IconButton, Tooltip, Grid, TableRow, TableCell } from '@material-ui/core/';
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
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CloseIcon from '@material-ui/icons/Close';

import { likePost, deletePost } from '../../../actions/posts';
//import useStyles from './styles';
import { makeStyles } from '@material-ui/core/styles';

import Form from '../../Form/Form';

const useStyles = makeStyles((theme) => ({
  content: {
    whiteSpace: 'pre-line',
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

const ListPost = ({ post, setCurrentId }) => {
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

  /*const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };*/

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
      <Card className='card' style={{padding:'10px 10px'}}>
        <Grid container>
          <Grid item xs={6}>
            <Typography style={{display: 'inline-flex', alignItems: 'center', margin:'auto'}} variant="subtitle1">
              <IconButton
                style={{padding:'0px', marginTop:'0', display:'inline-flex', color:'rgb(255, 222, 89)'}}
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Typography>
            <div style={{display: 'inline-flex', padding:'0px 0px 0px 5px'}}></div>
            <Typography style={{display: 'inline-flex', alignItems: 'center', verticalAlign: 'top', marginTop:'0', top:'0px'}} variant="caption">
            {post.title}
            </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography style={{alignItems: 'center'}} variant="caption">
                {post.time}
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography style={{alignItems: 'center'}} variant="caption">
                {post.portions}
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography style={{alignItems: 'center'}} variant="caption">
                <IconButton style={{padding:'0px', top:'0', marginTop:'0', display:'inline-flex'}} aria-label="add to favorites" disabled={!user?.result} onClick={handleLike}>
                  <Favorites />
                </IconButton>
              </Typography>
          </Grid>
        </Grid>
        {/*<CardHeader
          style={{padding:'0px'}}
          avatar={
            <IconButton component={Link} to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              <Tooltip disableFocusListener title={`Klicka för att se ${post.name}s uppladdade recept`}>
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {`${post.name.charAt(0).toUpperCase()}`}{`${post.name.split(' ').splice(1, 1).join(' ').charAt(0).toUpperCase()}`}
                </Avatar>
              </Tooltip>
            </IconButton>
          }
          title={`${post.title}`}
          subheader={`${moment(post.createdAt).format("YYYY-MM-DD")}`}
        />*/}
        {/*<CardMedia
          className={classes.media}
          image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
          title={`${post.title}`}
          onClick={openPost}
        />*/}
      {/*  <CardContent style={{paddingBottom:'0px'}}>
          
          <div className={classes.details}>
            {post.tags.map((tag) => (
              <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5', fontSize:'80%'}}>
                {` #${tag} `}
              </Link>
            ))}
          </div>
              <Typography style={{display: 'inline-flex', alignItems: 'center', marginRight:'20px'}} variant="subtitle1">
              <PeopleIcon />{post.portions}
              </Typography>
              <Typography style={{display: 'inline-flex', alignItems: 'center'}} variant="subtitle1">
                <ScheduleIcon />{post.time}
              </Typography>
        </CardContent>
            */}
        {/*<CardActions disableSpacing>
          <IconButton aria-label="add to favorites" disabled={!user?.result} onClick={handleLike}>
            <Favorites />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          </CardActions>*/}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className='collapseRecept'>
            <Grid container>
              <Grid item md={8} xs={12}>
                <img
                  className='collapseReceptImg'
                  src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                  title={`${post.title}`}
                  onClick={openPost}
                />
              </Grid>
              <Grid item md={4} xs={12} className='collapseReceptBesk'>
                <Tooltip disableFocusListener title={`Klicka för att se ${post.name}s uppladdade recept`}>
                  <Button component={Link} to={`/creators/${post.name}`} style={{ textDecoration: 'none'}}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {`${post.name.charAt(0).toUpperCase()}`}{`${post.name.split(' ').splice(1, 1).join(' ').charAt(0).toUpperCase()}`}
                    </Avatar>
                    <div style={{ marginLeft:'10px',textDecoration: 'none', display:'block' }}>
                      <Typography variant="h3" style={{ textDecoration: 'none', color: 'white', display:'block', fontSize:'15px' }}>{post.name}</Typography>
                      <Typography variant="caption" style={{ textDecoration: 'none', color: 'gray', display:'block' }}>{moment(post.createdAt).format("YYYY-MM-DD")}</Typography>
                    </div>
                  </Button>
                </Tooltip>

                <Typography style={{marginBottom:'0px', color:'#ffb400'}} variant="h5">{post.title}</Typography>
                <div className={classes.details}>
                  {post.tags.map((tag) => (
                    <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#A52A2A', fontSize:'80%'}}>
                      {` #${tag} `}
                    </Link>
                  ))}
                </div>
                    <Typography style={{display: 'inline-flex', alignItems: 'center', marginRight:'30px'}} variant="subtitle1">
                      <ScheduleIcon style={{marginRight:'5px'}} />{post.time}
                    </Typography>
                    <Typography style={{display: 'inline-flex', alignItems: 'center', marginBottom:'10px'}} variant="subtitle1">
                    <PeopleIcon style={{marginRight:'5px', position:'relative'}} />{post.portions}
                    </Typography>
                <Typography style={{marginBottom:'0px', color:'rgb(255, 222, 89)'}} variant="h6">Beskrivning:</Typography>
                <Typography className={classes.content} variant="body2" color="textSecondary" component="p">
                  {post.message}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12} className='collapseReceptIngr'>
                <Typography style={{marginBottom:'0px', color:'rgb(255, 222, 89)'}} variant="h6">Ingredienser:</Typography>
                <Typography style={{whiteSpace: 'pre-line'}}  variant="body2">
                  {post.ingr}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12} className='collapseReceptMomTips'>
                <Typography style={{marginBottom:'0px', color:'rgb(255, 222, 89)'}} variant="h6">Moment:</Typography>
                <Typography style={{whiteSpace: 'pre-line', marginBottom:'0px'}} variant="body2">
                  {post.step}
                </Typography>
                <Typography style={{marginBottom:'0px', color:'rgb(255, 222, 89)'}}  className='collapseReceptTips' variant="h6">Tips och övrigt:</Typography>
                <Typography style={{whiteSpace: 'pre-line'}} variant="body2">
                  {post.more}
                </Typography>
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default ListPost;
